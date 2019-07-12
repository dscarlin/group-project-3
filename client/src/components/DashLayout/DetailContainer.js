import React from "react";
import { Grid, Typography, Avatar, Divider, Card, CardContent, CardHeader, ListItem } from "@material-ui/core";
import { Email, Phone, ExpandLess, ExpandMore } from "@material-ui/icons";



export default (props) => {

    const [open, setOpen] = React.useState(true);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    function handleClick() {
        setOpen(!open);
    }
    function handleListItemClick(event, index) {
        setSelectedIndex(index);
    }

    const workHistory = (applicant) => {
        
        let restaurants = [applicant.restaurantName1, applicant.restaurantName2, applicant.restaurantName3];
        let positions = [applicant.positionsWorked1.join(", "), applicant.positionsWorked2.join(", "), applicant.positionsWorked3.join(", ")];
        let months = [applicant.whMonths1, applicant.whMonths2, applicant.whMonths3];
        
        const listItems = restaurants.map((restaurant, index) => 
            <li key={`${restaurant}-Item`} selected={selectedIndex===index} onClick={handleClick} onClick={event => handleListItemClick(event, index)} style={{listStyle: "none", textAlign: "left"}}><strong>{restaurant}</strong>{`: ${positions[index]} for ${months[index]} months`}{open ? <ExpandLess /> : <ExpandMore />}</li>
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
                <Card className={`${classes.card} ${classes.container}`} align="center">
                    <CardHeader title="Candidate Details" className={classes.cardHeader} />
                    <CardContent>    
                        <Avatar className={classes.avatar}>{getInitials(applicants[SelectedApplicant].name)}</Avatar>
                        <Typography style={{display: "inline-block", color: "#555"}} variant="h3" align="center">{applicants[SelectedApplicant].name}</Typography>
                        <Typography style={{color: "#999"}} subtitle1="h2"><em>{`Submitted On: ${applicants[SelectedApplicant].applicationDate}`}</em></Typography>
                        <Divider className={classes.widthControl}/>
                        <p style={{color: "#555"}}><strong style={{color: "#3F51B5"}}>Available Shifts: </strong>{applicants[SelectedApplicant].availability.join(", ")}</p>
                        <Card className={classes.card} align="center">
                            <CardContent className={classes.CardContent}>
                                <p><strong style={{color: "#3F51B5"}}>Years of Hospitality Experience: </strong>{applicants[SelectedApplicant].industryExperience} </p>
                                {/* <p><strong style={{color: '#3F51B5'}}>Experience: </strong>{addExperience(applicants[SelectedApplicant].whMonths1, applicants[SelectedApplicant].whMonths2, applicants[SelectedApplicant].whMonths3)} months</p> */}
                                <p><strong style={{color: "#3F51B5", textAlign: "left"}}><u>Work History</u></strong></p> 
                                {workHistory(applicants[SelectedApplicant])}
                            </CardContent>
                        </Card>           
                                
                        <span><Email style={{color: "#3F51B5"}}/>{applicants[SelectedApplicant].email}</span>
                        <span><Phone style={{color: "#3F51B5"}}/>{applicants[SelectedApplicant].phone}</span>
                      
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
