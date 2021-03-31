import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';

/**This component is used to display an item with a title and description */
export default function ResultCard(props) {
  const {
    classes,
    results,
  } = props;

  return (
      <div className={`card${classes ? ` ${classes}` : ''}`}
           style={{
             width: '100%',
             padding: '40px',
           }}>
        <MaterialTable
            title='Completed Tests'
            font=""
            columns={[
              {
                title: 'ID',
                field: 'id',
              },
              {
                title: 'Accuracy (%)',
                field: 'accuracy',
              },
              {
                title: 'Time Taken (s)',
                field: 'time',
              },
              {
                title: 'Number of Nodes',
                field: 'nodeNum',
              },
              {
                title: 'Diagnosis',
                render: (result) => (
                    <Button
                        color="primary"
                        href={`/result/${result.id}`}
                        variant='outlined'
                    >More details...
                    </Button>
                ),
              },
            ]}
            data={results}
            options={{
              paginationType: 'stepped',
              showFirstLastPageButtons: false,
              paging: false,
              search: false,
              cellStyle: {
                fontFamily: 'Helvetica',
                fontSize: 15,
              },
              headerStyle: {
                backgroundColor: '#388e3c',
                color: '#FFF',
                fontSize: 17,
              },
            }}
        />
      </div>
  );
}

ResultCard.propTypes = {
  /** A string storing the html to be included in the component */
  classes: PropTypes.string,
  /** An object containing the item's title and description */
  results: PropTypes.array.isRequired,
  /** A badge for the component */
  badge: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]),
};
