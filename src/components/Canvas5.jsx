import { useEffect, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

export default function Canvas5(props) {
  return (
    <div>
      <div

      // style={{ width: "100%", height: "100%" }}
      >
        <ReactP5Wrapper sketch={sketch} />
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
    p5.createCanvas(200, 200);
    // console.log(p5.pixelDensity());
    p5.pixelDensity(1);
  };
}
function draw(p5) {
  let scale = 20;
  console.log(p5);
  let coloumns = Math.floor(200 / scale);
  let rows = Math.floor(200 * scale);
  return () => {
    p5.background(255, 0, 0);
    // p5.loadPixels();
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < coloumns; x++) {
        p5.push();
        p5.fill(Math.random() * 255);
        p5.stroke(0);
        p5.square(x * scale, y * scale, scale);
        p5.pop();
        // let index = (x + y * p5.canvas.width) * 4;
        // console.log(p5.pixels[index]);
        // let val = p5.noise(xoff, yoff) * 255;
        // p5.pixels[index] = val;
        // p5.pixels[index + 1] = val;
        // p5.pixels[index + 2] = val;
        // p5.pixels[index + 3] = 255;
        xoff += 0.01;
      }
      yoff += 0.01;
    }
    // p5.updatePixels();
    p5.noLoop();
  };
}
function mousePressed(p5) {}
