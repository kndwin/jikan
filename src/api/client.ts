import { initClient } from "@ts-rest/core";
import { initQueryClient } from "@ts-rest/react-query";

import { contract } from "./contract";

const clientConfig = {
  baseUrl: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api`,
  baseHeaders: {},
};

export const client = initClient(contract, clientConfig);
export const queryClient = initQueryClient(contract, clientConfig);
