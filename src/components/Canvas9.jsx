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
      let x = Math.random() * cw;
      let y = Math.random() * ch;
      particleArray.current.push({
        x,
        y,
        speedX: Math.random() * 6 - 3,
        speedY: Math.random() * 6 - 3,
        size: 5,
        history: [{ x, y }],
        maxLineSegments: 30,
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
    p5.background(0, 0, 0);
    particleArray.current.forEach((particle, i) => {
      drawParticle(p5, particle);
      // handling each particle
      particle.x +=
        particle.speedX * p5.deltaTime * 0.01 + p5.random(-1.5, 1.5);
      particle.y +=
        particle.speedY * p5.deltaTime * 0.01 + p5.random(-1.5, 1.5);
      particle.history.push({ x: particle.x, y: particle.y });
      particle.history.length > particle.maxLineSegments
        ? particle.history.shift()
        : null;
    });
  };
}
function drawParticle(p5, particle) {
  p5.push();
  p5.noStroke();
  p5.fill(255, 255, 255);
  p5.circle(particle.x, particle.y, particle.size);
  p5.pop();

  p5.push();
  p5.stroke(255);
  p5.noFill();
  p5.beginShape();
  particle.history.forEach((line) => {
    p5.vertex(line.x, line.y);
  });
  p5.endShape();
  p5.pop();
}

function mousePressed(p5) {
  // console.log(particleArray);
  console.log(p5.frameRate());
}
