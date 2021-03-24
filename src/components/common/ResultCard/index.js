import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

/**This component is used to display an item with a title and description */
export default function ResultCard(props) {
  const {
    classes,
    result,
    badge,
    link,
  } = props;

  return (
      <div className={`card${classes ? ` ${classes}` : ""}`}>
        <div className="card-body">
          <h3 className="card-title">
            Test id: {result.id} {badge}
          </h3>
          <p className="card-text">{result.numNodes}</p>
          <p className="card-text">{result.accuracy}</p>
          <p className="card-text">{result.time}</p>
          <Link to={link}>More details...</Link>
        </div>
      </div>
  )
}

ResultCard.propTypes = {
  /** A string storing the html to be included in the component */
  classes: PropTypes.string,
  /** An object containing the item's title and description */
  result: PropTypes.object.isRequired,
  /** A badge for the component */
  badge: PropTypes.oneOfType(
      [PropTypes.string, PropTypes.func, PropTypes.element]),
  /** A string storing a link for the item title */
  link: PropTypes.string.isRequired,
}
