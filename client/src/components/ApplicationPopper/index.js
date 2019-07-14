import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Popper, Typography, Button, Fade, Paper } from "@material-ui/core";
// import Delete from "@material-ui/icons/Delete";
// import { red } from "@material-ui/core/colors";


const useStyles = makeStyles(theme => ({
    typography: {
        padding: theme.spacing(2),
    },
    paper: {
        "& Button": {
            margin: "1em",

            "& Button.removeButton:hover": {
                backgroundColor: "red"
            }
        },
        textAlign: "center"
    },
    
   
}));

export default function applicationPopper(props) {
    const classes = useStyles();
    const open = Boolean(props.applState.anchorEl);
    const id = open ? "simple-popper" : undefined;
    const handleClick = e => props.togglePopper(e);
    const handleSubmit = e => {
        props.submit(e);
        props.setViewState({applied: true})
    }
    return (
        <Fragment>
            <Popper  id={id} open={open} anchorEl={props.applState.anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper className={classes.paper}>
                            <Typography className={classes.typography}>
                                <strong>Have you double checked your application?</strong>
                                <br/><small>You cannot change the application once you submit</small>
                            </Typography>
                            <Button  onClick={handleSubmit}>Submit</Button>
                            <Button className="removeButton" onClick={handleClick}>Cancel</Button>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </Fragment>
    );
}