import { initContract } from "@ts-rest/core";
import { contract as postContract } from "@/feature/post/api/contract";

const c = initContract();

export const contract = c.router({
	post: postContract
});
