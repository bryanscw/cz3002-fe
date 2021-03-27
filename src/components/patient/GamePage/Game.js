import React from "react";
import Result from './Result';
import Control from './Control' 
import ListDot from './ListDot'

const Game = (props) => {
  const {time,accuracy,nodeNum} = props;
  return (
    <div className="main">
        <div className="panel" style={{
            margin:"auto",
            textAlign:"center",
        }}>
            <Control/>
            <Result time={time} accuracy={accuracy}/>
        </div>
        <div className="field" style={
            {
                height: "500px",
                width: "1200px",
                border: "2px solid black",
                position: "relative",
                overflowY: "hidden",
                textAlign:"center",
                margin:"auto",
            }
        }
        >
            <ListDot nodeNum={nodeNum}/>
        </div>   
      </div>
  );
}
export default Game;



