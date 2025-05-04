---
title: Assignment 2
published_at: 2025-05-03
snippet: 
disable_html_sanitization: true
allow_math: true
---
##  Final version

<iframe class="p5js_canvas" src="https://editor.p5js.org/leah0208/full/Tp06R7YnN"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>


**Key Improvements from Step 7 to Final**

Beat Detection via Sound Amplitude -- I introduced `p5.Amplitude()` to analyze the live volume of the background music, enabling real-time audio-reactive visuals.

code:

`amplitude = new p5.Amplitude();`       // Create an amplitude analyzer
`amplitude.setInput(bgMusic);`         // Use background music as input

Beat-Reactive Flashing Grid Cells -- When a sudden spike in volume (a beat) is detected, a random selection of cells flash in red or white.

code:

`let level = amplitude.getLevel();`     // Get current music volume (0.0–1.0)

`let flashCount = floor(map(level, 0, 0.4, 0, 15));` // Map volume to how many cells to flash


`if (level - lastLevel > 0.1) { `       // Detect sudden volume increase = beat

  `for (let k = 0; k < flashCount; k++) {`

  `let i = floor(random(cols));`

 `let j = floor(random(rows));`

  `beatFlash[i][j] = 4;`             // Flash this cell for 4 frames
  `}`
`}`

`lastLevel = level;`                    // Save volume for next comparison

Rhythm-Driven Visual Response -- The number of flashing cells scales with beat intensity—stronger beats trigger more flashes, adding dynamic energy to the canvas.

Pulsing Animation -- Flashing cells grow and shrink slightly `(pulse = 1.1 + 0.2 * sin(...))`, simulating a rhythmic, heartbeat-like reaction.

## Project Accompaniment
![1](/A2/1.jpg)


**Core Coding Techniques**

**•Variables**

Used extensively to store system state (e.g. playing, t, contrast, glitchCells, lastLevel). Variables like `glitchStart` and `glitchDuration` are critical for managing timed visual effects.

**•Iteration**

Nested `for` loops control grid layout and animation. They are used to traverse both rows and columns for rendering `(draw())` and for checking states like flashing or glitching cells.

**•Functions**

Modular logic is handled through functions like spreadGlitch(i, j, depth) for recursive glitch effects, mousePressed() for user interaction, and draw() as the core animation loop.

**•Boolean Logic**

Boolean values (e.g. `playing, glitchActive, grid[i][j])` are used to determine whether to fill a cell, trigger sound, or activate visuals. Conditionals like `if (level - lastLevel > 0.1)` handle beat detection based on amplitude spikes.

**•Arrays**

2D arrays `(grid[][], beatFlash[][])` store the state of each cell. Arrays are also used for column/row sizes `(colWidths, rowHeights)` and for sound samples `(samples[])`.

**•Recursion**

The `spreadGlitch()` function uses recursion to propagate a visual explosion across neighboring cells. 

**Response to Information & Thinking by Michel Serress**

Michel Serres says that thinking begins in chaos. My project shows this idea through sound and moving images. The grid starts as neat, but noise and music break its order. Clicks create glitch waves that spread and change it. The system reacts and falls apart, then comes back together. This shows how chaos can lead to new patterns and thoughts.

**Why This Work is Post-Digital**

It embraces the glitch as a creative and aesthetic language rather than a failure.

It layers interactivity, randomness, sound, and screen-based data to reflect the hybrid realities of post-digital media.

It blurs the boundary between user and system, echoing post-digital themes of co-creation and entanglement.

## Project Display

**Youtube: https://youtu.be/vLwb4TctvL8**

![2](/A2/2.png)
![3](/A2/3.png)
![4](/A2/4.png)
