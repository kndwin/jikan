import { useState } from "react";
import { Button, Card, Label, Input, Textarea } from "@/components";
import { queryClient } from "@/api/client";
import { useQueryClient } from "@tanstack/react-query";
import { TrashIcon, Pencil1Icon } from "@radix-ui/react-icons";

export const ViewPosts = () => {
  const query = queryClient.post.getAllPosts.useQuery(["posts"]);

  return (
    <div className="flex gap-2">
      <div className="max-h-screen overflow-y-auto w-full">
        <div className="flex-1 flex flex-col gap-4 max-w-xl mx-auto py-4">
          <h1 className="text-4xl font-extrabold">Posts</h1>
          {query.data?.body.map((post) => (
            <Post key={post?.id} post={post} />
          ))}
        </div>
      </div>

      <div className="p-4">
        <CreatePost />
      </div>
    </div>
  );
};

type PostProps = {
  post: any;
};

const Post = ({ post }: PostProps) => {
  const { handleDelete } = useDeletePost();
  const { handleUpdate } = useUpdatePost();
  const [mode, setMode] = useState<"view" | "edit">("view");

  const handleUpdateSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    handleUpdate(e, id);
    setMode("view");
  };

  return (
    <Card key={post?.id} className="w-full">
      {mode === "view" && (
        <>
          <Card.Header className="justify-between flex-row items-center">
            <Card.Title>{post?.title}</Card.Title>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDelete(post?.id as number)}
              >
                <TrashIcon />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setMode("edit")}
              >
                <Pencil1Icon />
              </Button>
            </div>
          </Card.Header>
          <Card.Content>
            <Card.Description>{post?.content}</Card.Description>
          </Card.Content>
        </>
      )}
      {mode === "edit" && (
        <form onSubmit={(e) => handleUpdateSubmit(e, post.id)}>
          <Card.Header className="justify-between flex-row items-center gap-2 space-y-0">
            <Input name="title" defaultValue={post?.title} />
            <div className="flex gap-2 items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDelete(post?.id as number)}
              >
                <TrashIcon />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setMode("view")}
              >
                <Pencil1Icon />
              </Button>
            </div>
          </Card.Header>
          <Card.Content className="space-y-3">
            <Textarea name="content" defaultValue={post?.content} />
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setMode("view")}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit">Update</Button>
            </div>
          </Card.Content>
        </form>
      )}
    </Card>
  );
};

const useUpdatePost = () => {
  const client = useQueryClient();

  const mutation = queryClient.post.updatePost.useMutation({
    onSuccess: () => {
      client.invalidateQueries(["posts"]);
    },
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const title = data.get("title") as string;
    const content = data.get("content") as string;
    mutation.mutate({
      body: { content, title },
      params: { id: id.toString() },
    });
  };

  return { handleUpdate };
};

const useDeletePost = () => {
  const client = useQueryClient();

  const mutation = queryClient.post.deletePost.useMutation({
    onSuccess: () => {
      client.invalidateQueries(["posts"]);
    },
  });

  const handleDelete = (id: number) => {
    mutation.mutate({ params: { id: id.toString() } });
  };
  return { handleDelete };
};

const useCreatePost = () => {
  const client = useQueryClient();
  const mutation = queryClient.post.createPost.useMutation({
    onSuccess: () => {
      client.invalidateQueries(["posts"]);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mutation.isLoading) return;
    const data = new FormData(e.currentTarget);
    const title = data.get("title") as string;
    const content = data.get("content") as string;
    mutation.mutate({ body: { content, title } });
  };

  return { handleSubmit, mutation };
};

const CreatePost = () => {
  const { handleSubmit, mutation } = useCreatePost();
  return (
    <Card className="w-fit h-fit">
      <Card.Header>
        <Card.Title>Create Post</Card.Title>
        <Card.Description>Write a new post</Card.Description>
      </Card.Header>
      <Card.Content>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-start"
        >
          <div className="flex space-y-1.5 flex-col">
            <Label htmlFor="title">Title</Label>
            <Input name="title" />
          </div>

          <div className="flex space-y-1.5 flex-col">
            <Label htmlFor="content">Content</Label>
            <Textarea name="content" className="resize-none" />
          </div>
          <Button type="submit">
            {mutation.isLoading ? "Loading..." : "Create"}
          </Button>
        </form>
      </Card.Content>
    </Card>
  );
};
