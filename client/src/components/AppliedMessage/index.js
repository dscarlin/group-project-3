import React, { Fragment } from "react";
import { withRouter } from "react-router-dom"
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({  
      
    root: {
        color: "#fff",
        margin: "40vh auto 0",
        textAlign: "center",
        backgroundColor: theme.palette.primary.main,
        border: "3px black solid",
        width: "fit-content",
        padding: "2em 4em 4em",
    },
    header: {
        fontSize: "15vh"
    }
    
}));
export default withRouter((props) => {
    const classes = useStyles();
    function returnToHome() {
    
        props.history.push("/")
    }
    return (
        
        <Fragment >
            <div className={classes.root}>
                <h1>Thanks for applying!</h1>
                <h2>Now just relax and wait for the offers to roll in!</h2>
                <Button  variant="contained" onClick={returnToHome}>Return to Homepage</Button>
            </div>
        </Fragment>
    )
});