---
title: Week 2a Homework
published_at: 2025-03-12
snippet:  The cute idea?
disable_html_sanitization: true
allow_math: true
---

## Making CUTE in P5.js

**💫Visual Inspirations💫**

<style>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px; 
    max-width: 1200px; /* Maximum width */
    margin: 0 auto; /* at the center */
  }
  .grid-item {
    position: relative;
    padding-bottom: 100%; /* Keep 1:1 size*/
    overflow: hidden;
  }
  .grid-item img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Keep pics scale  */
    transition: transform 0.3s ease;
  }
  .grid-item:hover img {
    transform: scale(1.05);
  }
</style>
 
<div class="grid-container">
  <!-- First line -->
  <div class="grid-item">
     <img src="week2/star.jpg" alt="star">
  </div>
  <div class="grid-item">
   <img src="week2/glowing.jpg" alt="glowing">
  </div>
  <div class="grid-item">
   <img src="week2/Jellies.jpg" alt="Jellies">
  </div>
  
  <!-- Second line -->
  <div class="grid-item">
   <img src="week2/slime.jpg" alt="slime">
  </div>
  <div class="grid-item">
     <img src="week2/Jellysoda.jpg" alt="Jellysoda">
  </div>
  <div class="grid-item">
   <img src="week2/bunny.jpg" alt="bunny">
  </div>
</div>

- - - - - - - - - - - - - - - - - - - - - - - - - - - 

**Cute Visual**

| Example                   | Approach                                         | Techniques (coding might be used)                                             |
|---------------------------|--------------------------------------------------|-------------------------------------------------------------------------------|
| **Jelly-like Body**        | Semi-transparent gradient and soft deformation   | `fill(1xx,2xx,1xx,150)` + `lerp()` for smooth transitions                     |
| **Pulsing Wings**          | Periodic opacity/size changes                    | `sin(frameCount*0.1)` + `arc()` with rainbow colors                           |
| **Blinking Animation**     | Random interval eye closure                      | `random()` timing with dynamic `arc()` drawing                                |
| **Bouncy Star Trail**      | Fading stars following movement                  |  haven't figured out
 

 **Cute Sounds**

| Example                   | Approach                                         | Techniques                                                                    |
|---------------------------|--------------------------------------------------|-------------------------------------------------------------------------------|
| **"lub dub" Click SFX**    | High-pitched short tones?                        |`.mp3`                                                                         |
| **Wind Chime Wings**       | Something on wing flap                           | Tone.js                                                                       |
| **ASMR Squish SFX**        | Bubble-wrap-like compression noise               | `.mp3` + `isSqueezed` state trigger                                           |
| **Fail Whimper**           | Puppy-like whine on timeout                      | `loadSound()` + `setTimeout()`                                                |


 **Cute Interactions**

| Example                   | Approach                                         | Techniques                                                                    |
|---------------------------|--------------------------------------------------|-------------------------------------------------------------------------------|
| **Squish**                | Pressure-based deformation                       | spring physics simulation ?                                                    |
| **Particle Trail**        | Colorful fading particles                        | Particle array + alpha gradient                                              |
| **Drag Reaction**         | ╯°□°）╯︵┻━┻ face on fast drag                    | `mouseDragged()`                                                             |
| **Following**             | Delayed pet-like chasing                         | `followMouse`                                                                |


Plus: I also want to make something like character dozes off when not operated for a long time (Zzz bubble) 
      
So my kindred spirit, **Bepo**, is a squishy, bouncy, mochi/jelly-like creature that exists purely to be adorable. 
When its wings flap, they shed tiny glowing star dust that sparkles in the air for a few seconds before fading. 
And Bepo doesn’t have a fixed face, but when it feels something strongly, its emotions just pop up on its surface 
like digital emoji reactions:(╯°□°）╯︵ ┻━┻ / (￣ω￣)







## p5 sketch:

<iframe class="p5js_canvas" src="https://editor.p5js.org/leah0208/full/IsRrGdCKvy"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>

![1comment](/week2/1comment.png)
![2comment](/week2/2comment.png)
![3comment](/week2/3comment.png)








## Video Reference:

<iframe id="video" src="https://www.youtube.com/embed/8uLVnM36XUc?si=J9tIusPkuvY629NS"  title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>



<script type="module">

    console.log (`hello world! 🚀`)

    const iframe  = document.getElementById (`video`)
    iframe.width  = iframe.parentNode.scrollWidth
    iframe.height = iframe.width * 9 / 16


</script> 
I learned how to make an object follow the mouse smoothly.By using lerp(x, targetX, followSpeed);, 
I was able to create a natural movement effect instead of making Bepo instantly snap to the mouse.
And adjusting followSpeed can make the movement feel either more fluid.

**What I want to do next**

Right now, Bepo only stretches horizontally when squeezed.
I wondered if I could add a bounce-back animation to make it feel more elastic? Currently, the wings are static arcs, but I want them to move.
I thought about may use sin() to create a subtle flapping effect.

_____________________________________________________________
