import { useEffect, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

export default function Canvas2(props) {
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
    p5.createCanvas(400, 400);
  };
}
function draw(p5) {
  //   let yoff = 1000;
  let start = 0;
  return () => {
    let xoff = start;
    p5.background(250, 120, 0);

    p5.stroke(0, 0, 0);
    p5.noFill();
    p5.beginShape();
    for (let x = 0; x < 400; x++) {
      p5.vertex(x, Math.floor(p5.noise(xoff) * 400));
      xoff += 0.1;
    }
    p5.endShape();
    start += 0.1;
  };
}
function mousePressed(p5) {}
