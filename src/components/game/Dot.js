import React from 'react';

const Dot = (props) => {
    const {color, x, y, size, index, func,i} = props;
    const dotStyle = {
        backgroundColor: color,
        height: `${size}px`,
        width: `${size}px`,
        left: `${x}px`,
        top: `${y}px`,
    };

    return (
        <div 
            className="dot"
            style={dotStyle}
            onClick={() => func(i)}
        >{i}</div>
    );
};

export default Dot;
