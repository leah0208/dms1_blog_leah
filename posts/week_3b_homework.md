---
title: Week 3b Homework
published_at: 2025-03-22
snippet:  Soft body effect & Final project
disable_html_sanitization: true
allow_math: true
---



## Soft body effect

<iframe class="p5js_canvas" src="https://editor.p5js.org/leah0208/full/uewv5MPau"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>

**Set up**

![setup](/week3/setup.png)

I watched the tutorial and need to duplicate the sketch before I can start the rest of the work.

___
**Add sound**


I need to add these `<script>` tags. Without them, It'll get errors like: loadSound is not defined or createCanvas is not a function.

![sfx1](/week3/sfx1.png)

Next, I loaded the sound. Before the program starts, I got the sound file ready. Then, each time I click the mouse, the sound will play.

![sfx2](/week3/sfx2.png)
![sfx3](/week3/sfx3.png)
___

**Process**

From the tutorial, I learned that I need to use the toxiclibs physics library to build a "particles + springs" system.

VerletPhysics2D: controls the whole physics world

VerletParticle2D: a particle object

VerletSpring2D: a spring that connects two particles

![toxiclibs](/week3/toxiclibs.png)

___

I imported the physics-related classes, along with gravity and coordinate vectors.
Then, I created the canvas in the setup() function.

![P1](/week3/p1.png)

I added a gravity behavior to the system (pulling things downward), just like Earth’s gravity.
Then I created one particle and placed it in the center of the canvas.
![P2](/week3/P2.png)

After that, I made a second particle and connected them with a spring.
The spring has a length of 100 and a strength of 0.5, which controls how much force pulls them together.
![P3](/week3/P3.png)

At first, the particles were only connected to their neighbors.
Then I added more connections (like connecting point 0 to point 4), 
so the structure turned into a stable web-like ball — just like Bepo’s body.

![P4](/week3/P4.png)
![P5](/week3/P5.png)
 ---

These code can drag a particle with the mouse.

`lock()` temporarily freezes the particle
`mouseX / mouseY` moves the particle to follow the mouse
`unlock()` releases the particle so the physics system can take over again

![P6](/week3/P6.png)


Because drawing each particle one by one is too much work, I created a class called Particle that extends VerletParticle2D.
It sets the particle size with this.r = 2, and uses circle() to draw it.
Then it's added to the physics system so it can take part in the physics simulation. (Same idea for springs too!)
![P7](/week3/P7.png)

Then I created two arrays:

One to store all the particles
One to store all the springs 
![P8](/week3/P8.png)

I added two particles — one at the top, one below it.
![P9](/week3/P9.png)

I connected the first and second particle with a spring.
The 0.01 sets how strong the spring is.
![P10](/week3/P10.png)

 Using `for(loop)` to draw all particles and springs that exist between particles as lines.
 ![P11](/week3/P11.png)
 ![P12](/week3/P12.png)

 Similar to the previous, this allows me to drag the second particle (particles1) with the mouse.
  ![P13](/week3/P13.png)
 ---

**Reference:**

 sfx source: https://uppbeat.io/sfx/category/cute-aesthetic/cute
`loadSound()` : https://p5js.org/reference/p5/loadSound/
`push`: https://p5js.org/reference/p5/push/
<iframe width="560" height="315" src="https://www.youtube.com/embed/IxdGyqhppis?si=S3RpXbJYvvHGOW8a" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

plus: I didn’t want to write 50 lines of almost the same code... so I let ChatGPT do the boring part for me 😅
  ![chatgpt1](/week3/chatgpt1.png)
  ![chatgpt2](/week3/chatgpt2.png)

---
## Continue with the previous work

**Variables**

`physics`, `particles`, `springs` for the physics simulation
`displayText`, `expression` for the changing face
`targetX/Y`, `lerpAmount` for smooth movement...

**Functions**
`preload()` - loads assets
`setup()`- initializes everything
`draw()` - main animation loop
`mousePressed()` - handles interaction

`addStarDust()` - creates new sparkle particles
`drawStarDust()` - renders and updates sparkles


**Iteration**
`for loops` in `setup()` to create particles and springs


**Boolean Logic**

`if (squeezeTimer > 0)`checks if squeezing is active
`if (progress >= 1)` checks if squeeze animation completed
`if (d < 60)` checks if click was near Bepo's center

**Arrays**

`particles[]` - stores all particle objects
`springs[]` - stores all spring connections
`starDust[]` - stores sparkle particles

**Classes**

`VerletPhysics2D `for physics engine
`VerletParticle2D` and VerletSpring2D for physics elements
...







____________________________________________________________
