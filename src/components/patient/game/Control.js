import React from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'

const Control = ({ onClear }) => {
    return (
        <div className="control">
            <div className="control__buttons">
                {
                    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button>START</Button>
                    <Button onClick={onClear}>CLEAR</Button>
                  </ButtonGroup>                  
                }
                {/* <button onClick={onClear}>CLEAR</button> */}
            </div>
        </div>
    )
}

export default Control;
