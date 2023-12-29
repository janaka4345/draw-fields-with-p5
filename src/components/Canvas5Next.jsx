import { useEffect, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
let angleArray = [];
let vectorArray = [];
let particles = [];
let cw = 200;
let numOfParticles = 100;
export default function Canvas5Next(props) {
  return (
    <div>
      <div

      // style={{ width: "100%", height: "100%" }}
      >
        <ReactP5Wrapper sketch={sketch} />
        <h1></h1>
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
    p5.createCanvas(cw, cw);

    p5.pixelDensity(1);
    p5.background(255, 255, 255);
  };
}
function draw(p5) {
  let zoff = 0;
  let x = 0;
  let scale = 10;
  let yoff = 0;
  let coloumns = Math.floor(cw / scale);
  let rows = Math.floor(cw / scale);
  for (let y = 0; y <= rows; y++) {
    let xoff = 0;
    for (let x = 0; x <= coloumns; x++) {
      // let angle = p5.noise(xoff, yoff, zoff) * p5.TWO_PI;
      let angle = p5.noise(xoff, yoff) * p5.TWO_PI;
      // angleArray.push(angle);
      // let vector = p5.createVector(Math.cos(angle), Math.sin(angle)); //p5.Vector.fromAngle is not working with wrapper
      let vector = p5.constructor.Vector.fromAngle(angle); //p5.Vector.fromAngle ===> p5.constructor.Vector.fromAngle
      vectorArray.push(vector);

      // angleArray.push(angle);

      // p5.push();
      // // p5.fill(val);
      // // p5.square(x * scale, y * scale, scale);
      // p5.translate(x * scale, y * scale);
      // p5.rotate(angle);
      // p5.line(0, 0, scale, 0);
      // p5.pop();

      // let index = (x + y * p5.canvas.width) * 4;

      // let val = p5.noise(xoff, yoff) * 255;
      // p5.pixels[index] = val;
      // p5.pixels[index + 1] = val;
      // p5.pixels[index + 2] = val;
      // p5.pixels[index + 3] = 255;
      xoff += 0.1;
    }
    yoff += 0.1;
  }
  for (let i = 0; i < numOfParticles; i++) {
    particles.push({
      x: p5.random(5, cw),
      y: p5.random(5, cw),
    });
  }

  return () => {
    // p5.background(255, 0, 0);
    p5.noFill();
    p5.stroke(0);

    // p5.push();
    // p5.fill(255, 120, 0);
    // p5.circle(x, x, 10);
    // p5.pop();
    // x > cw ? (x = 0) : x++;
    // zoff += 0.01;

    particles.forEach((particle) => {
      if (
        particle.x < 0 ||
        particle.y < 0 ||
        particle.x > cw ||
        particle.y > cw
      ) {
        particle.x = p5.random(5, cw);
        particle.y = p5.random(5, cw);
      }
      const x = Math.round(particle.x / scale);
      const y = Math.round(particle.y / scale);
      const index = x + y * coloumns;
      particle.x += vectorArray[index].x;
      particle.y += vectorArray[index].y;
      p5.push();
      // p5.fill(255);
      p5.strokeWeight(4);
      p5.stroke(50, 5);
      p5.translate(particle.x, particle.y);
      p5.circle(0, 0, 2);
      p5.pop();
    });

    // p5.noLoop();
  };
}
function mousePressed(p5) {
  // console.log(angleArray);
  // console.log(vectorArray);
  console.log(p5.frameRate());
}
