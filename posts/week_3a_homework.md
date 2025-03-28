---
title: Week 3a Homework
published_at: 2025-03-19
snippet:  
disable_html_sanitization: true
allow_math: true
---

![eggalone](/week3/eggalone.png)

**Eggalone.com (Rafaël Rozendaal)**

There's nothing else on the page—just a blank background and the egg.

It’s floating in space. The egg is simple, but it somehow holds the attention.

no sound no interaction but cute.


- - - - - - - - - - - - - - - - - - - - - - - - - - - 

**Feedback from a colleague**

**1.How well did you achieve a cute aesthetic?**

The jelly-like blur effect on the body gives Bepo that soft, touchable feel. Super cute. 
Squeeze reaction, the squish when clicked adds a whole new level of charm. 

**2.What could you try to increase the cuteness?**

The sharp rainbow wings might not be the best fit — they look a bit out of place.

Cute sound effects / The stardust 

**3.How might you use implement these improvements using javascript?**

Later on, try loading a .mp3 with `loadSound()` and playing it on click. 
 
And add facial expression on Bepo

if (isSqueezed) {
  faceText = "(×﹏×)";
} else {
  faceText = "(｡•́‿•̀｡)";
}
text(faceText, circleX, circleY);


- - - - - - - - - - - - - - - - - - - - - - - - - - - 


**Continue with previous work**




<iframe class="p5js_canvas" src="https://editor.p5js.org/leah0208/full/Opuek0c1P"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>

1.I took the idea of removing the wings from my classmate. And then I added the emoji face to Bepo.
  Instead of just being a squishy shape, it started to feel like a little creature with moods.

![emoji1](/week3/emoji1.png)
![emoji2](/week3/emoji2.png)

2.I added floating stars ("☆" and "★")
  This made movement look magical and playful.
  It leaves sparkles behind as it moves.

  At first, I used `random(["☆", "★"])` directly in the draw loop, but I realized this caused a flickering effect.
  I fixed it by assigning each star a fixed symbol when it was created, and then just displaying that saved symbol every frame.

![stardust](/week3/stardust1.png)

 `starDust.push({ ... });`
  It means-here’s a new star. Save all its info(position, size, speed, color, shape) and add it to my list of active stars so I can animate and draw it later.

![stardust_push](/week3/stardust_push.png)

3.I used timed animations for the squeeze effect. Instead of instantly snapping, it now reacts more naturally and slowly.
![millis](/week3/millis.png)

`squeezeTimer = millis();`

This is used to track how long the squeeze has been happening,I am saving the current time (in milliseconds) 
so you can smoothly bring Bepo back to normal shape over time.





## Reference:

<iframe width="560" height="315" src="https://www.youtube.com/embed/B-N-isc31Z0?si=sqO-hJSb9O36xqNm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/UcdigVaIYAk?si=razMfw62sUaMHJTI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>







____________________________________________________________
