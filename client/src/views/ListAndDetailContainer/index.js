import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, Typography, Paper } from "@material-ui/core";
import ListItem from "../../components/ListItem";
import SearchForm from "../../components/SearchForm";
import applicants from "../../dummyApps.json";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        position: "relative",
        marginTop: theme.spacing(8),
    },
    
    control: {
        // border: "solid black 1px",
        paddingTop: "2em"
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

export default function ListAndDetailContainer(props) {
    const classes = useStyles();
    
    const [SelectedApplicant, setSelectedApplicant] = React.useState(0);
    


    console.log(applicants);
    return(
        <Container>
            {console.log(props.results)}
            <Grid className={`${classes.root}`}>
                <SearchForm appState={props.appState}/>
            </Grid>
            <Grid container spacing={0} className={""}>
                <Grid item xs={6} className={classes.control}>
                    <ul>
                        {applicants.map((applicant, index) =>
                            <ListItem 
                                key={applicant._id}
                                applicantName={applicant.applicantName}
                                expInMonths={`Experience: ${applicant.cumulativeExperience}`}
                                availableWhen={`Available: ${applicant.dateAvailable}`}
                                workHistory={`Work History: ${applicant.workHistory}`}
                                handleClick={setSelectedApplicant}
                                index={index}
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
        </Container>
    );
}