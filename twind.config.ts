// twind.config.ts (MINIMAL TEST VERSION)
import { Options } from "$fresh/plugins/twindv1.ts";
import { defineConfig } from "@twind/core";
import presetTailwind from "@twind/preset-tailwind"; // Only presetTailwind for now

export default {
  selfURL: import.meta.url,
  ...defineConfig({
    presets: [presetTailwind() as any], // Just the basic Tailwind preset
    // NO theme, NO extend, NO custom fontFamily for this test
  }),
} as Options;