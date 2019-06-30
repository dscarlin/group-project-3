import React from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import Popper from "../Popper";
import style from "./style.module.css";


function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.node.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    window: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default withRouter(function HideAppBar(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <Popper/>
                        <Typography variant="h6" className={classes.title}>
                            <NavLink to="/" exact={true} className={`${style.inheritLink}`}>
                            On The Fly Staffing
                            </NavLink>
                        </Typography>
                        <Typography variant="h6">
                            <NavLink to="/login" exact={true}  className={`${style.inheritLink}`} color="inherit">Login</NavLink>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            {/* <Toolbar /> */}
        </React.Fragment>
    );
});