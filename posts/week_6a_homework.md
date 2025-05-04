---
title: Week 6a homework
published_at: 2025-04-13
snippet: 
disable_html_sanitization: true
allow_math: true
---
## Brief summary of readings

**Information & Thinking by Michel Serres**

Michel Serres was a French philosopher. His book Information & Thinking says knowledge is not fixed. Information moves like a river, not a straight line. Noise and mistakes can create new ideas. Errors and static are not just disruptions; they are the raw material of innovation.Chaos births order. He also believed thinkers should connect different fields. Technology changes how we think. Tools like writing and computers shape our minds.

**What Is It Like to Be A Fungus? by Merlin Sheldrake**

Sheldrake shows fungi are different from plants and animals. Fungi grow as mycelium networks underground. These networks link whole ecosystems. Fungi do not have brains but they can do many things. They find the shortest path in mazes. They exchange food with trees. They use bacteria to help them. Some fungi live for thousands of years and spread over large areas. They understand their surroundings using chemicals. Fungi are useful to humans. They clean polluted soil. They make eco-friendly materials. Fungi make us question what intelligence means. They are not simple life forms. They think in ways we don't fully understand. Studying fungi helps us understand life better.

**Xenofemenism: A Politics for Alienation by Laboria Cuboniks**

Xenofeminism: A Politics for Alienation by Laboria Cuboniks proposes a radical feminist approach. Modern life feels disconnected. The statement says use this feeling as power. Technology can fight oppression. It should be hacked to destroy hierarchies. Biology and gender roles are not fixed. They can be redesigned. Liberation must include all people. Differences should not cause oppression. The text rejects "natural" orders. Nature has been used to control people. Nothing is sacred. Everything can be changed.







## q5.js / c2.js / svg.js

**q5.js**- For quick, fun projects where users want a p5.js-like feel but with less overhead.(Canvas (pixel-based))

**c2.js**- For complex 2D animations (e.g.,complex UI effects).(Canvas (but remembers shapes))

**svg.js**-  When user need resolution-independent graphics ?? Perfect for sharp, resizable shapes.(SVG (vector-based))

**Can we use these libraries from within a javascript module? Explain why / why not.**

Yes! For modules, pick svg.js—others may need `<script>`.

**q5.js** can be loaded via` <script> `or CDN import

**c2.js**  Depends on version check docs, may need `<script>`

**svg.js**  Full support,just npm install + import

**In what situations might a tool like esm.sh be useful?**

For Non-Module Libraries (like q5.js or older packages)
If a library doesn't support import, esm.sh will convert it to work with import.

**Example:**

`import q5 from 'https://esm.sh/q5' ` // Even if q5 has no official module support!



**q5.js Signal Attempt**

<script src="https://q5js.org/q5.min.js"></script>

<script>
let value = 0;
let isRising = true;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(240);
  
  // Simple envelope: rise to 255, then fall to 0
  if (isRising) {
    value += 1;
    if (value >= 255) isRising = false;
  } else {
    value -= 1;
    if (value <= 0) isRising = true;
  }
  
  // Visualize the signal
  fill(value, 100, 150);
  circle(width / 2, height / 2, value / 2);
  
  // Label
  fill(0);
  text("Signal: " + int(value), 10, 20);
}
</script>

<div id="p5-sketch"></div>

![signal](/week6/signal.png)

**Key Focus**

Time-Based Signal: A variable (value) changes over time to simulate an "envelope" (rise/fall pattern).

The signal controls a circle’s size/color for intuitive understanding.

Works in browsers with just a` <script> `tag (no npm/build tools).

