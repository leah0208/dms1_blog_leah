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



Core Coding Techniques
This work demonstrates several foundational programming concepts in creative, layered ways:

✅ Variables

Used extensively to store system state (e.g. playing, t, contrast, glitchCells, lastLevel). Variables like glitchStart and glitchDuration are critical for managing timed visual effects.

🔁 Iteration

Nested for loops control grid layout and animation. They are used to traverse both rows and columns for rendering (draw()) and for checking states like flashing or glitching cells.

🧠 Functions

Modular logic is handled through functions like spreadGlitch(i, j, depth) for recursive glitch effects, mousePressed() for user interaction, and draw() as the core animation loop.

🔘 Boolean Logic

Boolean values (e.g. playing, glitchActive, grid[i][j]) are used to determine whether to fill a cell, trigger sound, or activate visuals. Conditionals like if (level - lastLevel > 0.1) handle beat detection based on amplitude spikes.

📦 Arrays

2D arrays (grid[][], beatFlash[][]) store the state of each cell. Arrays are also used for column/row sizes (colWidths, rowHeights) and for sound samples (samples[]).

🧱 Classes

While no custom classes are explicitly defined in this version, the system leverages object-like structures (e.g. {i, j} cell objects in glitchCells) and p5.js built-in class instances like p5.SoundFile, p5.Amplitude, and p5.Delay.

🔁 Recursion

The spreadGlitch() function uses recursion to propagate a visual explosion across neighboring cells. It spreads the glitch effect in expanding waves, mimicking organic or chaotic diffusion.

