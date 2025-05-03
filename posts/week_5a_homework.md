---
title: Week 5a Homework
published_at: 2025-04-05
snippet: 
disable_html_sanitization: true
allow_math: true
---

## Why I think Saeko Ehara’s work is post-digital

![1](/week5/1.png)

I think Saeko Ehara’s art is post-digital because it mixes old and new in a really smart way. She uses a big digital screen in a shopping mall, but the image on it looks like a painting.It’s full of colorful glitches and digital textures.

Florian Cramer says post-digital isn’t just about using tech—it’s about what happens after digital becomes normal. Ehara’s work feels like that. She’s not just showing off digital tools. She’s using them to make something emotional, strange, and kind of broken.

The glitch makes the face feel fragile, almost like it’s falling apart. This shows how digital effects are no longer futuristic—they are part of how we see and make images now.

## what technology are they using to produce their work? 

**From the image**

Digital portraits

With glitch effects, color layering, and textural distortion

Displayed on large-scale LED panel in public space

**Tools could include**

TouchDesigne / Processing / 3D + shader software?

**Hypothetically, if done in JavaScript, what could they use?**

• p5.js	For canvas drawing, image manipulation, live video input

• Three.js If the portrait is mapped in 3D space, or includes movement

• Canvas API For manual pixel manipulation and render control


## RiTa.js Poem

<div id="poem-canvas-container"></div>

<!-- Load libraries -->
<script src="/scripts/p5.js"></script>
<script type="module">
  import { RiTa } from "https://esm.sh/rita";
  let lines = [];
// Attach functions to window so p5 can access them2
  window.setup = function () {
    let canvas = createCanvas(600, 400);
    canvas.parent("poem-canvas-container");
    background(0);
    textFont("Courier");
    textSize(16);
    fill(255);
    lines.push("My face is a " + RiTa.randomWord({ pos: "jj" }) + " machine");
    lines.push("Looped in " + RiTa.randomWord({ pos: "nn" }) + " and glow");
    lines.push("Each pixel " + RiTa.randomWord({ pos: "vb" }) + "s a different mood");
    lines.push("While memory " + RiTa.randomWord({ pos: "vb" }) + "s below");
    lines.push("I " + RiTa.randomWord({ pos: "vb" }) + " in compressed silence");
    lines.push("My data " + RiTa.randomWord({ pos: "vb" }) + "s like rain");
    lines.push("Not broken, just " + RiTa.randomWord({ pos: "vbn" }));
    lines.push("In " + RiTa.randomWord({ pos: "jj" }) + ", liquid pain");
    lines.push("The screen forgets my " + RiTa.randomWord({ pos: "nn" }));
    lines.push("The code forgets my " + RiTa.randomWord({ pos: "nn" }));
    lines.push("But in the hum of " + RiTa.randomWord({ pos: "nn" }));
    lines.push("I'm everyone, the same");
  };
    window.draw = function () {
    background(0);
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], 30, 40 + i * 30);
    }
  };
</script>


![2](/week5/2.png)

I tried to use RiTa.js in my blog.
I changed the code again and again, but it still didn’t work.

I searched online. I checked many examples. I almost gave up. Then I found out: I needed to use type="module"......
This process made me tired, but I also learned a lot.

Now, I understand RiTa better....^^

---