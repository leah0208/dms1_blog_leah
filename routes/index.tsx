// routes/index.tsx
import { Head } from "$fresh/runtime.ts";
import RippleBackground from "../islands/RippleBackground.tsx"; 

export default function HomePage() {
  const backgroundImageUrl = "/landingbg/1.png"; 

  return (
    <>
      <Head>
        <title>HiiimLeah</title>
        <meta name="description" content="Leah's blog" />
       
      </Head>
      <RippleBackground 
        imageUrl={backgroundImageUrl}
        
        rippleColor="rgba(255, 255, 255, 0.4)" 
        rippleSpeed={0.5}
        maxRippleRadius={90}
        rippleLineWidth={1.5}
      >
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
