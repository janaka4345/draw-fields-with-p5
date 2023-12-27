import { useEffect, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
export default function Canvas5(props) {
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
    p5.createCanvas(200, 200);
    // console.log(p5.pixelDensity());
    p5.pixelDensity(1);
  };
}
function draw(p5) {
  let zoff = 0;
  let x = 0;
  let scale = 10;
  console.log(p5);
  let coloumns = Math.floor(200 / scale);
  let rows = Math.floor(200 * scale);
  return () => {
    p5.background(255, 0, 0);
    p5.noFill();
    p5.stroke(0);
    // console.log(p5.frameRate());
    // p5.text(p5.frameCount, 50, 50);
    // p5.loadPixels();
    let yoff = 0;
    //p5.Vector.fromAngle is not working with wrapper
    // console.log(vector.heading());
    // p5.noStroke();
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < coloumns; x++) {
        let angle = p5.noise(xoff, yoff, zoff) * p5.TWO_PI;
        let vector = p5.createVector(Math.cos(angle), Math.sin(angle));
        p5.push();

        // // p5.fill(val);
        // // p5.square(x * scale, y * scale, scale);
        p5.translate(x * scale, y * scale);
        p5.rotate(vector.heading());
        p5.line(0, 0, scale, 0);
        p5.pop();

        // let index = (x + y * p5.canvas.width) * 4;
        // console.log(p5.pixels[index]);
        // let val = p5.noise(xoff, yoff) * 255;
        // p5.pixels[index] = val;
        // p5.pixels[index + 1] = val;
        // p5.pixels[index + 2] = val;
        // p5.pixels[index + 3] = 255;
        xoff += 0.1;
      }
      yoff += 0.1;
    }
    p5.push();
    p5.fill(255, 120, 0);
    p5.circle(x, x, 10);
    p5.pop();
    x++;
    zoff += 0.1;
    // p5.updatePixels();
    // p5.noLoop();
  };
}
function mousePressed(p5) {}
