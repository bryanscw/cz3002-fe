import React, { useRef, useEffect } from 'react';
import './game.css';

const Line = (props) => {
  const {
    valX, 
    valY, 
    count,
  } = props;
  const canvas = useRef();
  let ctx = useRef(null);
  useEffect(() => {
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;
    ctx.current = canvasEle.getContext("2d");
  });

  let nodenumber = count - 1;

  useEffect(() => {
    for (let i = 1; i < nodenumber; i++) {
      drawLine({
        x: valX[i - 1],
        y: valY[i - 1],
        x1: valX[i],
        y1: valY[i],
      });
    }
  });

  const drawLine = (info, style = {}) => {
    const { 
      x,
      y,
      x1,
      y1,
    } = info;
    const { 
      color = 'black', 
      width = 1, 
    } = style;

    ctx.current.beginPath();
    ctx.current.moveTo(x, y);
    ctx.current.lineTo(x1, y1);
    ctx.current.strokeStyle = color;
    ctx.current.lineWidth = width;
    ctx.current.stroke();
  }

  return (
    <div className="App">
      <canvas className="canvas" ref={canvas}></canvas>
    </div>
  );
};

export default Line; 