import React from 'react'

const Control = ({ onClear }) => {
    return (
        <div className="control">
            <div className="control__buttons">
                {
                    <button>
                        START
                    </button>                   
                }
                <button onClick={onClear}>CLEAR</button>
            </div>
        </div>
    )
}

export default Control;
