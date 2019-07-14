import React from "react";
import axios from "axios";
import auth0Client from "../../auth";

//csss
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, ButtonBase, Avatar } from "@material-ui/core";

// Icons
import Star from "@material-ui/icons/StarRounded";
import Message from "@material-ui/icons/Message";

//Popper
import Popper from "../Popper";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        listStyleType: "none"
    },
    paper: {
        // padding: theme.spacing(2),
        margin: "2em 0",
        maxWidth: "90%",
        textAlign: "left", 
    },
    avatar: {
        padding: 6,
        margin: "1.5em", 
        display: "inline-block",
        color: "white",
        backgroundColor: theme.palette.primary.main,
        textAlign: "center"
    },
    color: {
        color: "primary"
    }
}));


export default function ListItem(props) {
    const classes = useStyles();
    const favoriteApplicant = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        let applicantId = props.appState.searchResult[props.index]._id;
        let userInfo = props.appState.userInfo;
        let index = userInfo.interested.indexOf(applicantId);
        if(index < 0)
            userInfo.interested.push(applicantId);
        else
            userInfo.interested.splice(index, 1);
        const result = await axios.put("/api/employer",userInfo,{
            headers: { "Authorization": `Bearer ${auth0Client.getIdToken()}` }
        });
        if(result.data.ok)
            return props.setAppState({ userInfo });
    };
    const removeApplicant = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        let applicantId = props.appState.searchResult[props.index]._id;
        let userInfo = props.appState.userInfo;
        let searchResult = props.appState.searchResult;
        let index = userInfo.notInterested.indexOf(applicantId);
        if(index < 0){
            userInfo.notInterested.push(applicantId);
            searchResult.splice(props.index,1);
        }
        // else{
        //     userInfo.notInterested.splice(index, 1);
        //     // searchResult.unshift(props) //add back to search result
        // }
        const result = await axios.put("/api/employer",userInfo,{
            headers: { "Authorization": `Bearer ${auth0Client.getIdToken()}` }
        });
        console.log(userInfo);
        if(result.data.ok)
            return props.setAppState({ userInfo });
        
    };
    const addExperience = (a, b, c) => {
        return a + b + c;
    };
    const getInitials = (name) => {
        var splitName = name.split(" ");
        var firstName = splitName[0];
        var lastName = splitName[1];
        var firstInitial = firstName.split("")[0];
        var lastInitial = lastName.split("")[0];
        var initials = firstInitial + lastInitial;
        return initials;
    };
    const applicant = props.appState.searchResult[props.index];
    return (
        <li className={classes.root} onClick={() => props.setAppState({ SelectedApplicant: props.index})}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Avatar className={classes.avatar}>{getInitials(applicant.name)}</Avatar>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h6" color="primary">
                                    <strong>{props.applicant.name}</strong>
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Positions:</strong> {props.applicant.selectedPositions.join(", ")}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Availability:</strong> {props.applicant.availability.join(", ")}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Experience:</strong> {addExperience(props.applicant.whMonths1,props.applicant.whMonths2, props.applicant.whMonths3)} Months
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <ButtonBase> 
                                <Star 
                                    style={props.appState.userInfo.interested
                                        .indexOf(props.appState.searchResult[props.index]._id) < 0 ? 
                                        {color:"gray"} : {color: "#f5dc06"}} 
                                    onClick={favoriteApplicant}
                                />
                            </ButtonBase>
                            <ButtonBase> 
                                <Popper removeApplicant={removeApplicant}/>
                            </ButtonBase>
                        </Grid>
                    </Grid>
                    {/* <Grid item>
                        <ButtonBase> 
                            <Star style={props.appState.userInfo.interested
                                .indexOf(props.appState.searchResult[props.index]._id) < 0 ? 
                                {color:"gray"} : {color: "#f5dc06"}} 
                            onClick={favoriteApplicant}
                            />
                        </ButtonBase>
                        <ButtonBase> 
                            
                            <Popper removeApplicant={removeApplicant}/>
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs >
                                <Typography gutterBottom variant="subtitle1">
                                    {props.applicant.name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {addExperience(props.applicant.whMonths1,props.applicant.whMonths2, props.applicant.whMonths3)}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {props.applicant.availability}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {workHistory(props.applicant.positionsWorked1, props.applicant.positionsWorked2, props.applicant.positionsWorked3)}
                                </Typography>
                            </Grid>
                        </Grid> */}
                    {/* <Grid item>
                            <ButtonBase>
                                {props.appState.userInfo.messaged.indexOf(applicant._id) >= 0 ? 
                                    <div>
                                        <Message style={{color:"green"}} ></Message>
                                        <span><strong>Messaged</strong></span>
                                    </div>
                                    :
                                    <div>
                                        <Message style={{color:"gray"}} onClick={() => props.messageApplicant(props.applicant)}></Message>
                                        <span>SMS Invite to Schedule Interview</span>
                                    </div>
                                }
                            </ButtonBase>
                        </Grid> */}
                    {/* </Grid> */}
                </Grid>
            </Paper>
        </li>
    );
}