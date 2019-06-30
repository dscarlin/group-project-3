import React from "react";
import Button from "@material-ui/core/button";
import { makeStyles } from "@material-ui/core/styles";
import style from "./style.module.css";
import { NavLink } from "react-router-dom";


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    }
}));
export default function Landing(props) {
    const classes = useStyles();
    console.log("Landing");
    return(
        <React.Fragment>
            <h1>&nbsp;</h1>
            <h1>Landing Page</h1>
            <Button variant="contained" className={`${classes.button} `} >
                <NavLink to="/application" exact={true} className={`${style.inherit}`}>
                Apply
                </NavLink>
            </Button>
            <Button variant="contained" className={`${classes.button} `} >
                <NavLink to="/login" exact={true} className={`${style.inherit}`}>
                Find Applicants
                </NavLink>
            </Button>
        </React.Fragment>
    );
}