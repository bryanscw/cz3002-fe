import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

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
          <Link to={`/game/${result.id}`}>Do Test</Link>
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
