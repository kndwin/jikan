import { createNextRoute } from "@ts-rest/next";
import { eq } from "drizzle-orm";

import { db } from "@/db/client";
import { posts } from "@/db/schema";

import { contract } from "./contract";

export const router = createNextRoute(contract, {
  getPost: async ({ params }) => {
    return {
      status: 201,
      body: db.query.posts.findFirst({
        where: eq(posts.id, parseInt(params.id)),
      }),
    };
  },
  getAllPosts: async () => {
    const posts = await db.query.posts.findMany();

    return {
      status: 201,
      body: posts,
    };
  },

  createPost: async (args) => {
    const exec = db
      .insert(posts)
      .values({
        ...args.body,
        authorId: 1,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      })
      .returning()
      .all();

    const post = await exec;

    return {
      status: 201,
      body: post[0],
    };
  },
  deletePost: async ({ params }) => {
    db.delete(posts)
      .where(eq(posts.id, Number(params.id)))
      .run();
    return {
      status: 200,
      body: {
        deleted: true,
      },
    };
  },
  updatePost: async ({ params, body }) => {
    const exec = db
      .update(posts)
      .set({
        ...body,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(posts.id, Number(params.id)))
      .returning()
      .all();

    const updatedPost = await exec;

    return {
      status: 200,
      body: updatedPost[0],
    };
  },
});
