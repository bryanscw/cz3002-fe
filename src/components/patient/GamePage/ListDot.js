import React from 'react';
import Line from './Line';
import { createDot } from './util';

const ListDot = (props) => {
    const {numNode} = props;

    function getRandomNumber(min,max){
        let step1 = max-min+1;
        let step2 = Math.random()*step1;
        let result = Math.floor(step2) + min;
        return result;
    }
    
    function createArrayofNumbers(start,end){
        let myarray= [];
        for(let i=start ;i<=end ;i++){
             myarray.push(i);
        }
        return myarray; 
    }

let numarray= createArrayofNumbers(1,numNode);
    
const dots = []
const valX = []
const valY = []

const dotNum = props.nodeNum;

for (var i = 0; i < dotNum; i++) {
  let randomIndex= getRandomNumber(0,numarray.length-1);
  let randomnumber = numarray[randomIndex];
  numarray.splice((randomIndex), 1);
  console.log(randomnumber);
  const dot=createDot(i+1);
  
  if(valX.length === 0){
    valX.push(dot.props.x);
    valY.push(dot.props.y);
    dots.push(dot);
    continue;
  }
  
  var overlap = false;
  for(var j = 0; j<valX.length; j++){
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
    if(Math.abs(dot.props.y - valY[z])<90){
      break;
    }
  }
  
  if(overlap === true){
    i--;
    continue;
  }
  
  valX.push(dot.props.x);
  valY.push(dot.props.y);
  dots.push(dot);
}

return (
    dots.map((dot)=><ul>{dot}</ul>
    ))
};

export default ListDot;