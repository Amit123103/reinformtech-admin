import type { OpenNextConfig } from "open-next/types/open-next.js";

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: "cloudflare-node",
    },
  },
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
    },
  },
};

export default config;
