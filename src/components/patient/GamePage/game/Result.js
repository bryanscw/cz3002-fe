import React from 'react';

const Result = (props) => {
    const {time,accuracy} = props;

    return (
        <div className="result">
            <p>{`Time: ${time}s`}</p>
            <p>{`Accuracy: ${accuracy}%`}</p>
        </div>
    );
};

export default Result;
