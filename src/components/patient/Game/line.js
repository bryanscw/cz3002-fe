import React, {useEffect, useRef} from 'react';
import './line.css';

const App = (props) => {
  const {valX, valY, count} = props;
  const canvas = useRef();
  let ctx = null;

  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    // get context of the canvas
    ctx = canvasEle.getContext("2d");
  });

  let nodenumber = count - 1; //code for showing/hidinglines

  useEffect(() => {
    for (let i = 1; i < nodenumber; i++) {
      drawLine({x: valX[i - 1], y: valY[i - 1], x1: valX[i], y1: valY[i]});
    }
  });

  // draw a line
  const drawLine = (info, style = {}) => {
    const {x, y, x1, y1} = info;
    const {color = 'black', width = 1} = style;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  }

  return (
      <div className="App">
        <canvas ref={canvas}></canvas>
      </div>
  );
}

export default App;