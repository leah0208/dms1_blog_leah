// twind.config.ts
import { Options } from "$fresh/plugins/twindv1.ts";
import { defineConfig } from "@twind/core"; 
import presetAutoprefix from "@twind/preset-autoprefix"; 
import presetTailwind from "@twind/preset-tailwind"; 

export default {
  selfURL: import.meta.url,
  ...defineConfig({ 
    presets: [
      presetAutoprefix(), 
      presetTailwind() as any 
    ], 
    theme: {
      extend: {
        fontFamily: {
     
          sans: ["ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif"],
          serif: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
          mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
        },
   
        // colors: {
        //   'brand': '#YOUR_COLOR_CODE',
        // },
      },
    },
  }),
} as Options;