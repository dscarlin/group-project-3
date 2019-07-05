import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import auth0Client from "../../auth";
import axios from "axios";

class LoginLoading extends Component {
    async componentDidMount() {
        await auth0Client.handleAuthentication();
        let email = auth0Client.getProfile().email;
        const userInfo = await axios.get(`/api/employer?email=${email}`, {
            headers: { "Authorization": `Bearer ${auth0Client.getIdToken()}` }
        });
        console.log(userInfo);
        console.log(auth0Client.getIdToken());
        if (userInfo.data){
            // ///////////////////////////////////////////////////// //
            //  axios call to toggle to remove user for dev purposes//
            // //////////////////////////////////////////////////// //
            // const deletedUser = await axios.delete(`/api/employer/${userInfo.data._id}`,{
            //     headers: { "Authorization": `Bearer ${auth0Client.getIdToken()}` }
            // });
            // console.log(deletedUser);
            this.props.appState({userInfo});
            this.props.history.replace("/dashboard");
        }
        else
            this.props.history.replace("/signup");
    }
    render() {
        return (
            <p>Loading profile...</p>
        );
    }
}

export default withRouter(LoginLoading);