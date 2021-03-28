import React from 'react';
import Fab from '@material-ui/core/Fab';


const Dot = (props) => {
    const {color, x, y, size, func, randomnumber } = props;    
    const dotStyle = {
        backgroundColor: color,
        height: `${size}px`,
        width: `${size}px`,
        left: `${x}px`,
        top: `${y}px`,
        position:"absolute",
    };
    return (
        <Fab className="dot" 
        color = {color} 
        style = {dotStyle}
        onClick = {() => func(randomnumber)}
        >
            {randomnumber}
        </Fab>
    );
};

export default Dot;
