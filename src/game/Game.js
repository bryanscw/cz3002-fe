import React from "react";
import { createDot } from './util';
import Control from './Control';
import Score from './Score';

function ListDot(props){
  const dots=props.dots;
  const list = dots.map((dot)=>
  <ul>
    {dot}
  </ul>
  )

  return (
    <ul>{list}</ul>
  );
}

// ------------ Generation of dots with overlap detection ------------

//an array to store all dot components
const dots = []

//store the x positions of the dots
const valX = []
//store the y positions of the dots
const valY = []

//25 dots in total
const dotNum = 25;

for (var i = 0; i < dotNum; i++) {
  const dot=createDot();

  //if this is the first dot created
  if(valX.length === 0){
    valX.push(dot.props.x);
    valY.push(dot.props.y);
    dots.push(dot);
    //skip the steps to check the x and y range
    continue;
  }

  var overlap = false;
  for(var j = 0; j<valX.length; j++){
    //to mininize overlap in x-direction
    if(Math.abs(dot.props.x - valX[j])<33){
      overlap = true;
      break;
    }
  }

  if(overlap === true){
    i--;
    continue;
  }

  for(var z = 0; z<valY.length; z++){
    //two dots overlap in y-direction
    if(Math.abs(dot.props.y - valY[z])<90){
      break;
    }
  }

  if(overlap === true){
    i--;
    continue;
  }

  //if no overlap
  valX.push(dot.props.x);
  valY.push(dot.props.y);
  dots.push(dot);
}

function Game() {
    return (
      <div className="main">
          <div className="panel">
            <Control/>
            <Score />
          </div>
          <div className="field"><ListDot dots={dots}></ListDot></div>
      </div>
  );
}
export default Game;



