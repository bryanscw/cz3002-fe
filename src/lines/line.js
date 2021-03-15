import React, { useRef, useEffect } from 'react';
import './line.css';

 
const App= (props) => {
  const {valX , valY} = props ;
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
 
  useEffect(() => {
    drawLine({ x: valX[0], y: valY[0], x1: valX[1], y1: valY[1] });
    drawLine({  x: valX[1], y: valY[1], x1: valX[2], y1: valY[2] }, { color: 'black' });
 
    drawLine({ x: valX[2], y: valY[2], x1: valX[3], y1: valY[3] });
    drawLine({ x: valX[3], y: valY[3], x1: valX[4], y1: valY[4] });
    drawLine({ x: valX[4], y: valY[4], x1: valX[5], y1: valY[5] });
    drawLine({ x: valX[5], y: valY[5], x1: valX[6], y1: valY[6] });
    drawLine({ x: valX[6], y: valY[6], x1: valX[7], y1: valY[7] });
    drawLine({ x: valX[7], y: valY[7], x1: valX[8], y1: valY[8] });
    drawLine({ x: valX[8], y: valY[8], x1: valX[9], y1: valY[9] });
    drawLine({ x: valX[9], y: valY[9], x1: valX[10], y1: valY[10] });
    drawLine({ x: valX[10], y: valY[10], x1: valX[11], y1: valY[11] });
    drawLine({ x: valX[11], y: valY[11], x1: valX[12], y1: valY[12] });
    drawLine({ x: valX[12], y: valY[12], x1: valX[13], y1: valY[13] });
    drawLine({ x: valX[13], y: valY[13], x1: valX[14], y1: valY[14] });
    drawLine({ x: valX[14], y: valY[14], x1: valX[15], y1: valY[15] });
    drawLine({ x: valX[15], y: valY[15], x1: valX[16], y1: valY[16] });
    drawLine({ x: valX[16], y: valY[16], x1: valX[17], y1: valY[17] });
    drawLine({ x: valX[17], y: valY[17], x1: valX[18], y1: valY[18] });
    drawLine({ x: valX[18], y: valY[18], x1: valX[19], y1: valY[19] });
    drawLine({ x: valX[19], y: valY[19], x1: valX[20], y1: valY[20] });
    drawLine({ x: valX[20], y: valY[20], x1: valX[21], y1: valY[21] });
    drawLine({ x: valX[21], y: valY[21], x1: valX[22], y1: valY[22] });
    drawLine({ x: valX[22], y: valY[22], x1: valX[23], y1: valY[23] });
    drawLine({ x: valX[23], y: valY[23], x1: valX[24], y1: valY[24] });
 
 
 
  });
 
  // draw a line
  const drawLine = (info, style = {}) => {
    const { x, y, x1, y1 } = info;
    const { color = 'black', width = 1 } = style;
 
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