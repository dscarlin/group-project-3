import React from "react";
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
    button: {
        display: "block",
        margin: "2em auto"        
    }
   
}));

export default function applicationPopper(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        // event.stopPropagation();
        setAnchorEl(anchorEl ? null : event.currentTarget);

    }
    function handleSubmit(e){
        props.submit(e);
        handleClick();
        props.setViewState({applied: true})
    }

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    return (
        <div>
            <Button onClick={handleClick} className={`${classes.white} ${classes.button}`} >Apply</Button>
            {/* <Delete aria-describedby={id} variant="contained" onClick={handleClick}/> */}
            {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Toggle Popper
      </Button> */}
            <Popper placement="bottom" id={id} open={open} anchorEl={anchorEl} transition>
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
        </div>
    );
}