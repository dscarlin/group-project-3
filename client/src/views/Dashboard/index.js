import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import SearchForm from "../../components/SearchForm";
import applicants from "../../dummyApps.json";
import {withRouter} from "react-router-dom";



const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        position: "relative",
        marginTop: "20vh",
    },
    
    
}));

export default withRouter(function Dashboard(props) {
    const classes = useStyles();
    const goToListView = () => props.history.push("./list-view")
    return(
        <Container>
            <Grid className={`${classes.root}`}>
                <SearchForm goToListView={goToListView} appState={props.appState}/>
            </Grid>
           
        </Container>
    );
});