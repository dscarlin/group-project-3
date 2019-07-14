import React from "react";
import moment from "moment";
import { Grid, Typography, Avatar, Divider, Card, CardContent, CardHeader, ListItem } from "@material-ui/core";
import { Email, Phone, ExpandLess, ExpandMore } from "@material-ui/icons";
import ExpansionPanel from "../ExpansionPanel";



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
            ></ExpansionPanel>
        );
        return (
            <ul>{listItems}</ul>
        );

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
    const classes = props.useStyles();
    const applicants = props.appState.searchResult;
    const SelectedApplicant = props.appState.SelectedApplicant;

    return (
        <Grid item sm={6}>
            {applicants.length ?
                <Card className={`${classes.card} ${classes.container} ${classes.detailView}`} align="center">
                    <CardHeader title="Candidate Details" className={classes.cardHeader} />
                    <CardContent>    
                        <Avatar className={classes.avatar}>{getInitials(applicants[SelectedApplicant].name)}</Avatar>
                        <Typography style={{display: "inline-block", color: "#555"}} variant="h3" align="center">{applicants[SelectedApplicant].name}</Typography>
                        <p>
                            <span><Email style={{color: "#3F51B5"}}/>{applicants[SelectedApplicant].email}</span>
                            <span><Phone style={{color: "#3F51B5"}}/>{applicants[SelectedApplicant].phone}</span>
                        </p>
                        <Typography style={{color: "#999"}} subtitle1="h2"><em>{`Submitted On: ${moment(applicants[SelectedApplicant].applicationDate).format("MMMM Do YYYY, h:mm a")}`}</em></Typography>
                        <Divider className={classes.dividerFullWidth}/>
                        <Card className={classes.card} align="center">
                            <CardContent className={classes.CardContent}>
                                <p style={{color: "#555"}}><strong style={{color: "#3F51B5"}}>Available Shifts: </strong>{applicants[SelectedApplicant].availability.join(", ")}</p>
                                <p><strong style={{color: "#3F51B5"}}>Years of Hospitality Experience: </strong>{applicants[SelectedApplicant].industryExperience} </p>
                                <p><strong style={{color: "#3F51B5", textAlign: "left", fontSize: "1.5em"}}><u>Work History</u></strong></p> 
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
                : null}
        </Grid>
    )
}
