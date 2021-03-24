import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button'

/**This component is used to display an item with a title and description */
export default function PendingTestCard(props) {
  const {
    classes,
    result,
  } = props;

  return (
      <div className={`card${classes ? ` ${classes}` : ""}`}>
        <div className="card-body">
          <h3 className="card-title">
            Test id: {result.id}
          </h3>
          <p className="card-text">Number of nodes: {result.nodeNum}</p>
          <br/>
          <Button color="primary" href={`/game/${result.id}`}>Do Test</Button>
        </div>
      </div>
  )
}

PendingTestCard.propTypes = {
  /** A string storing the html to be included in the component */
  classes: PropTypes.string,
  /** An object containing the item's title and description */
  result: PropTypes.object.isRequired,
}
