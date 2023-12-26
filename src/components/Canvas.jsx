import { useEffect, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

export default function Canvas(props) {
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
  let xoff = 0;
  let yoff = 0;
  return () => {
    // console.log(p5.deltaTime);
    // p5.frameRate(60);
    const x = p5.map(p5.noise(xoff), 0, 1, 0, 400);
    const y = p5.map(p5.noise(yoff), 0, 1, 0, 400);
    // console.log(p5.noise(p5.frameCount));
    p5.background(250, 120, 0);
    p5.circle(x, y, 20);
    xoff += 0.001;
    yoff += 0.003;
  };
}
function mousePressed(p5) {}
