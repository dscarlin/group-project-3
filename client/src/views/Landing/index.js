import React from "react";
import { Button, Paper, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import style from "./style.module.css";
import { NavLink } from "react-router-dom";


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    jumbotron: {
        position: "relative",
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: "url(http://www.liverpoolcommercialcleaners.co.uk/wp-content/uploads/2016/12/professional-ktchen-cleaning.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: 400,
    },
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,.3)",
    },
    welcomeMessage: {
        position: "relative", 
        padding: 64,
        marginTop: 60,
    },
    overview: {
        position: "relative",
        padding: theme.spacing(3),
        paddingTop: 0,
        justifyContent: "center",
        textAlign: "center"
    }
}));

export default function Landing(props) {
    const classes = useStyles();
    console.log("Landing");
    return(
        <React.Fragment>
            <main>
                <Paper className={classes.jumbotron}>
                    <div className={classes.overlay} />
                    <Grid container>
                        <Grid item md={12}>
                            <div className={classes.welcomeMessage}>
                                <Typography variant="h1" color="inherit" align="center" >
                                    On The Fly Staffing
                                </Typography>
                                <Typography variant="h5" color="inherit" align="center" >
                                    Helping the hospitality industry apply and hire with ease.
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
                <div className={classes.overview}>
                    <Typography variant="body1" color="inherit">
                        Our goal is to make the hiring process in the restaurant industry easier for all involved.  Applicants can apply to all of our member restaurants at once by submitting our easy online questionaire.  Restaurant managers are then able to search our talent pool to find the perfect candidates to fufill their needs.   
                    </Typography>
                    <br />
                    <Button variant="contained" color="inherit" className={`${classes.button} `} >
                        <NavLink to="/apply" exact={true} className={`${style.inherit}`}>
                            Apply for Jobs
                        </NavLink>
                    </Button>
                    <Button variant="contained" color="inherit" className={`${classes.button} `} >
                        <NavLink to="/login" exact={true} className={`${style.inherit}`}>
                            Find Candidates
                        </NavLink>
                    </Button>
                </div>
                
                
            </main>
        </React.Fragment>
    );
}