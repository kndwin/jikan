import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { posts } from "@/db/schema";

const c = initContract();

const PostSchema = createInsertSchema(posts);

export const contract = c.router({
  createPost: {
    method: "POST",
    path: "/posts",
    responses: {
      201: PostSchema,
    },
    body: z.object({
      title: z.string(),
      content: z.string(),
    }),
    summary: "Create a post",
  },
  getPost: {
    method: "GET",
    path: `/posts/:id`,
    responses: {
      200: PostSchema.nullable(),
    },
    summary: "Get a post by id",
  },
  getAllPosts: {
    method: "GET",
    path: `/posts`,
    responses: {
      200: z.array(PostSchema.nullable()),
    },
    summary: "Get a post by id",
  },
  updatePost: {
    method: "PUT",
    path: `/posts/:id`,
    responses: {
      200: PostSchema.nullable(),
    },
    summary: "Update a post by id",
    body: z.object({
      title: z.string().optional(),
      content: z.string().optional(),
    }),
  },
  deletePost: {
    method: "DELETE",
    path: `/posts/:id`,
    responses: {
      200: z.object({
        deleted: z.boolean(),
      }),
    },
    summary: "Delete a post by id",
    body: z.object({}),
  },
});
