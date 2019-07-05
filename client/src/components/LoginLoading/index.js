import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import auth0Client from "../../auth";
import axios from "axios";

class LoginLoading extends Component {
    async componentDidMount() {
        await auth0Client.handleAuthentication();
        console.log(auth0Client.getIdToken());
        console.log(auth0Client.getProfile());
        let email = auth0Client.getProfile().email;
        const userInfo = await axios.get(`/api/employer/${email}`, {
            headers: { "Authorization": `Bearer ${auth0Client.getIdToken()}` }
        });
        console.log(userInfo);
        userInfo && this.props.appState({userInfo}) &&
        this.props.history.replace("/list-view") ||
        this.props.appState({ modalOpen: true });
    }


    render() {
        return (
            <p>Loading profile...</p>
        );
    }
}

export default withRouter(LoginLoading);