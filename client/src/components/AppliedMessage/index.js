import React, { Fragment } from "react";
import { withRouter } from "react-router-dom"
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({  
      
    root: {
        color: "#fff",
        margin: "40vh auto 0",
        textAlign: "center",
        background: theme.palette.primary,
        width: "fit-content",
        padding: "4em",
    },
    header: {
        font: "15vh"
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
                <Button  onClick={returnToHome}>Return to Homepage</Button>
            </div>
        </Fragment>
    )
});