import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';

/**This component is used to display an item with a title and description */
export default function PendingTestCard(props) {
    const {
        classes,
        result,
    } = props;

    return (
        <div className={`card${classes ? ` ${classes}` : ''}`}
             style={{
                 width: '100%',
                 padding: '40px',
             }}>
            <MaterialTable
                title='Pending tests'
                font=""
                columns={[
                    {
                        title: 'ID',
                        field: 'id'
                    },
                    {
                        title: "Accuracy",
                        field: "accuracy"
                    },
                    {
                        title: "Time",
                        field: "time"
                    },
                    {
                        title: 'Number of Nodes',
                        field: 'nodeNum',
                    },
                    {
                        title: 'Result',
                        render: (result) => (
                            <Button
                                color="primary"
                                href={`/game/${result.id}`}
                                variant='outlined'
                            >Do Test
                            </Button>
                        ),
                    },
                ]}
                data={[result]}
                options={{
                    search: false,
                    paging: false,
                    cellStyle: {
                        fontFamily: 'Helvetica',
                        fontSize: 15,
                    },
                    headerStyle: {
                        backgroundColor: '#d32f2f',
                        color: '#FFF',
                        fontSize: 17,
                    },
                }}
            />
        </div>
    );
}

PendingTestCard.propTypes = {
    /** A string storing the html to be included in the component */
    classes: PropTypes.string,
    /** An object containing the item's title and description */
    result: PropTypes.object.isRequired,
};
