import type { Config } from "@stencil/core";

export const config: Config = {
  namespace: "app",
  outputTargets: [{ type: "www", serviceWorker: null }],
};
