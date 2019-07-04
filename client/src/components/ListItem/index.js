import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

// Icons
import Star from "@material-ui/icons/StarRounded";
import Message from "@material-ui/icons/Message";
import Delete from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        listStyleType: "none"
    },
    paper: {
        // padding: theme.spacing(2),
        margin: "1em 0",
        maxWidth: "90%",
    }
}));


export default function ListItem(props) {
    const classes = useStyles();
    const favoriteApplicant = (e) => {
        e.preventDefault();
        return console.log("Save this Item to Employer's Favorites");
    };
    const removeApplicant = (e) => {
        e.preventDefault();
        return console.log("Delete this Item from List View");
    };
    const showApplicantDetail = (e) => {
        e.preventDefault();
        return console.log("On List Item click, display the detail page for this applicant");
    };
    const messageApplicant= (e) => {
        e.preventDefault();
        return console.log("*Twilio Message Ping*");
    };
    return (
        <li className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase> 
                            <Star style={{color:"gray"}} onClick={favoriteApplicant}></Star>
                        </ButtonBase>
                        <ButtonBase> 
                            <Delete style={{color:"gray"}} onClick={removeApplicant}></Delete>
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs onClick={showApplicantDetail}>
                                <Typography gutterBottom variant="subtitle1">
                                    {props.applicantName}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {props.expInMonths}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {props.availableWhen}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {props.workHistory}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <ButtonBase>
                                <Message style={{color:"gray"}} onClick={messageApplicant}></Message>
                            </ButtonBase>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </li>
    );
}