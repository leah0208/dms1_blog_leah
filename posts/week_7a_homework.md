---
title: Week 7a Homewrork
published_at: 2025-04-19
snippet: Sound Design
disable_html_sanitization: true
allow_math: true
---
## Sound design for AT2 function in a chaotic aesthetic register?  What does it mean to be chaotic in the sonic domain? 


Chaos in sound isn't merely about randomness; It's about creating a balance between order and disorder, predictability and surprise.

In sound design, effective complexity can be achieved by balancing familiarity and novelty(Using recognizable sounds in unfamiliar contexts).

• Structure:  Incorporate dissonance or unexpected chord progressions.

• Voice: Combine multiple vocal tracks with varying pitches and effects.

• Noise: Break sounds into tiny grains and reorganize them unpredictably.


**De-familiarisation (Loveless)**
Stretch or compress time to distort perception./ Merge sounds from different sources to create new identities.

**My plan**

The sound should feel a little broken, surprising, and chaotic — not smooth or relaxing.

• **Background music：** I will load a Jungle/uk garage background music using `preload()`.
 
  This background music will play in a loop. But when I click the mouse, the music will glitch(If it can be achieved):

  It may pause and jump to a new part?

  It might echo or sound broken?
  
  This glitch makes the music feel unstable for a moment.  

 • **Click = play a random sound sample：**

   When I click the mouse:
   A random short sound will play (like a voice, glitch noise, or beep).

   These sounds are preloaded in an array.


## Sound design experiment

**<button id="startButton">🎧Play</button>**

<!-- Load Tone.js audio library -->
<script src="https://cdn.jsdelivr.net/npm/tone@latest/build/Tone.js"></script>
<script>
 // Initialize audio player with looped track
  const player = new Tone.Player({
    url: "../week7/Oscuro.mp3", 
    loop: true,           // loop
    autostart: false      // Don't play automatically
  }).toDestination();
    // Add lowpass filter (initial cutoff at 800Hz)
  const filter = new Tone.Filter(800, "lowpass").toDestination(); // sum filter
  player.connect(filter);
  // Setup play button interaction
  document.getElementById("startButton").addEventListener("click", async () => {
    // Required browser audio context activation
    await Tone.start();
    player.start();
    let isChaos = false;
    setInterval(() => {
         // Toggle between chaos/normal every 12 seconds
      isChaos = !isChaos;
      if (isChaos) {
         // Chaos mode: random playback speed and filter frequency
        for (let i = 0; i < 24; i++) {
          const t = Tone.now() + i * 0.5;
          const rate = Math.random() * 1.5 + 0.5; // Random speed (0.5x-2x)
          const freq = Math.random() * 2000 + 500; // Random filter (500-2500Hz)
          player.playbackRate = rate;
          filter.frequency.setValueAtTime(freq, t);
        }
      } else {
           // Return to normal playback
        player.playbackRate = 1.0;
        filter.frequency.rampTo(800, 5); // Smooth transition back to 800Hz
      }
    }, 12000); // State changes every 12 seconds
  });
</script>

![sound](/week7/sound.png)

 
 I placed my `Oscuro.mp3` file inside the `week7/`folder of my blog project. It took me a while to fix the path, but I got it working 😭.
 I used `Tone.Player` to load the mp3, and added a `Tone.Filter` to change the sound and make it feel more chaotic during certain times.
 I used `setInterval` to switch every 12 seconds. The first 12 seconds are “chaos” — with fast changes in playback speed and filter frequency. The next 12 seconds return to normal. Together, they create a 24-second loop.