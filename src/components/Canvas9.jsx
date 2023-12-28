import { useEffect, useMemo, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

let particleArray;

export default function Canvas9(props) {
  particleArray = useRef([]);
  const [state, setState] = useState(0);
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
  // p5.preload = preload(p5);
  for (let i = 0; i < 30; i++) {
    particleArray.current.push({
      x: p5.random(0, 200),
      y: p5.random(0, 200),
      speedX: p5.random(0, 3) * 1 - 1,
      speedY: p5.random(0, 3) * 1 - 1,
    });
  }
  p5.setup = setup(p5);
  p5.draw = draw(p5);
  p5.mousePressed = () => mousePressed(p5);
}
function setup(p5) {
  return () => {
    p5.createCanvas(200, 200);

    p5.pixelDensity(1);
  };
}
function draw(p5) {
  return () => {
    p5.background(255, 0, 0);
    particleArray.current.forEach((particle, i) => {
      drawParticle(p5, particle);
      particle.x += particle.speedX;
      particle.y += particle.speedY;
    });
  };
}
function drawParticle(p5, particle) {
  p5.noFill();
  p5.stroke(0);
  p5.push();
  p5.fill(255, 120, 0);
  p5.circle(particle.x, particle.y, 10);
  p5.pop();
}
function mousePressed(p5) {
  // console.log(vectorArray);
  console.log(p5.frameRate());
}
