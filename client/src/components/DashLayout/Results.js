import React, { Fragment } from "react";
import { Grid, Card, CardHeader, CardContent, List, Typography } from "@material-ui/core";
import ListItem from "../../components/ListItem";



export default (props) => {
    console.log(props.appState.displayToggle);
    
    const classes = props.useStyles();
    let applicants;
    let cardTitle;

    switch (props.appState.displayToggle) {
        
    case 1:
        { 
            applicants = props.appState.searchResult;
            cardTitle = "Search Results";
        }
        break;
    
    case 2:
        {
            applicants = props.appState.messagedResult;
            cardTitle = "Messaged Candidates";
        }
        break;
                
    default:
    {
        applicants = props.appState.savedResult;
        cardTitle = "Saved Candidates";
    }
    }
    console.log(applicants);
    applicants = props.appState.searchResult;

    return (
        
        <Grid item sm={6}>
            <Card className={`${classes.card} ${classes.container}`} align="center">
                <CardHeader title={cardTitle} className={classes.cardHeader} />
                <Grid item className={classes.messageBtn} alignItems="center">
                    <Typography variant="button">Select an applicant to view details.</Typography>
                </Grid>
                <CardContent  className={classes.containerContent}>
                    {applicants.length ?
                        <List component="ul" >
                            <Fragment>
                                {applicants.map((applicant, index) =>
                                    <ListItem 
                                        messageApplicant={props.messageApplicant}
                                        key={applicant._id}
                                        applicant={applicant}
                                        appState={props.appState}
                                        setAppState={props.setAppState}
                                        index={index}
                                    />
                                )}
                            </Fragment>
                        </List>
                        
                        : <Grid item>
                            <Typography style={{color: "#999"}} variant="body1">No results found.</Typography>
                        </Grid> 
                    }
                </CardContent>
            </Card>
        </Grid>
    );
};
