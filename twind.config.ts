// twind.config.ts (尝试极致简化版)
import { Options } from "$fresh/plugins/twindv1.ts";
import { defineConfig } from "@twind/core";


export default {
  selfURL: import.meta.url,
  ...defineConfig({

  }),
} as Options;