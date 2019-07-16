
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Popper, Typography, Button, Fade, Paper } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";

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
    }
   
}));

export default function SimplePopper(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        event.stopPropagation();
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    return (
        <div>
            <Delete aria-describedby={id} variant="contained" onClick={handleClick}/>
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper className={classes.paper}>
                            <Typography className={classes.typography}>
                                <strong>Permanently Remove Applicant?</strong>
                                <br/><small>Appplicant will be removed from all future searches</small>
                                <br/><small>* This operation cannot be undone </small>
                            </Typography>
                            <Button  onClick={props.removeApplicant}>Delete</Button>
                            <Button className="removeButton" onClick={handleClick}>Cancel</Button>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </div>
    );
}