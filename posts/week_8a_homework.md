---
title: Week 8a Homewrork
published_at: 2025-05-05
snippet: 
disable_html_sanitization: true
allow_math: true
---
##  Sianne Ngai: Zany, Cute, Interesting

**"Unlike the interesting, the zany really works against its constraints."**

**1.What do you think she means by this?**

McKenzie Wark says the zany works against its limits. This means the zany character or action does not stay still. It does not follow rules. It shows effort in a strange or funny way.

**2.In what ways would you consider the chaotic and the zany to be similar?  In what ways are they different?**

Chaos and zany are alike because both are full of energy. Both feel hard to control. Both can mix things that do not belong. But Chaos is messy and random. Zany often comes from people. It shows emotion or stress. Zany is funny. Chaos is not always funny.

**3.In what ways would you consider your AT2 to be zany?**

Moving a lot? The shapes change in unexpected ways. The grid glitches like it is trying to do something. Like changing their color or size. The mouse click adds surprise. These parts feel like a body working too hard.

**4.What might be some ways to make your AT2 more zany?**

Add funny or broken sounds on click. Use a voice that says something silly or stressed. Flash colors when chaos happens??

##  Assignment 2 -- Process

**Step 03 Noise-Driven Dynamic Grid + Speed & Strength Sliders**

<iframe class="p5js_canvas" src="https://editor.p5js.org/leah0208/full/hzErELp_6"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>
**key codes**

`noise()` – to make smooth changes in size over time

`createSlider()` – to add sliders for user control

`reduce()` – to calculate the total of all column/row values

 Mouse checking with updated box sizes – to keep clicking accurate

Continuing from the previous step 2, I made many changes.

Before, each box had a fixed size. Now, their sizes change using Perlin noise, which looks more natural and wavy.

I added sliders

– One slider controls how fast the grid changes.

– The other controls how strong the changes are (how much the sizes vary).


**Step 04 Add Play/Pause and Clear Buttons**

<iframe class="p5js_canvas" src="https://editor.p5js.org/leah0208/full/LMQjVTXXT"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>

**What I improved**

 1.Play/Pause Button - Now users can stop and start the animation anytime. This gives more control.

 2.Clear Button	- I added a button to clear all the filled boxes. No need to click one by one.

 **Key codes**

`createButton()`	Creates new buttons ("Play", "Empty") for users to click.

`mousePressed(()` => { ... })	Adds actions when the buttons are clicked.

`playing = !playing`	Switches between playing and paused states.

`if (playing) return`;	Stops users from changing the grid when it’s running—only allows clicks when paused.

`grid[i][j]` = false	Clears the grid—sets all cells to empty.

`playPauseButton.html(...)`	Updates the button text between “Play” and “Pause” to match the state.

**Step 05 - Add Glitch Effect and Inversion on Click While Playing**

<iframe class="p5js_canvas" src="https://editor.p5js.org/leah0208/full/s-66xhFdj"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>

**What I improved**

Now users can also trigger glitch effects when clicking during play mode.

Clicking while playing now causes a cool visual reaction — not editing, but glitching.

And there’s shaking, offset, and color flickering — more dynamic and expressive.

 **Key codes**

`glitchCells = []` and `.some()`	Tracks which cells should "glitch" temporarily.

`millis()`	Checks how long the glitch should last — a timer.

`random(['red', 'green', 'blue'])`	Gives the glitch effect random RGB colors.

`random(-10, 10)`	Makes the glitchy cells "shake" or offset randomly.

`pow(noise, contrast)`	I added contrast control to change the sharpness of movement.

`fill(grid[i][j] ? 255 : 0)`	I made inversion logic: if black, turn white; if white, turn black.


**Step 06 - Recursive RGB Glitch Spread with Overlay**


<iframe class="p5js_canvas" src="https://editor.p5js.org/leah0208/full/QtXOBbEJD"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>

**What I improved**

**Recursive Glitch Spread**Instead of glitching only nearby filled cells in a square range, now the glitch spreads outward like a wave, using recursion with a timed delay. 

I also added a flashy color split effect by separating the red, green, and blue channels and shifting them slightly. This gives the screen a real-time "glitch camera" vibe during the glitch burst.

I used `millis()` to control how long the overlay effect stays on screen, giving it a pulsing, temporary feel that syncs with the glitch event.

 **Key codes**


`spreadGlitch(i, j, depth)`	A recursive function that spreads the glitch effect cell by cell outward, with decreasing depth.

`setTimeout(..., 40)`	Adds a delay between recursive glitch calls to simulate a ripple or burst effect over time.

`get() + createImage()`	Captures the current canvas and prepares separate images for red, green, and blue channels.

`r.pixels[i] = snap.pixels[i]`	Manually splits RGB channels, giving that classic glitch overlay look.

`image(r, random(-5, 5), 0)`	Shifts each color layer by a few pixels to create channel misalignment.

`millis() - glitchOverlayStart < glitchOverlayDuration`	Times how long the RGB overlay should appear, keeping the effect clean and not permanent.

**Step 07 - Background music, random samples, and echo delay**

![1](/week7/1.png)

<iframe class="p5js_canvas" src="https://editor.p5js.org/leah0208/full/iIG768kMY"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>

**What I improved**

I added a looping music track that smoothly fades in/out when play/pause is toggled. When the user clicks during play mode, a random sound effect from the sample list is played, adding surprise and variety. Every time a glitch is triggered, it applies a short delay (echo) to the background music. The glitch visuals (jitter, RGB overlay, recursive spread) are now tightly linked to audio events—making it a multi-sensory experience

 **Key codes**

`loadSound()` in `preload()`	Loads both background music and sound samples before setup begins.

`bgMusic.fade()`	Smoothly fades music volume in or out over time.

`random(samples)`.`play()`	Chooses and plays a random sound effect when glitch is triggered.

`delay.process()`	Adds an echo-like effect to the music briefly, then removes it with delay.disconnect().
