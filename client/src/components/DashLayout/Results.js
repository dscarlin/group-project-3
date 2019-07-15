import React, { Fragment } from "react";
import { Grid, Card, CardHeader, CardContent, List, Typography } from "@material-ui/core";
import ListItem from "../../components/ListItem";



export default (props) => {
    console.log(props.appState.displayToggle);
    
    const classes = props.useStyles();
   
    let applicants = props.applicants;

    return (
        
        <Grid item sm={6}>
            <Card className={`${classes.card} ${classes.container}`} align="center">
                <CardHeader title={props.cardTitle} className={classes.cardHeader} />
                <Grid item className={classes.messageBtn} alignItems="center">
                    <Typography variant="body1">Select an applicant to view details.</Typography>
                </Grid>
                <CardContent  className={classes.containerContent}>
                    {applicants.length ?
                        <List component="ul" >
                            <Fragment>
                                {applicants.map((applicant, index) =>
                                    <ListItem 
                                        messageApplicant={props.messageApplicant}
                                        getSavedAndMessaged={props.getSavedAndMessaged}
                                        key={applicant._id}
                                        applicant={applicant}
                                        appState={props.appState}
                                        setAppState={props.setAppState}
                                        index={index}
                                        applicants={applicants}
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
