import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
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
    }
}));

export default function ListAndDetailContainer() {
    const classes = useStyles();
    
    const [SelectedApplicant, setSelectedApplicant] = React.useState(0);
    
    function handleChange(event) {
        setSelectedApplicant(event.target.key);
        console.log(event.target.key)
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
                        />
                    )}
                </ul>
            </Grid>
            <Grid  id="detailView" item xs={6   } className={`${classes.control} ${classes.fixed}`}>
                <h1>detail</h1>
                <h1>detail</h1>
            </Grid>
        </Grid>
    );
}