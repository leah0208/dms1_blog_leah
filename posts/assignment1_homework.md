---
title: Assignment 1
published_at: 2025-03-30
snippet: Final edition
disable_html_sanitization: true
allow_math: true
---



## Kindred Spirit--Bepo

<iframe class="p5js_canvas" src="https://editor.p5js.org/leah0208/full/9h8-ZHesk"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>

## Earlier version vs current version

**Earlier Version--Manually Adding Particles and Springs**

// Manually add each particle (12 points)
`particles.push(new Particle(400, 180));`
`particles.push(new Particle(389, 220));`
`particles.push(new Particle(360, 249));`
// ... 

// Manually connect springs
`springs.push(new Spring(particles[0], particles[1], 0.01));`
`springs.push(new Spring(particles[1], particles[2], 0.01));`
// ... 

**Current Version--Loop-Generated Structure**

First loop : builds a circular ring of particles

Second loop : connects each one to its neighbor (so they form a loop)

Third loop : adds extra “diagonal” springs to prevent the shape from wobbling too much

![s1](/A1/s1.png)
![s2](/A1/s2.png)
![s3](/A1/s3.png)

---

**Add shake effect**

 This adds a left-right “jiggle”  which happens right after squeezing. It makes the Bepo feel soft and alive.

`let shakeX = sin(shakeAngle) * shakeAmplitude;`

`particles[0].lock();`

`particles[0].x = lerp(particles[0].x, targetX + shakeX, lerpAmount); `// small horizontal wiggle

`particles[0].y = lerp(particles[0].y, targetY, lerpAmount);`

`particles[0].unlock();`

 ---

 **Remove the blur filter**

 I originally used a `filter(BLUR, value)` effect to give Bepo a soft appearance. 
 However, I noticed that the blur filter caused heavy lag, especially when Bepo was in motion or interacting with the mouse.

---

**Add background**

![bg1](/A1/bg1.jpg)

Instead of relying on blur, I embeded a blurred gradient image with soft pastel rings that feel playful and dreamy, perfectly matching Bepo’s personality.

It blends naturally with Bepo's semi-transparent body color.

---




____________________________________________________________
