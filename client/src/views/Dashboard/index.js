import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container} from "@material-ui/core";
import SearchForm from "../../components/SearchForm";
import Results from "../../components/DashLayout/Results";
import DetailContainer from "../../components/DashLayout/DetailContainer";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        position: "relative",
        marginTop: theme.spacing(8),
        padding: 10
    },
    avatar: {
        padding: 6,
        display: "inline-block",
        color: "white",
        backgroundColor: "#3F51B5",
        textAlign: "center"
    },
    card: {
        margin: "10px auto",
        width: "90%",
        color: "#555",
    },
    cardHeader: {
        color: "white",
        backgroundColor: "#3F51B5",
    },
    control: {
        // border: "solid black 1px",
        paddingTop: "2em"
    },
    detailView: {
        overflow: "scroll"
    },
    fixed: {
        position: "fixed",
        right: "0",
        width: "50%", 
        height: "100vh"     
    },
    paper: {
        // padding: theme.spacing(2),
        padding: 30,
        margin: 10
    },
    widthControl: {
        width: "45vw"
    },
    container: {
        height: "100vh"
    },
    coverLetter: {
        height: "35vh",
        overflow: "auto"
    },
    resultList: {
        overflow: "auto",
        height: "85vh"
    }

}));

export default function Dashboard(props) {
    const classes = useStyles();
    return(
        <Container maxWidth="false">
            <Grid  className={`${classes.root}`}>
                <SearchForm redirect={true} 
                    setAppState={props.setAppState}
                    appState={props.appState}
                />
            </Grid>
            <br />
            <Grid container justify="space-evenly" spacing={0}>
                <Results 
                    useStyles={useStyles}
                    appState={props.appState}
                    setAppState={props.setAppState}
                    messageApplicant={props.messageApplicant}
                />
                <DetailContainer 
                    useStyles={useStyles}
                    appState={props.appState}
                />
            </Grid>
           
        </Container>
    );
};