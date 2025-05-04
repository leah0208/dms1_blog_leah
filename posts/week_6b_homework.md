---
title: Week 6b Homewrork
published_at: 2025-04-15
snippet: Shadersss
disable_html_sanitization: true
allow_math: true
---
## Shader

<iframe class="p5js_canvas" src="https://editor.p5js.org/leah0208/full/GO-Kyxcj5"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>

## Reflection: What I Took from Information & Thinking by Michel Serres

Michel Serres’ Information & Thinking gave me new ideas for my chaos-themed p5.js work.

**1. “What is thinking, if not at least carrying out these four operations: receiving, emitting, storing and processing information like all existing things?”**

This sentence helped me see thinking as something shared by everything, not just humans. Every cell, plant, or pixel also does this. In my sketch, each grid cell does a simple form of thinking. It stores data and reacts when clicked or glitched. Together, the whole grid becomes a system that thinks.


**2. “The information that I am speaking of, instead, is closer to a rarity... and it constitutes the bedrock of thinking.”**

Serres says information is not something common. It is rare. These rare things come from disorder. I might use noise to create random, rare patterns in the grid. When glitch happens, it creates a short moment of visual surprise.

**3.“Inversely, thinking means inventing: getting hold of rarity, discovering the secret of that which has the huge and contingent chance to exist or to be born tomorrow.”**

This line links chaos to imagination. My code will use randomness to create new shapes. These shapes are always changing.It tries to make space for something new to appear.

**Technology choice**

recursion / glitch （might choose more later）

**Rough draft**

<iframe class="p5js_canvas" src="https://editor.p5js.org/leah0208/sketches/wRrTYAXTC"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>

Today I built the base grid—clicking cells toggles them black/empty. It’s simple now, but this will let users ‘draw’ into the system before I add noise and glitches.

1.Grid Structure 2D array

It's a simple way to track cell states `(true/false = filled/empty)`
Easy to scale (cols/rows adjust to canvas size)

Used black fill `(fill(0))` for "on" cells
Kept no fill + gray border `(noFill(), stroke(180))` for "off" cells

2. Click Interaction

Calculated cell index using `floor(mouseX / cellWidth)`

Added boundary checks to avoid errors `(if (i >= 0 && i < cols))`

Designed it to support future modes (later added play/pause)


**What I Planned to Add Next**

Dynamic Grid: Replace fixed cell sizes with noise-driven widths

Let the grid "breathe" over time (`t += speedSlider.value()`).

