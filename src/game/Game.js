import React from "react";
import { createDot } from './util';
import Control from './Control';
import Score from './Score';
import '../App.css';
//import Dot from './Dot';
import Line from '../lines/line';
import Box from '@material-ui/core/Box'

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
//-----------elements inside dots-------------------------

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
    
    let numarray= createArrayofNumbers(1,25);
    
   
    

    










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
  let randomIndex= getRandomNumber(0,numarray.length-1);
   let randomnumber = numarray[randomIndex];
    
  
    numarray.splice((Game.randomIndex), 1);
  console.log(randomnumber);
  const dot=createDot(i+1);
  
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
            <Score/>
        
          </div>
          <Box className="field">
           <ListDot dots={dots}></ListDot> 
           <Line valX={valX} valY={valY} ></Line>
          </Box>

        
      </div>
  );
}
export default Game;


