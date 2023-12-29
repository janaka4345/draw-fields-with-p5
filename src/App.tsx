import "./App.css";
import Canvas from "./components/Canvas";//perlin noise movements
import Canvas2 from "./components/Canvas2";//perlin noise graph
import Canvas3 from "./components/Canvas3";// perlin noise
import Canvas4 from "./components/Canvas4";//efficient perlin noise
import Canvas5 from "./components/Canvas5";//flow field with perlin noise
import Canvas5Next from "./components/Canvas5Next";//flow field drawing - cont.from p5 perlin noise with particles
import Canvas6 from "./components/Canvas6";//flow field with perlin noise try 2 with array.map 
import Canvas7 from "./components/Canvas7";//flow field with perlin noise try 3 with parsing float no good
import Canvas8 from "./components/Canvas8";//flow field with perlin noise try 3 with usememo---- unfinished
import Canvas9 from "./components/Canvas9";//flow field laboratory- ligthing trail
import Canvas10 from "./components/Canvas10";//flow field laboratory-math.random flow field
import Canvas11 from "./components/Canvas11";//flow field laboratory-math.random flow field
import CanvasWithShader from "./components/CanvasWithShader";//flow field laboratory-math.random flow field

function App() {
  return (
    <>
      {/* <Canvas1 /> */}
      {/* <Canvas2 /> */}
      {/* <Canvas /> */}
      {/* <Canvas2/> */}
      {/* <Canvas3/> */}
      {/* <Canvas4/> */}
      {/* <Canvas5/> */}
      <Canvas5Next/>
      {/* <Canvas6/> */}
      {/* <Canvas7/> */}
      {/* <Canvas8/> */}
      {/* <Canvas9/> */}
      {/* <Canvas10/> */}
      {/* <CanvasWithShader /> */}
      {/* <Canvas11/> */}


    </>
  );
}

export default App;
