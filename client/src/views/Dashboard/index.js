import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, IconButton, Slide} from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import SearchForm from "../../components/SearchForm";
import Results from "../../components/DashLayout/Results";
import DetailContainer from "../../components/DashLayout/DetailContainer";
import SearchSavedToggle from "../../components/SearchSavedToggle";
import Info from "../../components/Info";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        position: "relative",
        // marginTop: theme.spacing(1),
        padding: 10,
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
    containerContent: {
        overflow: "auto",
        height: "85vh"
    },
    searchToggle: {
        width: "fit-content",
        backgroundColor: "white",
        justifyContent: "center",
        alignContent: "center",
        margin: "2em auto"
    },
    info: {
        position: "absolue",
        marginTop: theme.spacing(8)
    },
    messageBtn: {
        margin: "auto",
        boxShadow: "0px 1px 10px lightgray"
    }

}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Dashboard(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return(
        <Container>
            <Grid className={`${classes.root}`}>
                <IconButton aria-label="info" className={classes.info} onClick={handleClickOpen}>
                    <InfoOutlined color="primary" fontSize="large" />            
                </IconButton>
                <Info 
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                />
                <SearchForm redirect={true} 
                    setAppState={props.setAppState}
                    appState={props.appState}
                />
                <SearchSavedToggle
                    className={classes.searchToggle}
                    useStyles={useStyles}
                    appState={props.appState}
                    setAppState={props.setAppState}
                    align="center"
                />
            </Grid>
      
            <Grid container spacing={0}>
                <Results 
                    useStyles={useStyles}
                    appState={props.appState}
                    setAppState={props.setAppState}
                />
                <DetailContainer 
                    useStyles={useStyles}
                    appState={props.appState}
                    messageApplicant={props.messageApplicant}
                />
            </Grid>
           
        </Container>
    );
};