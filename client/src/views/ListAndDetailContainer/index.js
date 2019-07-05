import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, Typography, Paper } from "@material-ui/core";
import ListItem from "../../components/ListItem";
import SearchForm from "../../components/SearchForm";
import applicants from "../../dummyApps.json";
import Divider from "@material-ui/core/Divider"

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
    widthControl: {
        width: "40vw"
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
    
    const addExperience = (exp1, exp2, exp3) => {
        return exp1 +exp2 + exp3;
    }
    const workHistory = (jobOne, jobTwo, jobThree) => {
        let workHistory = [jobOne, jobTwo, jobThree]
        return workHistory;
    }

    const applicants = props.results;
    console.log(applicants);
    return(
        <Container>
            {console.log(props.results)}
            <Grid className={`${classes.root}`}>
                <SearchForm appState={props.appState}/>
            </Grid>
            <Grid container spacing={0} className={classes.root}>
                <Grid item xs={6} className={classes.control}>
                    <ul>
                        {applicants.map((applicant, index) =>
                            <ListItem 
                                key={applicant._id}
                                applicant={applicant}
                                handleClick={setSelectedApplicant}
                                index={index}
                            />
                        )}
                    </ul>
                </Grid>
                <Paper className={classes.paper}>
                    <Grid id="detail-view" item xs={6   } className={`${classes.control} ${classes.fixed}`}>
                        <Typography variant="h3">{`App # ${applicants[SelectedApplicant]._id} ${applicants[SelectedApplicant].name}`}</Typography>
                        <Typography subtitle1="h2">{`Submitted On: ${applicants[SelectedApplicant].applicationDate}`}</Typography>
                        <Divider className={classes.widthControl}/>
                        <p><strong>Short Bio: </strong> {applicants[SelectedApplicant].coverLetter}</p>
                        <ul>
                            <li>{`Available: ${applicants[SelectedApplicant].availability}`}</li>
                            <li>{`Email: ${applicants[SelectedApplicant].email}`}</li>
                            <li>{`Phone: ${applicants[SelectedApplicant].phone}`}</li>
                            <li>{`Experience: ${addExperience(applicants[SelectedApplicant].whMonths1, applicants[SelectedApplicant].whMonths2, applicants[SelectedApplicant].whMonths3)}`}</li>
                            <li>{`Work History: ${workHistory(applicants[SelectedApplicant].positionsWorked1, applicants[SelectedApplicant].positionsWorked2, applicants[SelectedApplicant].positionsWorked3)}`}</li>
                        </ul>
                    </Grid>
                </Paper>
            </Grid>
        </Container>
    );
}