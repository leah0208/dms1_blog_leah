
let lines = [];

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("poem-canvas-container");
  background(0);
  textFont("Courier");
  textSize(16);
  fill(255);

  lines.push("my face is a " + RiTa.randomAdjective() + " machine");
  lines.push("looped in " + RiTa.randomNoun() + " and glow");
  lines.push("each pixel " + RiTa.randomVerb() + "s a different mood");
  lines.push("while memory " + RiTa.randomVerb() + "s below");

  lines.push("I " + RiTa.randomVerb() + " in compressed silence");
  lines.push("my data " + RiTa.randomVerb() + "s like rain");
  lines.push("not broken, just " + RiTa.randomPastParticiple());
  lines.push("in " + RiTa.randomAdjective() + ", liquid pain");

  lines.push("the screen forgets my " + RiTa.randomNoun());
  lines.push("the code forgets my " + RiTa.randomNoun());
  lines.push("but in the hum of " + RiTa.randomNoun());
  lines.push("I'm everyone, the same");
}

function draw() {
  background(0);
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], 30, 40 + i * 30);
  }
}
setup() 