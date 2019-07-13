import React, {Component} from "react";
import axios from "axios";
import auth0Client from "./auth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import HideAppBar from "./components/HideAppBar";
import Landing from "./views/Landing";
import Apply from "./views/Apply";
import Dashboard from "./views/Dashboard";
import ListAndDetailContainer from "./views/ListAndDetailContainer";
import SimpleModal from "./components/Modal";
import LoginLoading from './components/LoginLoading';
import SecuredRoute from './components/SecuredRoute';
import EmployerSignupForm from './components/EmployerSignupForm';

import "./App.css";


class App extends Component {
    state = {
            modalOpen: false,
            userInfo: null,
            searchResult: [],
            SelectedApplicant: 0,
            popperAnchorEl: null
    };
    async componentDidMount() {
        // auth0Client.getTokenId();
        // await auth0Client.handleAuthentication();
        // let email = auth0Client.getProfile().email;
        // console.log(auth0Client.getIdToken());
        // const response = await axios.get(`/api/employer?email=${email}`, {
        //     headers: { "Authorization": `Bearer ${auth0Client.getIdToken()}` }
        // });
        // const userInfo = response.data;          
        // console.log(userInfo);
        // if (userInfo)
        //     // ///////////////////////////////////////////////////// //
        //     //  axios call to toggle to remove user for dev purposes//
        //     // //////////////////////////////////////////////////// //
        //     // const deletedUser = await axios.delete(`/api/employer/${userInfo.data._id}`,{
        //     //     headers: { "Authorization": `Bearer ${auth0Client.getIdToken()}` }
        //     // });
        //     // console.log(deletedUser);
        //     this.props.setAppState({userInfo});
        
    }

    appState = (arg) => {
        this.setState(arg)
    };
    messageApplicant = async applicant => {
        var employer = this.state.userInfo;
        employer.messaged.push(applicant._id)
        if(employer.interested.indexOf(applicant._id) < 0)
            employer.interested.push(applicant._id)
        const message = `Hey ${applicant.name}, ${employer.businessName} would like you ` +
            `to contact them to schedule an interview. Their phone number is ${employer.phone} and their` +
            `address is: ${employer.streetAddress} ${employer.city}, ${employer.state} ${employer.zipcode}.`
        const payload = { message, phoneNumber: applicant.phone }
        const result = await axios.post(`/api/applicant/${applicant._id}`,payload,{
            headers: { "Authorization": `Bearer ${auth0Client.getIdToken()}` }
        });
        console.log(result);
    };  
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Router>
                    <HideAppBar />
                    <Switch>
                        <Route exact path="/" component={ Landing } />
                        <Route  exact path="/Apply" component={ Apply}/>
                        <Route path="/login" render={props => 
                            <LoginLoading setAppState={this.appState} {...props} />} />
                        <SecuredRoute path="/signup" component={ props =>  
                            <EmployerSignupForm setAppState={this.appState}  {...props} />} />
                        <SecuredRoute path="/dashboard" component={(props) =>   
                            <Dashboard {...props} setAppState={this.appState} messageApplicant={this.messageApplicant} appState={this.state} />} />
                        <SecuredRoute path="/list-view" component={(props) =>  
                            <ListAndDetailContainer {...props} setAppState={this.appState} messageApplicant={this.messageApplicant} appState={this.state} />} />
                        <SecuredRoute path="/list-view/saved" component={(props) =>  
                            <ListAndDetailContainer {...props} setAppState={this.appState} appState={this.state} />} /> 
                        {/* need to make a no-match component  to go in this route */}
                        <Route component={ Landing }/> 
                    </Switch>
                </Router>
                <SimpleModal component={EmployerSignupForm} passedProps={{noShadow: true}} open={this.state.modalOpen} appState={this.appState} togglOpen={this.toggleModal}/>
            </React.Fragment>
        );
    }
}
export default App;
