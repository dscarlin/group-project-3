import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import SearchForm from "../../components/SearchForm";
import applicants from "../../dummyApps.json";



const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        position: "relative",
        marginTop: "20vh",
    },
    
    
}));

export default function Dashboard(props) {
    const classes = useStyles();
    return(
        <Container>
            <Grid className={`${classes.root}`}>
                <SearchForm redirect={true} appState={props.appState}/>
            </Grid>
           
        </Container>
    );
};