import React from 'react';
import CircularProgressWithLabel from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import './game.css';

const Result = (props) => {
  const {
    time,
    accuracy,
    progress,
    completed,
  } = props;

  return (
    <div className="result">
      <Typography>{`Time: ${time}s`}</Typography>
      <Typography>{`Accuracy: ${accuracy}%`}</Typography>
      <Typography>{`Completed: ${completed}`}</Typography>
      <CircularProgressWithLabel variant="determinate" value={progress} />
    </div>
  );
};

export default Result;
