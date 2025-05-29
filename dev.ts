#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts"; // <--- 新增：导入您的 fresh.config.ts

await dev(import.meta.url, "./main.ts", config); // <--- 修改：将 config 作为第三个参数传递