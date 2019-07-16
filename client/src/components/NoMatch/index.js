import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, IconButton, Slide} from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import Info from "../../components/Info";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        position: "relative",
        // marginTop: theme.spacing(1),
        // padding: 10,
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
    paper: {
        // padding: theme.spacing(2),
        padding: 30,
        margin: 10
    },
    widthControl: {
        width: "45vw"
    },
    container: {
        height: "100vh",
        backgroundColor: "#fafafa"
    },
    containerContent: {
        overflow: "auto",
        height: "85vh"
    },
    info: {
        position: "absolue",
        marginTop: theme.spacing(8)
    }

}));

export default function NoMatch() {
    const classes = useStyles();
    
    return(
        <Container>
            <h1>Error: 404. Your page is in another kitchen!</h1>
        </Container>
    );
}