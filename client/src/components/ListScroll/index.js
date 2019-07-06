import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import ListItem from "../../components/ListItem";
import applicants from "../../dummyApps.json";

const useStyles = makeStyles(theme => ({

    root: {
        flexGrow: 1,
        position: "relative",
        marginTop: theme.spacing(5),
        padding: 15
    },
    control: {
        border: "solid black 1px",
        marginTop: theme.spacing(5),
        width: "48%"
    },
    details: {
        position: "fixed",
        right: 0, 
        height: "100vh",
        marginRight: 15     
    },
    title: {
        margin: 20,
        color: theme.palette.primary.main
    }
}));

export default function ListScroll() {
    const classes = useStyles();
    console.log(applicants);
    return(
        <Grid container spacing={0} className={classes.root}>
            <Grid item xs={6} className={classes.control}>
                <Typography variant="h4" color="inherit" align="center" className={classes.title} >
                    Saved Candidates
                </Typography>
                <hr></hr>
                <ul>
                    {applicants.map(applicant => 
                        <ListItem 
                            key={applicant + applicant._id}
                            applicantName={applicant.applicantName}
                            expInMonths={`Experience: ${applicant.cumulativeExperience}`}
                            availableWhen={`Available: ${applicant.dateAvailable}`}
                            workHistory={`Work History: ${applicant.workHistory}`}
                        />
                    )}
                </ul>
            </Grid>
            <Grid  id="detailView" item xs={6} className={`${classes.control} ${classes.details}`}>
                <Typography variant="h4" color="inherit" align="center" className={classes.title}>
                    Candidate Details
                </Typography>
                <hr></hr>
            </Grid>
        </Grid>
    );
}