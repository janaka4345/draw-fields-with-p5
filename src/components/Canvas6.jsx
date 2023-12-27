import { useEffect, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
let angleArray = [];
export default function Canvas6(props) {
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
    p5.createCanvas(600, 600);

    p5.pixelDensity(1);
  };
}
function draw(p5) {
  let zoff = 0;
  let x = 0;
  let scale = 10;

  /*check this out
// Using Array.from and flatMap
*const result = Array.from({ length: 3 }, (_, x) =>
    Array.from({ length: 2 }, (_, y) => [x, y])
).flat();
*console.log(result);

*/

  let coloumns = Math.floor(600 / scale);
  let rows = Math.floor(600 / scale);

  return () => {
    p5.background(255, 0, 0);

    p5.noFill();
    p5.stroke(0);

    let yoff = 0;
    [...Array(rows)].map((_, i) => {
      let xoff = 0;
      [...Array(coloumns)].map((_, j) => {
        let angle = p5.noise(xoff, yoff, zoff) * p5.TWO_PI;

        let vector = p5.createVector(Math.cos(angle), Math.sin(angle));
        angleArray.push(vector);
        p5.push();
        p5.translate(j * scale, i * scale);
        p5.rotate(vector.heading());
        p5.line(0, 0, scale, 0);
        p5.pop();
        xoff += 0.1;
      });
      yoff += 0.1;
    });

    // p5.removeElements();
    // let yoff = 0;
    // for (let y = 0; y < rows; y++) {
    //   let xoff = 0;
    //   for (let x = 0; x < coloumns; x++) {
    //     let angle = p5.noise(xoff, yoff, zoff) * p5.TWO_PI;
    //     // let angle = parseFloat((p5.noise(xoff, yoff, zoff) * p5.TWO_PI).toFixed(3));
    //     let vector = p5.createVector(Math.cos(angle), Math.sin(angle));
    //     p5.push();
    //     p5.translate(x * scale, y * scale);
    //     p5.rotate(vector.heading());
    //     p5.line(0, 0, scale, 0);
    //     p5.pop();

    //     xoff += 0.1;
    //   }
    //   yoff += 0.1;
    // }
    p5.push();
    p5.fill(255, 120, 0);
    p5.circle(x, x, 10);
    p5.pop();
    x > 600 ? (x = 0) : x++;
    zoff += 0.1;
    // p5.noLoop();
  };
}
function mousePressed(p5) {
  console.log(p5.frameRate());
}
