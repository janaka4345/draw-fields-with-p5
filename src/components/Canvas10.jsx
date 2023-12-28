import { useEffect, useMemo, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

let particleArray;
let flowFieldArray;
let cw = 200;
let ch = 200;
let cellSize = 10;
let rows = Math.floor(ch / cellSize);
let coloumns = Math.floor(cw / cellSize);

export default function Canvas10(props) {
  particleArray = useRef([]);
  flowFieldArray = useRef([]);
  const [state, setState] = useState(0);

  //calculating and adding the particle array
  useMemo(() => {
    for (let i = 0; i < 30; i++) {
      let x = Math.random() * cw;
      let y = Math.random() * ch;
      particleArray.current.push({
        x,
        y,
        speedX: 0,
        speedY: 0,
        size: 5,
        history: [{ x, y }],
        maxLineSegments: 30,
      });
    }
  }, []);
  //calculating the flowfield with math.random
  useMemo(() => {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < coloumns; x++) {
        let angle = Math.cos(x) + Math.sin(y);
        flowFieldArray.current.push(angle);
      }
    }
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
      handleParticles(p5, particle);
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
function handleParticles(p5, particle) {
  // handling each particle
  const x = Math.floor(particle.x / cellSize);
  const y = Math.floor(particle.y / cellSize);
  const index = x + y * coloumns;
  const angle = flowFieldArray.current[index];
  particle.speedX = Math.cos(angle);
  particle.speedY = Math.sin(angle);
  particle.x += particle.speedX;
  particle.y += particle.speedY;
  particle.history.push({ x: particle.x, y: particle.y });
  particle.history.length > particle.maxLineSegments
    ? particle.history.shift()
    : null;
}
function mousePressed(p5) {
  // console.log(particleArray);
  console.log(p5.frameRate());
}
