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
        let applicantId = props.applicant._id;
        let userInfo = props.appState.userInfo;
        let index = userInfo.interested.indexOf(applicantId);
        if(index < 0){
            userInfo.interested.push(applicantId);
        }
        else
            userInfo.interested.splice(index, 1);
        const result = await axios.put("/api/employer",userInfo,{
            headers: { "Authorization": `Bearer ${auth0Client.getIdToken()}` }
        });
        if(result.data.ok){
            props.setAppState({ userInfo });
            props.getSavedAndMessaged();
        }

    };
    const removeApplicant = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        let applicantId = props.applicants[props.index]._id;
        let userInfo = props.appState.userInfo;
        let searchResult = props.appState.searchResult;
        let index = searchResult.map(applicant => applicant._id).indexOf(applicantId);
        userInfo.notInterested.push(applicantId);
        searchResult.splice(index,1);
        const result = await axios.put("/api/employer",userInfo,{
            headers: { "Authorization": `Bearer ${auth0Client.getIdToken()}` }
        });
        console.log(userInfo);
        if(result.data.ok){
            props.setAppState({ userInfo, searchResult });
            props.getSavedAndMessaged();
        }

        
    };
    const addExperience = (a, b, c) => {
        let t = a + b + c;
        let r = t % 12;
        let y = Math.floor(t / 12);
        if (!t) return 0 + " Months";
        else if(r){
            if(t == 13)
                return y + "yr " + r + "mo";
            else if(r == 1)
                return y + "yrs " + r + "mo";
            else 
                return y + "yrs " + r + "mos";
        }
        else {
            if(t == 1)
                return t + "mo";
            else if(t < 12)
                return t + "mos";
            else if(t == 12)
                return y + "yr";
            else 
                return y + "yrs";
        }
    };
    const getInitials = (name) => {
        var splitName = name.split(" ");
        var firstName = splitName[0];
        var lastName = "";
        if(splitName.length > 1)
            lastName = splitName[1];
        var firstInitial = firstName.split("")[0];
        var lastInitial = "";
        if(lastName)
            lastInitial = lastName.split("")[0];
        var initials = firstInitial + lastInitial;
        return initials;
    };
    
    console.log(props.applicant);
    const {name, selectedPositions, availability, whMonths1, whMonths2, whMonths3, _id} = props.applicant;
    return (
        <li className={classes.root} onClick={() => props.setAppState({ SelectedApplicant: props.index})}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Avatar className={classes.avatar}>{getInitials(name)}</Avatar>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h6" color="primary">
                                    <strong>{name}</strong>
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Positions:</strong> {selectedPositions.join(", ")}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Availability:</strong> {availability.join(", ")}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Experience:</strong> {addExperience(whMonths1,whMonths2, whMonths3)}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <ButtonBase> 
                                <Star 
                                    style={props.appState.userInfo.interested
                                        .indexOf(_id) < 0 ? 
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