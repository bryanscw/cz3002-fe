import React, { useRef, useEffect } from 'react';

const Line= (props) => {
  const {valX , valY, count} = props ;
  const canvas = useRef();
  let ctx = null;
  useEffect(() => {
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;
    ctx = canvasEle.getContext("2d");
  });

  let nodenumber = count-1;

  useEffect(() => {
    for (let i=1;i<nodenumber;i++){
        drawLine({ x: valX[i-1], y: valY[i-1], x1: valX[i], y1: valY[i] });
    }
  });

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

  const canvasStyle={
    width: "1200px",
    height: "500px",
    backgroundColor: "#f5f5f5",
    border: "0px",
    borderRadius: "0px"  
  }

  return (
    <div className="App">
      <canvas ref={canvas} style={canvasStyle}></canvas>
    </div>
  );
}

export default Line; 