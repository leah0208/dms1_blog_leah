// routes/index.tsx
import { Head } from "$fresh/runtime.ts";
import RippleBackground from "../islands/RippleBackground.tsx"; // 导入 RippleBackground

export default function HomePage() {
  // 您之前使用的背景图片路径
  const backgroundImageUrl = "/landingbg/1.png"; 

  return (
    <>
      <Head>
        <title>HiiimLeah</title>
        <meta name="description" content="Leah's blog" />
      </Head>
      <RippleBackground 
        imageUrl={backgroundImageUrl}
        // 您可以根据喜好调整这些涟漪参数
        rippleColor="rgba(255, 255, 255, 0.4)" 
        rippleSpeed={0.5}         // 涟漪扩散速度
        maxRippleRadius={90}      // 涟漪最大半径
        rippleLineWidth={1.5}     // 涟漪线条宽度
      >
        {/* 这是您之前着陆页的内容结构 */}
        <header>
          <h1 class="text-5xl font-bold text-white mb-6 drop-shadow-md">
            Welcome！
          </h1>
          <p class="text-2xl text-gray-200 mb-10 drop-shadow-sm">
            This is my blog. Nice to meet you.
          </p>
          <a
            href="/blog"
            class="bg-white text-black hover:bg-gray-200 font-bold py-4 px-10 rounded-lg text-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Check it?
          </a>
        </header>

        <footer class="absolute bottom-5 text-gray-300 drop-shadow-sm">
          <p>&copy; {new Date().getFullYear()} Leah's Blog. All rights reserved.</p>
        </footer>
      </RippleBackground>
    </>
  );
}