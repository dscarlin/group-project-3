import React from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography, useScrollTrigger, Slide } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchForm from "../SearchForm";
import style from "./style.module.css";
import { useAuth0 } from "../../react-auth0-wrapper";


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
        width: "fit-content"
    },
    centerBar: {
        flexGrow: 1,
        alignContent: "center"
    }
}));

export default withRouter(function HideAppBar(props) {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    console.log("user: ", user);
    const classes = useStyles();
    return (
        <React.Fragment>
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>
                        {/* <Popper/> */}
                        <Typography variant="h6" className={classes.title}>
                            {isAuthenticated ? 
                                <NavLink to="/list-view" exact={true} className={`${style.inheritLink}`}>On The Fly Staffing</NavLink>
                                :
                                <NavLink to="/" exact={true} className={`${style.inheritLink}`}>On The Fly Staffing</NavLink>
                            }
                        </Typography>
                        <div className={classes.centerBar}>
                            {isAuthenticated ? 
                                <SearchForm />
                                :
                                null
                            }
                        </div>
                        <Typography variant="h6" className={classes.linkRight}>
                            {isAuthenticated ? 
                                <button  className={`${style.inheritLink}`} onClick={() => logout()} color="inherit">Log Out</button>
                                :         
                                <button  className={`${style.inheritLink}`} onClick={() => loginWithRedirect({})} color="inherit">Login</button>
                            }
                        </Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            {/* <Toolbar /> */}
        </React.Fragment>
    );
});