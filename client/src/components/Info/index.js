import React from "react";
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/StarRounded";
import Message from "@material-ui/icons/Message";
import ToggleImg from "./ToggleImg.png";


export default function Info(props) {


    return (
        <div>
            <Dialog
                open={props.open}
                TransitionComponent={props.TransitionComponent}
                keepMounted
                onClose={props.onClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title" align="center">Dashboard Commands</DialogTitle>
                <DialogContent>
                    <ul>
                        <li>
                            <DialogContentText id="alert-dialog-slide-description">
                                Toggle between search results, saved, and messaged candidates:
                                <img src={ToggleImg} alt="toggle-img" style={{maxWidth: "400px"}} align="center"/>
                            </DialogContentText>
                        </li>
                        <li>
                            <DialogContentText id="alert-dialog-slide-description">
                                Add an applicant to your saved candidates: <Star color="primary"/>
                            </DialogContentText>
                        </li>
                        <li>
                            <DialogContentText id="alert-dialog-slide-description">
                                Remove an applicant from future searches: <Delete color="primary"/>
                            </DialogContentText>
                        </li>
                        <li>
                            <DialogContentText id="alert-dialog-slide-description">
                                Send a candidate a SMS request to schedule an interview: <Message color="primary" />
                            </DialogContentText>
                        </li>
                    </ul>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}