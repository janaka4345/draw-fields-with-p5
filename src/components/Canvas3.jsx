import { useEffect, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

export default function Canvas3(props) {
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
  return () => {
    let noiseLevel = 255;
    let noiseScale = 0.009;
    for (let y = 0; y < 600; y++) {
      for (let x = 0; x < 600; x++) {
        // Scale input coordinates.
        let nx = noiseScale * x;
        let ny = noiseScale * y;
        // let nt = noiseScale * p5.frameCount;
        // Compute noise value.
        let c = noiseLevel * p5.noise(nx, ny);
        // Render.
        p5.stroke(c);
        p5.point(x, y);
      }
    }
    p5.noLoop();
  };
}
function mousePressed(p5) {}
