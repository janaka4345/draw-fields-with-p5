import { useEffect, useMemo, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

let cw = 200;
let ch = 200;
let mandel;
export default function CanvasWithShader(props) {
  const [state, setState] = useState(0);

  //calculating and adding the particle array

  return (
    <div>
      <div

      // style={{ width: "100%", height: "100%" }}
      >
        <ReactP5Wrapper sketch={sketch} />
        <button onClick={() => setState((prev) => (prev += 1))}>click</button>
        <h1>{state}</h1>
      </div>
    </div>
  );
}

function sketch(p5) {
  p5.preload = preload(p5);

  p5.setup = setup(p5);
  p5.draw = draw(p5);
  p5.mousePressed = () => mousePressed(p5);
}
function setup(p5) {
  return () => {
    p5.createCanvas(cw, ch, p5.WEBGL);

    p5.pixelDensity(1);
  };
}
function draw(p5) {
  console.log(mandel);
  return () => {
    p5.background(0, 0, 0, 255);
    drawParticle(p5, -50, -50, 20);
  };
}
function preload(p5) {
  mandel = p5.loadShader("shader.vert", "shader.frag");
}
function drawParticle(p5, x, y, size) {
  p5.push();
  p5.noStroke();
  p5.fill(255, 255, 255);
  p5.circle(x, y, size);
  p5.pop();
}
function handleParticles(p5, particle) {
  // handling each particle
}
function mousePressed(p5) {
  console.log(p5.frameRate());
}
