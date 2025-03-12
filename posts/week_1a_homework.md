---
title: Week 1a Homework
published_at: 2025-03-08
snippet:  
disable_html_sanitization: true
allow_math: true
---

## The loop Skecth

![loop1](/week1/loop1.png)
![loop2](/week1/loop2.png)

**What might be an efficient way to use for loops (multiple) to create a grid?**

 The easiest way to make a grid maybe by using two loops: one for going left to right, and one for going top to bottom.
 

**My attempts and investigations**
![grid](/week1/grid.png)




## p5 sketch:

<iframe class="p5js_canvas" src="https://editor.p5js.org/leah0208/full/GsBKtCOTw"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>

![grid1](/week1/grid1.png)


## Coding Reference:

After learning about the let keyword and for loops, I experimented with creating a basic grid system in p5.js. 

[For](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)

[Let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)


## Video Reference:

<iframe id="video" src="https://www.youtube.com/embed/videoseries?si=9idqLeijsQQ9RZqP&amp;list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA"  title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>



<script type="module">

    console.log (`hello world! 🚀`)

    const iframe  = document.getElementById (`video`)
    iframe.width  = iframe.parentNode.scrollWidth
    iframe.height = iframe.width * 9 / 16

</script> 