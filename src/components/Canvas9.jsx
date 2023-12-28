import { useEffect, useMemo, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

let particleArray;
let cw = 200;
let ch = 200;

export default function Canvas9(props) {
  particleArray = useRef([]);
  const [state, setState] = useState(0);

  useMemo(() => {
    for (let i = 0; i < 30; i++) {
      particleArray.current.push({
        x: Math.random() * cw,
        y: Math.random() * ch,
        speedX: Math.random() * 6 - 3,
        speedY: Math.random() * 6 - 3,
      });
    }

    return () => {};
  }, []);

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

  p5.setup = setup(p5);
  p5.draw = draw(p5);
  p5.mousePressed = () => mousePressed(p5);
}
function setup(p5) {
  return () => {
    p5.createCanvas(cw, ch);

    p5.pixelDensity(1);
  };
}
function draw(p5) {
  return () => {
    p5.background(255, 0, 0);
    particleArray.current.forEach((particle, i) => {
      drawParticle(p5, particle);
      particle.x += particle.speedX * p5.deltaTime * 0.01;
      particle.y += particle.speedY * p5.deltaTime * 0.01;
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
  console.log(particleArray);
  console.log(p5.frameRate());
}
