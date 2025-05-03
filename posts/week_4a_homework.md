---
title: Week 4a Homework
published_at: 2025-03-31
snippet: 
disable_html_sanitization: true
allow_math: true
---

## Canvas API Class Examples

<script src="./scripts/p5.js"></script>

<canvas id="p5_example"></canvas>

<script>
    const cnv = document.getElementById ("p5_example")

    function setup () {
        createCanvas (300, 300, P2D, cnv)
    }

    function draw () {
        background (`pink`)
        console.log (frameCount)
    }
</script>

## Example composition

**High Compressibility**
(Highly repetitive and easily compressed)

• Checkerboard pattern (black & white squares)

• Alternating squares (white, black, white, black...)

• Animation: The entire grid inverts colors every 1 second


<iframe class="p5js_canvas" src="https://editor.p5js.org/leah0208/full/MXpmIWQ20W"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>

**Low Compressibility**
(Random, unpredictable patterns don't compress well)

• Visual noise

• Every pixel gets a random color

• No structure or repeating patterns

<iframe class="p5js_canvas" src="https://editor.p5js.org/leah0208/full/d2Bll_X6N"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>


**High effective complexity**
（Structured yet unpredictable patterns）

• Recursive branching patterns (Inspired by 'The Coding Train's Algorithmic Botany')

• Visually coherent yet never exactly repeats

• Mathematical patterns that feel alive

<iframe class="p5js_canvas" src="https://editor.p5js.org/leah0208/full/upf17OVg7"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>


• L-System Implementation:

  Uses "F", "+", "-", "[", "]" symbols for turtle graphics

  F = draw forward, +/- = rotate, [] = branch points

• Each click applies the replacement rule:
  F → FF+[+F-F-F]-[-F+F+F


  ## Reading

  **What is Generative Art: Complexity Theory as a Context for Art Theory** (2003) 

  In his paper, Philip Galanter says that structure can be subjective, which means different people may see different patterns in the same artwork. This idea is helpful in generative art, because generative art often mixes rules and randomness. The artist does not always control the final result. 

![example3](/week4/example3.jpg)

  In the **third example**, I create a tree-like form using code. This structure comes from L-system rules, which tell the computer how to grow the tree step by step. I also use rotation and noise to make each branch a little different. The structure is there, but it looks natural and not too perfect. People might see a plant, coral, or even lightning. Everyone may see something different.

  ## Cry Don't Cry by Yehwan Song

  <iframe width="560" height="315" src="https://www.youtube.com/embed/-pVX-SPrhJM?si=09h_4fLFBOGbzNwV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

  **• Structure** 

  The word “CRY” is repeated in a bold, organized visual form.

  The work uses a web interface layout, like a browser window, buttons, text, and screen recordings.

  **• Randomness** 

  Live webcam input / Random movement and emotion from the person in front of the screen.

  When the person makes a crying face, the browser reacts, and the text or visuals look like tears falling. 

  **• Effective complexity**

  Not fully random, and not too perfect，it’s a mix of both. 

  The viewer can understand the system, but they don’t know exactly what will happen next.

  ___