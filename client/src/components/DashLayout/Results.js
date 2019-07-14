import React, { Fragment } from "react";
import { Grid, Card, CardHeader, CardContent, List } from "@material-ui/core";
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
                <CardContent className={classes.resultList}>
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
                </CardContent>
            </Card>
        </Grid>
    );
};
