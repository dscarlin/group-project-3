import React from "react";
import lifecycle from "react-pure-lifecycle";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Card, CardContent, Container, CardHeader, Divider, Grid, Paper, Typography} from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
import ListItem from "../../components/ListItem";
import SearchForm from "../../components/SearchForm";
import applicants from "../../dummyApps.json";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        position: "relative",
        marginTop: theme.spacing(8),
    },
    avatar: {
        padding: 6,
        display: "inline-block",
        color: "white",
        backgroundColor: "#3F51B5"
    },
    card: {
        marginTop: 10,
        width: "90%",
        minHeight: 175,
        color: "#555"
    },
    cardHeader: {
        color: "white",
        backgroundColor: "#3F51B5"
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
    },
    widthControl: {
        width: "45vw"
    }
}));

const methods = {
    // componentDidMount(props) {
    //     props.setAppState({ SelectedApplicant: 0});
    // }
};

function ListAndDetailContainer(props) {
    const classes = useStyles();
    
    // const [SelectedApplicant, setSelectedApplicant] = React.useState(0);

   
    
    const addExperience = (exp1, exp2, exp3) => {
        return exp1 +exp2 + exp3;
    };
    const workHistory = (jobOne, jobTwo, jobThree) => {
        let workHistory = [jobOne, jobTwo, jobThree];
        return workHistory;
    };
    const getInitials = (name) => {
        var splitName = name.split(" ");
        var firstName = splitName[0];
        var lastName = splitName[1];
        var firstInitial = firstName.split("")[0];
        var lastInitial = lastName.split("")[0];
        var initials = firstInitial + lastInitial;
        return initials;
    };
    console.log(SelectedApplicant);
    const applicants = props.appState.searchResult;
    const SelectedApplicant = props.appState.SelectedApplicant;
    console.log(applicants);
    return(
        <Container>
            <Grid className={`${classes.root}`}>
                <SearchForm appstate={props.appState} setAppState={props.setAppState}/>
            </Grid>
            <Grid container spacing={0} className={classes.root}>
                <Grid item xs={6} className={classes.control}>
                    <ul>
                        {applicants.map((applicant, index) =>
                            <ListItem 
                                key={applicant._id}
                                applicant={applicant}
                                appState={props.appState}
                                setAppState={props.setAppState}
                                index={index}
                            />
                        )}
                    </ul>
                </Grid>
                {applicants.length?
                    <Paper className={classes.paper}>
                        <Grid id="detail-view" item xs={6   } className={`${classes.control} ${classes.fixed}`}>
                            <Avatar className={classes.avatar}>{getInitials(applicants[SelectedApplicant].name)}</Avatar>
                            <Typography style={{display: "inline-block", color: "#555"}} variant="h3">{applicants[SelectedApplicant].name}</Typography>
                            <Typography style={{color: "#999"}} subtitle1="h2"><em>{`Submitted On: ${applicants[SelectedApplicant].applicationDate}`}</em></Typography>
                            <Divider className={classes.widthControl}/>
                            <Grid container>
                                <p style={{color: "#555"}}><strong style={{color: "#3F51B5"}}>Available Shifts: </strong>{applicants[SelectedApplicant].availability}</p>
                                <Grid container alignItems="center" justify="flex-start" spacing={0}>
                                    <Grid item xs={5}>
                                        <Card className={classes.card}>
                                            <CardContent>
                                                <p><strong style={{color: "#3F51B5"}}>Years of Hospitality Experience: </strong>{applicants[SelectedApplicant].industryExperience} </p>
                                                {/* <p><strong style={{color: '#3F51B5'}}>Experience: </strong>{addExperience(applicants[SelectedApplicant].whMonths1, applicants[SelectedApplicant].whMonths2, applicants[SelectedApplicant].whMonths3)} months</p> */}
                                                <p><strong style={{color: "#3F51B5"}}>Work History: </strong>{workHistory(applicants[SelectedApplicant].positionsWorked1, applicants[SelectedApplicant].positionsWorked2, applicants[SelectedApplicant].positionsWorked3)}</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Card className={classes.card}>
                                            <CardContent>
                                                <span><Avatar className={classes.avatar}><Email style={{backgroundColor: "#3F51B5"}}/></Avatar>{applicants[SelectedApplicant].email}</span>
                                                <span><Avatar className={classes.avatar}><Phone style={{backgroundColor: "#3F51B5"}}/></Avatar>{applicants[SelectedApplicant].phone}</span>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Card className={classes.card}>
                                    <CardHeader title="Cover Letter" className={classes.cardHeader}/>
                                    <Divider />
                                    <CardContent>
                                        <p>{applicants[SelectedApplicant].coverLetter}</p>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Paper>
                    : 
                    null}
            </Grid>
        </Container>
    );
}
export default lifecycle(methods)(ListAndDetailContainer);