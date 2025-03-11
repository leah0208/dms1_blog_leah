---
title: Week 1b Homework
published_at: 2025-03-09
snippet:  In Week 1b homework blog, I analyzed Rafael's "Reflection" (2025), discussing its visual effects and technical aspects. 
disable_html_sanitization: true
allow_math: true
---

## Discussions of The Reflection (Rafael,2025)

![rafael reflection1](/week1/reflection1.png)

**1.what do you think is going on, under the hood?**

"Probably JavaScriptL, using loops and maybe some interactive elements."

"It plays with the mirroring and light tricks to blur the edge of circle."

"It's trippy. Probably a mix of random colors and smart coding."

**2.what concepts would I need to understand in order to replicate this work in p5?**

Canvas and drawing basics.

Color and gradients for smooth transitions.

Creating seamless looping animations.

Shapes and mirroring for reflection effect.

**3.what resources might help me to learn those concepts?**

 The basic coding train on YouTube  /   p5.js reference for all the functions on Canvas Modules 

![rafael reflection2](/week1/reflection2.png)







## p5 sketch:

<iframe class="p5js_canvas" src="https://editor.p5js.org/leah0208/full/eyl4RG6au"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>

I created this p5.js sketch to explore dynamic animations and interactive visuals. In this piece, a circle gradually expands from the center of the canvas, starting with a randomly selected color from the palette. Once it grows large enough to cover the entire screen, it resets with a new color and a slower growth rate. To make it more interactive, I added a feature where clicking the mouse increases the expansion speed. 

**Brief explanation of how my p5.js sketch works**

1. Define Color Palette --> 

`let colors = ["#cc00cc","#ff33ff","#ff66ff","#ff99ff","#ffccff"];`

2. Initialize Variables --> 

`let diameter = 1;`
`let rate = 2;`
`let ellipseColor;`
`let canvasWidth = innerWidth;`
`let canvasHeight = innerWidth * 9/16;`

3. Setup Function_Runs Once --> 

`function setup(){createCanvas(canvasWidth,canvasHeight);`
   ` ellipseColor = random(colors);}`

4. Draw Function_Runs Continuously -->

`function draw() {`
    `background(255);`
   ` noStroke();`
   ` fill(ellipseColor);`
   ` ellipse(canvasWidth / 2, canvasHeight / 2, diameter, diameter);`
    `diameter += rate;`

5. Reset When the Circle Covers the Canvas -->

`if(diameter > max(canvasWidth, canvasHeight) * 1.5){`
    `diameter = 0;`
  `  ellipseColor = random(colors);`
   ` rate = 1; }`

6. Mouse Interaction -->

`function mousePressed(){`
   ` rate += 1;}`


![p5js_week1b_sketch1](/week1/p5js_week1b_sketch1.png)

![p5js_week1b_sketch2](/week1/p5js_week1b_sketch2.png)




## Video Reference:

<iframe id="video" src="https://www.youtube.com/embed/videoseries?si=9idqLeijsQQ9RZqP&amp;list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA"  title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>



<script type="module">

    console.log (`hello world! 🚀`)

    const iframe  = document.getElementById (`video`)
    iframe.width  = iframe.parentNode.scrollWidth
    iframe.height = iframe.width * 9 / 16

</script>


**Learning from The Coding Train & My Exploration**

I started learning p5.js by following tutorials from The Coding Train, where I was introduced to core functions like `setup()`, `draw()`, and `createCanvas()`.

![exploration1](/week1/Exploration1.png)
![exploration2](/week1/Exploration2.png)

After understanding the basics, I started my own interactive visual experiment. Here's what I did:

***1. Creating an expanding circle***

I wanted to create an effect where a circle grows from the center and resets when it gets too big.

I used a diameter variable and increased it over time with `diameter += rate;.`

To ensure it reset properly, I added a condition to check if it exceeded `max(canvasWidth, canvasHeight) * 1.5.`

***2. Adding color transitions***

I didn't want the circle to always have the same color, so I created a color palette and used `random(colors)` to assign a new color when the circle resets.

***3. Making it interactive***

Text tracking mouse movement: Inspired by another tutorial, I added `text(str, mouseX, mouseY);` so that text follows the Mouse.

***4. Challenges and Adjustments***

Canvas Resizing: Initially, I set a fixed canvas size, but then I learned to make it responsive using innerWidth and a 16:9 aspect ratio `(canvasHeight = innerWidth * 9/16).`

And the transitions at first felt too abrupt, so I adjusted the rate and reset values to create a smoother effect hahahh.
