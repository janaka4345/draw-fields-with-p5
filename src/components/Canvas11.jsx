import { useEffect, useMemo, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

let particleArray;
let flowFieldArray;
let cw = 200;
let ch = 200;
let cellSize = 10;
let rows = Math.floor(ch / cellSize);
let coloumns = Math.floor(cw / cellSize);
let numOfParticles = 100;
let curve = 0.5;
let zoom = 0.4;
let zoff = 0;

export default function Canvas11(props) {
  particleArray = useRef([]);
  flowFieldArray = useRef([]);
  const [state, setState] = useState(0);

  //calculating and adding the particle array
  useMemo(() => {
    for (let i = 0; i < numOfParticles; i++) {
      let x = Math.random() * cw;
      let y = Math.random() * ch;
      particleArray.current.push({
        x,
        y,
        speedX: 0,
        speedY: 0,
        size: 5,
        history: [{ x, y }],
        maxLineSegments: 50,
      });
    }
  }, [state]);
  //calculating the flowfield with math.random
  // useMemo(() => {

  // }, []);

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
    flowFieldArray.current = [];
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < coloumns; x++) {
        // let angle = (Math.cos(x * zoom) + Math.sin(y * zoom)) * curve;
        let angle = p5.noise(xoff, yoff, zoff);
        flowFieldArray.current.push(angle);
        xoff++;
      }
      yoff++;
    }
    p5.background(0, 0, 0, 255);
    particleArray.current.forEach((particle, i) => {
      drawParticle(p5, particle);
      handleParticles(p5, particle);
    });
    zoff++;
  };
}
function drawParticle(p5, particle) {
  // p5.push();
  // p5.noStroke();
  // p5.fill(255, 255, 255);
  // p5.circle(particle.x, particle.y, particle.size);
  // p5.pop();

  p5.push();
  p5.stroke(255);
  p5.noFill();
  p5.beginShape();
  particle.history.forEach((line) => {
    if (line.x > cw || line.y > ch) {
    }
    p5.vertex(line.x, line.y);
  });
  p5.endShape();
  p5.pop();
}
function handleParticles(p5, particle) {
  // handling each particle

  //find grid coordinate with flow field array
  const x = Math.floor(particle.x / cellSize);
  const y = Math.floor(particle.y / cellSize);
  const index = x + y * coloumns;
  const angle = flowFieldArray.current[index];

  // set particles speed flowing above the grid section
  particle.speedX = Math.cos(angle);
  particle.speedY = Math.sin(angle);
  particle.x += particle.speedX;
  particle.y += particle.speedY;

  particle.history.push({ x: particle.x, y: particle.y });
  particle.history.length > particle.maxLineSegments
    ? particle.history.shift()
    : null;
  // if (particle.x > cw || particle.y > ch) {
  //   particle.history.pop();
  //   particle.x = Math.random() * cw;
  //   particle.y = Math.random() * ch;
  // }
}
function mousePressed(p5) {
  console.log(flowFieldArray);
  console.log(particleArray);
  // console.log(p5.frameRate());
}
