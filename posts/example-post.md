---
title: Example Blog
published_at: 2025-03-10
snippet: Modified markdown examples
disable_html_sanitization: true
allow_math: true
---

## Blog Header h2

**Bold text**

Plain text

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

