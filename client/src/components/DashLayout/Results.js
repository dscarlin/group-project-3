import React, { Fragment } from "react";
import { Grid, Card, CardHeader, CardContent, List } from "@material-ui/core";
import ListItem from "../../components/ListItem";



export default (props) => {
    console.log(props.appState.displayToggle);
    
    const classes = props.useStyles();
   
    let applicants = props.applicants;

    return (
        
        <Grid item sm={6}>
            <Card className={`${classes.card} ${classes.container}`} align="center">
                <CardHeader title={props.cardTitle} className={classes.cardHeader} />
                <CardContent className={classes.resultList}>
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
                </CardContent>
            </Card> )
             
        </Grid>
    );
};
