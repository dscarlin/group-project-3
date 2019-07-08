import React, { Fragment } from "react";
import { Grid, Card, CardHeader, CardContent, List, ListItem } from "@material-ui/core";
import applicants from "../../dummyApps.json";
import DummyItem from "./DummyItem";



export default ({useStyles}) => {

    const classes = useStyles();

    return (

        <Grid item sm>
            <Card className={`${classes.card} ${classes.container}`} align="center">
                <CardHeader title="Search Results" className={classes.cardHeader} />
                <CardContent>
                    <List component="ul" className={classes.resultList} overflow="hidden">
                        <Fragment>
                            {/* {applicants.map((applicant, index) =>
                                // <ListItem 
                                //     // messageApplicant={props.messageApplicant}
                                //     key={applicant._id}
                                //     applicant={applicant}
                                //     // appState={props.appState}
                                //     // setAppState={props.setAppState}
                                //     index={index}
                                // />
                            )} */}
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
                            <DummyItem useStyles={useStyles}/>
                            <DummyItem useStyles={useStyles}/>
                        </Fragment>
                    </List>
                </CardContent>
            </Card>
        </Grid>
    )
}

