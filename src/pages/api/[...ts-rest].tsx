import { createNextRouter } from "@ts-rest/next";

import { contract } from "@/api/contract";
import { router } from "@/api/router";

export const config = {
  runtime: "edge",
  regions: ["syd1"],
  unstable_allowDynamic: ["node_modules/better-sqlite3/**"],
};

export default createNextRouter(contract, router);
