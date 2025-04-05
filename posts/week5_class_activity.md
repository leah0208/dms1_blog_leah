---
title: Class activity
published_at: 2025-04-03
snippet: 
disable_html_sanitization: true
allow_math: true
---

<script src="./scripts/p5.js"></script>

<canvas id="p5_example"></canvas>

<script>
    const cnv = document.getElementById ("p5_example")

    function setup () {
        createCanvas (300, 300, P2D, cnv)
    }

    function draw () {
        background (`pink`)
        console.log (frameCount)
    }
</script>


<script src="./scripts/p5.js"></script>

<canvas id="p5_example1"></canvas>

<script>
    const cnv = document.getElementById ("p5_example1")
    const w = cnv.parentNode.scrollWidth
    const h = w * 9 / 16


    function setup () {
        createCanvas (w, h, P2D, cnv)
    }

    function draw () {
        background (`red`)
        console.log (frameCount)
    }
</script>
