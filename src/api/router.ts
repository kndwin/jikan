import { createNextRoute } from "@ts-rest/next";
import { contract } from "./contract";
import { router as postRouter } from "@/feature/post/api/router";

export const router = createNextRoute(contract, {
	post: postRouter
});
