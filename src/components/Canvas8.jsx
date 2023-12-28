import { useEffect, useMemo, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

let vectorArray = [];

export default function Canvas8(props) {
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
  let zoff = 0;
  for (let z = 0; z < 160; z++) {
    let yoff = 0;
    for (let y = 0; y < 20; y++) {
      let xoff = 0;
      for (let x = 0; x < 20; x++) {
        let angle = (p5.noise(xoff, yoff, zoff) * p5.TWO_PI).toFixed(2);
        let vector = p5.createVector(
          Math.cos(angle).toFixed(1),
          Math.sin(angle).toFixed(1)
        );
        vectorArray.push(vector);
        xoff += 0.1;
      }
      yoff += 0.1;
    }
    zoff += 0.1;
  }
  // p5.preload = preload(p5);
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
  let x = 0;
  let scale = 10;

  let coloumns = Math.floor(200 / scale);
  let rows = Math.floor(200 / scale);

  return () => {
    p5.background(255, 0, 0);

    p5.noFill();
    p5.stroke(0);

    for (let y = 0; y < rows; y++) {
      // let xoff = 0;
      for (let x = 0; x < coloumns; x++) {
        //   // let angle = p5.noise(xoff, yoff, zoff) * p5.TWO_PI;
        //   let angle = parseFloat(
        //     (p5.noise(xoff, yoff, zoff) * p5.TWO_PI).toFixed(1)
        //   );
        //   let vector = p5.createVector(
        //     parseFloat(Math.cos(angle).toFixed(1)),
        //     parseFloat(Math.sin(angle).toFixed(1))
        //   );
        //   angleArray.push(vector);
        p5.push();
        p5.translate(x * scale, y * scale);
        p5.rotate(p5.PI * 0.25);
        p5.line(0, 0, scale, 0);
        p5.pop();

        //     xoff += 0.1;
      }
      //   yoff += 0.1;
    }
    p5.push();
    p5.fill(255, 120, 0);
    p5.circle(x, x, 10);
    p5.pop();
    x > 200 ? (x = 0) : x++;
    // zoff += 0.1;
    // p5.noLoop();
  };
}
function mousePressed(p5) {
  // console.log(vectorArray);
  console.log(p5.frameRate());
}
