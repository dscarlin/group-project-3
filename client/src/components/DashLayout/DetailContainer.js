import React, { Fragment } from "react";
import moment from "moment";
import { Grid, Typography, Avatar, Divider, Card, CardContent, ButtonBase, CardHeader } from "@material-ui/core";
import { Email, Phone } from "@material-ui/icons";
import ExpansionPanel from "../ExpansionPanel";
import Message from "@material-ui/icons/Message";



export default (props) => {

    const workHistory = (applicant) => {
        let restaurants = [applicant.restaurantName1, applicant.restaurantName2, applicant.restaurantName3];
        let positions = [applicant.positionsWorked1.join(", "), applicant.positionsWorked2.join(", "), applicant.positionsWorked3.join(", ")];
        let months = [applicant.whMonths1, applicant.whMonths2, applicant.whMonths3];
        let details = [applicant.whDetails1, applicant.whDetails2, applicant.whDetails3];
        const listItems = restaurants.map((restaurant, index) => 
            <ExpansionPanel  
                key={`${restaurant}-Item`} 
                index={index} 
                restaurant={restaurant} 
                details={details} 
                months={months} 
                positions={positions} 
                style={{listStyle: "none", textAlign: "left"}}
                align="center"
            ></ExpansionPanel>
        );
        return (
            <div>{listItems}</div>
        );
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
    const classes = props.useStyles();
    const applicants = props.appState.searchResult;
    const SelectedApplicant = props.appState.SelectedApplicant;
    console.log(props);

    return (
        <Grid item sm={6}>
            {applicants.length ?
                <Card className={`${classes.card} ${classes.container}`} align="center">
                    <CardHeader title="Candidate Details" className={classes.cardHeader} />
                    <Grid item className={classes.messageBtn}>
                        {props.appState.userInfo.messaged.indexOf(applicants[SelectedApplicant]._id) >= 0 ? 
                               
                            <div>
                                <Message style={{color:"green"}} ></Message>
                                <span><strong>Messaged</strong></span>
                            </div>
                            :
                            <ButtonBase onClick={() => props.messageApplicant(applicants[SelectedApplicant])}>
                            
                                <Message fontSize="large" color="action" aria-label="Send SMS Interview Invitation"/>
                                <Typography variant="button">Send SMS Interview Invitation</Typography>
                        
                            </ButtonBase>
                        }
                    </Grid>
                    <CardContent className={classes.containerContent}>
                        <Grid item>
                            <Typography style={{color: "#999"}} variant="caption"><em>{`Submitted On: ${moment(applicants[SelectedApplicant].applicationDate).format("MMMM Do YYYY, h:mm a")}`}</em></Typography>
                        </Grid>
                        <Avatar className={classes.avatar}>{getInitials(applicants[SelectedApplicant].name)}</Avatar>
                        <Typography style={{display: "inline-block", color: "#555"}} variant="h3" align="center">{applicants[SelectedApplicant].name}</Typography>
                        {/* <p><strong style={{color: "#3F51B5"}}>Years of Hospitality Experience: </strong>{applicants[SelectedApplicant].industryExperience} </p> */}
                        <p>
                            <span><Email fontSize="small" style={{color: "#3F51B5"}}/>{applicants[SelectedApplicant].email}</span>
                            <span><Phone fontSize="small" style={{color: "#3F51B5"}}/>{applicants[SelectedApplicant].phone}</span>
                        </p>
                        <p style={{color: "#555"}}><strong style={{color: "#3F51B5"}}>Available Shifts: </strong>{applicants[SelectedApplicant].availability.join(", ")}</p>
                        
                      
                        <Divider className={classes.dividerFullWidth}/>
                        <Card className={classes.card} align="center">
                            <CardHeader title="Work History" className={classes.cardHeader} />
                            <CardContent className={classes.cardContent} > 
                                {workHistory(applicants[SelectedApplicant])}
                            </CardContent>
                        </Card>           
                        <Card className={classes.card} align="center">
                            <CardHeader title="Cover Letter" className={classes.cardHeader}/>
                            <Divider />
                            <CardContent className={classes.coverLetter}>
                                <p>{applicants[SelectedApplicant].coverLetter}</p>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
                : <Card className={`${classes.card} ${classes.container}`} align="center">
                    <CardHeader title="Candidate Details" className={classes.cardHeader} />
                    <CardContent className={classes.containerContent}>
                        <Grid item>
                            <Typography style={{color: "#999"}} variant="body1">No results found.</Typography>
                        </Grid>
                    </CardContent>
                </Card>}
        </Grid>
    );
};
