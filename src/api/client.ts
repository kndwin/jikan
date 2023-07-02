import { initClient } from "@ts-rest/core";
import { initQueryClient } from "@ts-rest/react-query";

export { useTsRestQueryClient } from "@ts-rest/react-query";
import { contract } from "./contract";

export const client = initClient(contract, {
  baseUrl: "http://localhost:3000/api",
  baseHeaders: {},
});

export const queryClient = initQueryClient(contract, {
  baseUrl: "http://localhost:3000/api",
  baseHeaders: {},
});
