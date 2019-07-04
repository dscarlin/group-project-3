import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Modal, Button } from "@material-ui/core";
import { Auth0Context } from "../../react-auth0-wrapper";
import EmployerSignupForm from "../EmployerSignupForm";


function rand() {
    return Math.round(Math.random() * 20) - 10;
}
  
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
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
  

export default function SimpleModal() {
    const [open, setOpen] = React.useState(false);
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles();

    return (
        <div>
            <Typography gutterBottom>Click to get the full Modal experience!</Typography>
            <Button onClick={handleOpen}>Open Modal</Button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div  className={classes.paper}>
                    <EmployerSignupForm  />
                </div>
            </Modal>
        </div>
    );
}