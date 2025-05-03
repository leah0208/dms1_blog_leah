---
title: Week 4b Homework
published_at: 2025-04-03
snippet: 
disable_html_sanitization: true
allow_math: true
---

## Self-portrait


<iframe class="p5js_canvas" src="https://editor.p5js.org/leah0208/full/jH1RCHQaU"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>

![s1](/week4/s1.png)

I made a live self-portrait using pixel sort and a webcam.

I used `createCapture(VIDEO)` to turn on the webcam and show my face on the screen. Then I used `capture.loadPixels()` to read the colors from the video.

I used pixel sort to change the image. I sorted each row of pixels by how bright they were. I also used a threshold. This means only the bright parts of my face were changed.`updatePixels()` to apply visual changes frame by frame

The result shows a face that looks broken or glitchy. Some parts remain normal, while others seem to be falling apart. 


## Discussion

Rendering my face using pixel sort changes how people feel when they look at it. 

Sianne Ngai (2012) writes about three aesthetic registers: the zany, the cute, and the interesting. I think my pixel-sorted self-portrait goes into the category of the interesting. The image invites people to look closely and think about what is happening. It mixes something familiar (a face) with something broken (the glitch), which creates effective complexity (Galanter, 2003). 

In her essay A Phenomenology of Glitch Art, Menkman (2011) says that glitch reveals the failure of a system. The glitch in my image makes people notice the digital process behind the portrait. 

Jon Ippolito (2002) also talks about this in Ten Myths of Internet Art. He says that internet art is not only about making things perfect or smooth. Instead, artists can use the web to explore change, error, and process. My self-portrait is not a fixed image. It keeps changing in real time.  The broken image becomes a space where we can think about who we are online.


## References

<iframe width="560" height="315" src="https://www.youtube.com/embed/nMUMZ5YRxHI?si=W9ElmVVRjEBIpOjr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

**The Coding Train: "11.3: The Pixel Array - p5.js Tutorial"**

The video explains how `loadPixels()` gives access to every pixel’s RGBA values, which is how you were able to sort them by brightness.

Shiffman explains that the pixel array is one long list of numbers, where every four values represent one pixel (Red, Green, Blue, Alpha).

This also shows how to find the pixel index using  `(x + y * width) * 4.`
I used this same formula in my project to loop through each row and pull out `r`, `g`, and `b` values.



<iframe class="p5js_canvas" src="https://editor.p5js.org/jasminen/full/nWBBBlZmJ"></iframe>

<script type="module">

const iframes = document.querySelectorAll('.p5js_canvas');

if (iframes.length > 0) {
    iframes.forEach((iframe) => {
        iframe.width  = iframe.parentNode.scrollWidth;
        iframe.height = iframe.width * 9 / 16 + 42;
    });
}

</script>


**Webcam pixel sort 02 by jasminen**

From the second example Pixel Sort by jasminen, I learned how to sort pixels by brightness. 

The code goes through each row and changes the image to make it look glitchy. 
I used this idea in my own code by combining it with the webcam feed.

**Others：**

• [Video Capture Example on p5.js](https://p5js.org/examples/imported-media-video-capture/)

• Galanter, P. (2003) What is Generative Art? Complexity theory as a context for art theory. Available at: https://philipgalanter.com (Accessed: 3 Apr 2025).

• Ippolito, J. (2002) Ten Myths of Internet Art. Leonardo, 35(5), pp. 485–488.

• Menkman, R. (2011) A Phenomenology of Glitch Art. In: The Glitch Moment(um). Institute of Network Cultures.

• Ngai, S. (2012) Our Aesthetic Categories: Zany, Cute, Interesting. Harvard University Press.

