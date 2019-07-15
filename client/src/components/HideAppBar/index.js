import React from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography, useScrollTrigger, Slide } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import style from "./style.module.css";
import auth0Client from "../../auth";
import logo from "../../assets/onthefly2-S.png";

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
        width: "fit-content",
    },
    centerBar: {
        flexGrow: 1,
        alignContent: "center"
    },

}));

export default withRouter(function HideAppBar(props) {
    const classes = useStyles();
    const signOut = () => {
        auth0Client.signOut();
        props.history.replace("/");
    };
    return (          
        <React.Fragment>
            {console.log(auth0Client)}
            {/* {console.log(auth0Client.isAuthenticated())}  {console.log(auth0Client.handleAuthentication())} */}
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>
                        
                        {/* <Popper/> */}
                        <Typography variant="h6" className={`${classes.title} ${classes.root}`}>
                            {auth0Client.isAuthenticated() ?
                                <NavLink to="/dashboard" exact={true} className={`${style.inheritLink}`}><img src={logo} alt="Logo" width="200px" ></img></NavLink>
                                :
                                <NavLink to="/" exact={true} className={`${style.inheritLink}`}><img src={logo} alt="Logo" width="200px" ></img></NavLink>
                            }
                        </Typography>
                        
                        {/* <div className={classes.centerBar}>
                            {auth0Client.isAuthenticated() && props.location.pathname != "/signup" ? 
                                <SearchForm />
                                :
                                null
                            }
                        </div> */}
                        <Typography variant="h6" className={classes.linkRight}>
                            {console.log(props.location.pathname)}
                            {auth0Client.isAuthenticated() ? 
                                <button  className={`${style.inheritLink}`} onClick={() => signOut()} color="inherit">Log Out</button>
                                :         
                                <button  className={`${style.inheritLink}`} onClick={auth0Client.signIn} color="inherit">Login</button>
                            }
                        </Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            {/* <Toolbar /> */}
        </React.Fragment>
    );
});