import React, { Component } from "react";
import Button from "@material-ui/core/button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    }
}));


class Login extends Component {
    state = {
    };
    handleSubmit = () => {
        console.log(this.props)
        this.props.login();
        this.props.history.push("/list-view");
    };
    render(){
        const classes = () => useStyles();
        console.log(this.props);
        
        return(
            <React.Fragment>
            {/* {this.state.array.map(() => (<p>item</p>) ) /*here temporarily to show hiding feature of appbar on scrolling*/ } */}
            <h1>&nbsp;</h1>
            <h1>Login Page</h1>
            <Button variant="contained" className={`${classes.button}`} onClick={this.handleSubmit} >
            Login
            </Button>
            </React.Fragment>
        );
    };
};
export default Login;