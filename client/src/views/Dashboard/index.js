import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container} from "@material-ui/core";
import SearchForm from "../../components/SearchForm";
import Results from "../../components/DashLayout/Results";
import applicants from "../../dummyApps.json";
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
        marginTop: 10,
        marginBottom: 10,
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
        height: 800
    },
    coverLetter: {
        height: 300,
        overflow: "auto"
    },
    resultList: {
        overflow: "auto"
    }

}));

export default function Dashboard(props) {
    const classes = useStyles();
    return(
        <Container>
            <Grid className={`${classes.root}`}>
                <SearchForm redirect={true} 
                    setAppState={props.setAppState}
                    appState={props.appState}
                />
            </Grid>
            <br />
            <Grid container spacing={1}>
                <Results useStyles={useStyles} />
                <DetailContainer useStyles={useStyles} />
            </Grid>
           
        </Container>
    );
};