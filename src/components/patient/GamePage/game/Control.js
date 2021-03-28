import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import './game.css';

const Control = (props) => {

  const {
    start,
    clear,
    submit,
  } = props;

  return (

    <div className="result">
      <form onSubmit={submit}>
        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
          <Button onClick={start}> START </Button>
          <Button onClick={clear}> CLEAR </Button>
          <Button type="submit"> SUBMIT </Button>
        </ButtonGroup>
      </form>
    </div>

  );
};

export default Control;
