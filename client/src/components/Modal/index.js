import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Modal, Button } from "@material-ui/core";
import EmployerSignupForm from "../EmployerSignupForm";
  
function getModalStyle() {
    return {
        top: 50,
        left: 50
    };
}
  
const useStyles = makeStyles(theme => ({
    paper: {
    //   position: 'absolute',
        margin: "10vh auto",
        verticalAlign: "center",
        width: "fit-content",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: "none",
    },
}));
  

export default function SimpleModal(props) {
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    const toggle = function() {
        props.appState({ modalOpen: !props.open });
    };
    const classes = useStyles();

    return (
        <div>
            <Typography gutterBottom>Click to get the full Modal experience!</Typography>
            <Button onClick={toggle}>Open Modal</Button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={props.open}
                onClose={toggle}
            >
                <div  className={classes.paper}>
                    <EmployerSignupForm  />
                </div>
            </Modal>
        </div>
    );
}