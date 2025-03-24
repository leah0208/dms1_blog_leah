---
title: Week 2b Homework
published_at: 2025-03-14
snippet:  Expansion of 2a
disable_html_sanitization: true
allow_math: true
---

## Making CUTE kindred spirit in P5.js

**what is the context of my kinship?**

My kindred spirit is called Bepo. The connection between us feels like a kind of soul-level vibe -- something beyond the real world.

It’s more like a little creature born from my inner universe. It showed up because I’m always bouncing between two moods:

💥 Super power Mode : full of ideas/energy, super inspired, ready to make stuff happen.

😴 Procrastination Mode : suddenly like “ehhh whatever, I’ll do it tomorrow...”

Bepo lives off this “conflicted energy” of mine—the more torn I feel inside, the more hyped it gets. 
And weirdly, it actually helps me turn that messy indecision into real motivation.

It exists to pull me out of that lazy slump and help me get back into an energetic, creative state.

**what is our common purpose?**

Our goal is to beat procrastination and become a brighter, better self.

**who or what is our shared challenge / adversary?**

Main opponent:

“Lazy Mode” all the inner forces that hold me back -- procrastination, self-doubt, and overthinking.

Hidden enemies:

Over-rational thinking – sometimes I rely too much on logic and ignore my gut feelings. 
Boredom， one of the secret roots of procrastination. Bepo keeps things exciting so I don’t drift off and lose momentum yayyy.


- - - - - - - - - - - - - - - - - - - - - - - - - - - 

**Expansion of 2a**

To make Bepo looks softer and more jelly-like, I learned that I can use `filter()` to add a blur effect. 
It helps give Bepo that smooth, squishy vibe instead of looking flat.


<iframe class="p5js_canvas" src="https://editor.p5js.org/leah0208/full/3N_9OuMsj"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>



![blur1](/week2/blur1.png)

At first, I added filter() but it didn’t work, in my original code, `filter()` was affecting the entire canvas, not just Bepo.

To blur only Bepo’s body, I learned that I need to use createGraphics() to create an off-screen canvas. 

Then I draw Bepo’s body on that canvas, apply the blur there, and finally display it on the main canvas. 

![blur2](/week2/blur2.png)

Then I had another issue with the squeeze function.

Since I was drawing Bepo’s body on an off-screen buffer, but the mouse click detection was still happening on the main canvas, 

the click wasn’t registering properly,it looked like I was clicking on Bepo, but nothing happened.

To fix it, I updated my code so that the click detection still references Bepo’s actual position, 

even if the visuals are drawn on a different layer. After that, the squeeze interaction worked again.








## Falling Falling:


<iframe class="p5js_canvas" src="https://editor.p5js.org/leah0208/full/rbjfBvqV-"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>

**The lines of code that I'm  having trouble understanding**

1. `fill(lerpColor(f.colours[0], f.colours[1], f.phase));`

2. `f.phase += 0.008;`

3. `if (f.phase > 1) redundant.push(i);`

4. `redundant.forEach(n => fallers.splice(n, 1));`

![falling1](/week2/falling1.png)


5. `faller.curves = new Array(7).fill().map(rand_curve);`

6. `fallers.push(Object.assign({}, faller));`

![falling2](/week2/falling2.png)

I asked ChatGPT about these coding issues, and it helped explain what was going in a way that actually made sense. 
Then I went on YouTube to watch a few videos and look at some examples.

## Reference:

<iframe width="560" height="315" src="https://www.youtube.com/embed/-MUOweQ6wac?si=lEX2OggQKj0IZozI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/nicMAoW6u1g?si=OF1v9nfvu6vTt3tz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>








____________________________________________________________
