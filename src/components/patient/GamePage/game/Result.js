import React from 'react';
import { Button, LinearProgress } from '@material-ui/core';
import './game.css';
import PropTypes from 'prop-types';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const Result = (props) => {
  const {
    time,
    accuracy,
    progress,
    completed,
    nodeNum,
  } = props;

  return (
    <div className="result">
      <ButtonGroup style={{
        margin: '0 0 20px 0',
        color: 'black',
      }} size="small" aria-label="outlined button group">
        <Button disabled>{`Time: ${time}s`}</Button>
        <Button disabled>{`Accuracy: ${accuracy}%`}</Button>
        <Button disabled>{`Completed: ${completed} / ${nodeNum}`}</Button>
      </ButtonGroup>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
};

Result.propType = {
  time: PropTypes.func.isRequired,
};

export default Result;
