---
title: Week 1b Homework
published_at: 2025-03-09
snippet:  
disable_html_sanitization: true
allow_math: true
---

## Discussions of The Reflection (Rafael,2025)


**1.what do you think is going on, under the hood?**

"Probably JavaScriptL, using loops and maybe some interactive elements."

"It plays with the mirroring and light tricks to blur the edge of circle."

"It’s trippy. Probably a mix of random colors and smart coding."

**2.what concepts would I need to understand in order to replicate this work in p5?**

Canvas and drawing basics.

Color and gradients for smooth transitions.

Creating seamless looping animations.

Shapes and mirroring for reflection effect.

**3.what resources might help me to learn those concepts?**

 The basic coding train on YouTube  /   p5.js reference for all the functions on Canvas Modules 










Hyperlinks -> [Link Name](https://www.markdownguide.org/cheat-sheet/)

Code Line -> `createCanvas(innerWidth, innerWidth * 9 / 16);`

Images in folder `static` -> ![hello kitty](example-blog/hello-kitty.gif)

## Example p5 sketch:

<iframe class="p5js_canvas" src="https://editor.p5js.org/johnnyliang97/full/3eKYM1aR4"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>

## Example video:

<iframe id="video" src="https://www.youtube.com/embed/rI_y2GAlQFM?si=RDgjkpunxk1mQzMI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<script type="module">

    console.log (`hello world! 🚀`)

    const iframe  = document.getElementById (`video`)
    iframe.width  = iframe.parentNode.scrollWidth
    iframe.height = iframe.width * 9 / 16

</script>

