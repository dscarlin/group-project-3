import React, { Fragment } from "react";
import { Grid, Card, CardHeader, CardContent, List } from "@material-ui/core";
import ListItem from "../../components/ListItem";
import applicants from "../../dummyApps.json";
// import DummyItem from "./DummyItem";



export default (props) => {

    const classes = props.useStyles();
    const applicants = props.appState.searchResult;


    return (

        <Grid item sm>
            <Card className={`${classes.card} ${classes.container}`} align="center">
                <CardHeader title="Search Results" className={classes.cardHeader} />
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
                            {/* <DummyItem useStyles={useStyles}/>
                            <DummyItem useStyles={useStyles}/>
                            <DummyItem useStyles={useStyles}/>
                            <DummyItem useStyles={useStyles}/>
                            <DummyItem useStyles={useStyles}/>
                            <DummyItem useStyles={useStyles}/>
                            <DummyItem useStyles={useStyles}/>
                            <DummyItem useStyles={useStyles}/>
                            <DummyItem useStyles={useStyles}/>
                            <DummyItem useStyles={useStyles}/>
                            <DummyItem useStyles={useStyles}/>
                            <DummyItem useStyles={useStyles}/>
                            <DummyItem useStyles={useStyles}/>
                            <DummyItem useStyles={useStyles}/> */}
                        </Fragment>
                    </List>
                </CardContent>
            </Card>
        </Grid>
    )
}

