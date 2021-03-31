import React from 'react';
import { Button, LinearProgress } from '@material-ui/core';
import './game.css';
import PropTypes from 'prop-types';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';

const Result = (props) => {
  const {
    time,
    accuracy,
    progress,
    completed,
    nodeNum,
  } = props;

  const theme = createMuiTheme({
    palette: {
      action: {
        disabledBackground: 'black',
        disabled: 'black'
      }
    }
  });

  return (
    <div className="result">
      <ThemeProvider theme={theme}>
        <ButtonGroup style={{
          margin: '0 0 20px 0',
          }} size="small" aria-label="outlined button group">
            <Button disabled>{`Time: ${time}s`}</Button>
            <Button disabled>{`Accuracy: ${accuracy}%`}</Button>
            <Button disabled>{`Completed: ${completed} / ${nodeNum}`}</Button>
        </ButtonGroup>
        <LinearProgress variant="determinate" value={progress} />
      </ThemeProvider>
    </div>
  );
};

Result.propType = {
  time: PropTypes.func.isRequired,
};

export default Result;
