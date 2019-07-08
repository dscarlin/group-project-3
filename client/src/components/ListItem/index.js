import React from "react";
import axios from "axios";
import auth0Client from "../../auth";

//csss
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

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
        margin: "1em 0",
        maxWidth: "90%",
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
    const workHistory = (jobOne, jobTwo, jobThree) => {
        let workHistory = [jobOne, jobTwo, jobThree];
        return workHistory;
    };
    return (
        <li className={classes.root} onClick={() => props.setAppState({ SelectedApplicant: props.index})}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase> 
                            <Star style={props.appState.userInfo.interested
                                .indexOf(props.appState.searchResult[props.index]._id) < 0 ? 
                                {color:"gray"} : {color: "yellow"}} 
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
                        </Grid>
                        <Grid item>
                            <ButtonBase>
                                <Message style={{color:"gray"}} onClick={() => props.messageApplicant(props.applicant)}></Message>
                            </ButtonBase>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </li>
    );
}