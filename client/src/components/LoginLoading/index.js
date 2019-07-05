import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import auth0Client from "../../auth";

class LoginLoading extends Component {
    async componentDidMount() {
        await auth0Client.handleAuthentication();
        console.log(auth0Client.getIdToken());
        console.log(auth0Client);

        // this.props.history.replace("/list-view");
    }

    render() {
        return (
            <p>Loading profile...</p>
        );
    }
}

export default withRouter(LoginLoading);