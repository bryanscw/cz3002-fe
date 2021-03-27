import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';


const Dot = (props) => {
    const {color, x, y, size, index, onClick, randomnumber } = props;    
    const dotStyle = {
        backgroundColor: color,
        height: `${size}px`,
        width: `${size}px`,
        left: `${x}px`,
        top: `${y}px`,
        position:"absolute",
    };
    return (
        <Fab className="dot" color={color} style={dotStyle}>{randomnumber}</Fab>
    );
};

export default Dot;
