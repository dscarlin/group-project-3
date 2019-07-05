import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import ListItem from "../../components/ListItem";
import applicants from "../../dummyApps.json";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        position: "relative",
        marginTop: theme.spacing(5)
    },
    control: {
        border: "solid black 1px",
    },
    fixed: {
        position: "fixed",
        right: "0",
        width: "50%", 
        height: "100vh"     
    },
    paper: {
        // padding: theme.spacing(2),
        margin: "1em 0",
        maxWidth: "90%",
    }
}));

export default function ListAndDetailContainer() {
    const classes = useStyles();
    
    const [SelectedApplicant, setSelectedApplicant] = React.useState(0);
    
    function displayDetail(event) {
        // event.preventDefault();
        // event.target.key;
        setSelectedApplicant(event.target.key);

        console.log(SelectedApplicant);
    }

{/* selectApplicant={this.state.handleChange} */}
    console.log(applicants);
    return(
        <Grid container spacing={0} className={classes.root}>
            <Grid item xs={6} className={classes.control}>
                <ul>
                    {applicants.map(applicant =>
                        <ListItem 
                            key={applicant._id}
                            applicantName={applicant.applicantName}
                            expInMonths={`Experience: ${applicant.cumulativeExperience}`}
                            availableWhen={`Available: ${applicant.dateAvailable}`}
                            workHistory={`Work History: ${applicant.workHistory}`}
                            onClick={displayDetail}
                        />
                    )}
                </ul>
            </Grid>
            <Paper className={classes.paper}>
            <Grid id="detail-view" item xs={6   } className={`${classes.control} ${classes.fixed}`}>
                <Typography variant="h4">{`App # ${applicants[SelectedApplicant]._id}: ${applicants[SelectedApplicant].applicantName}`}</Typography>
                <p><strong>Short Bio: </strong>I am a looking for work boi</p>
                <ul>
                    <li>{`Available: ${applicants[SelectedApplicant].dateAvailable}`}</li>
                    <li>{`Experience: ${applicants[SelectedApplicant].cumulativeExperience}`}</li>
                    <li>{`Work History: ${applicants[SelectedApplicant].workHistory}`}</li>
                </ul>
            </Grid>
            </Paper>
        </Grid>
    );
}