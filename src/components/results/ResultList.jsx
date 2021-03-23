import {
    Switch,
    Route,
    Link,
    useRouteMatch,
} from "react-router-dom";
import {
    List,
    ListItem,
    Box, createMuiTheme
} from '@material-ui/core';
import { useGatsbyListItemStyles } from '@mui-treasury/styles/listItem/gatsby';
import {MuiThemeProvider} from "@material-ui/core/styles";
import { orange } from '@material-ui/core/colors';

import ResultDetails from './ResultDetails.jsx'

export default function ResultList(props){
    // receives resultHistory - list of past test performances,
    // which includes as attributes: time, test mode, completion time, error rate
    let match = useRouteMatch();
    const classes = useGatsbyListItemStyles()
    const theme = createMuiTheme({
        palette: {
            secondary: {
                main: orange[500],
            },
        },
    });
    return (
        <MuiThemeProvider theme={theme}>
        <Box display='flex'>
            <List>
                {props.resultHistory.map(
                    (resultDetails) =>
                    <Link key={resultDetails.id.toString()} to={`${match.url}/resultDetails/${resultDetails.id}`}>
                        <ListItem classes={classes}>Result id: {resultDetails.id} - patient name: {resultDetails.user.name}</ListItem>
                    </Link>
                )}
            </List>
            <Switch>
                <Route path={`${match.path}/resultDetails/:resultDetailsId`} children={<ResultDetails resultHistory={props.resultHistory}/>}/>
            </Switch>
        </Box>
        </MuiThemeProvider>
    );
}