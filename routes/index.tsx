// routes/index.tsx (极致简化测试版)
import { Head } from "$fresh/runtime.ts";

export default function TestPage() {
  return (
    <>
      <Head>
        <title>Twind Test</title>
      </Head>
      <div class="bg-red-500 text-white p-10 m-10">
        <h1>Hello Twind on Deno Deploy!</h1>
        <p>If you see this with a red background and white text, Twind is working.</p>
      </div>
    </>
  );
}