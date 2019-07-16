import React, {Component} from "react";
import axios from "axios";
import auth0Client from "./auth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import HideAppBar from "./components/HideAppBar";
import Landing from "./views/Landing";
import Apply from "./views/Apply";
import Dashboard from "./views/Dashboard";
import SimpleModal from "./components/Modal";
import LoginLoading from './components/LoginLoading';
import SecuredRoute from './components/SecuredRoute';
import EmployerSignupForm from './components/EmployerSignupForm';
import NoMatch from "./components/NoMatch";

import "./App.css";


class App extends Component {
    state = {
            modalOpen: false,
            userInfo: null,
            searchResult: [],
            savedResult: [],
            messagedResult: [],
            SelectedApplicant: 0,
            popperAnchorEl: null,
            displayToggle: 0
    };
    async componentDidMount() {
    };
    getSavedAndMessaged = async () => {
        let id = this.state.userInfo._id
        let messaged = this.state.userInfo.messaged.join();
        let saved = this.state.userInfo.interested.join();
        const result = await axios.get(`/api/employer/${id}?s=${saved}&m=${messaged}`, {
            headers: { "Authorization": `Bearer ${auth0Client.getIdToken()}` }
        });
        console.log(result)
        for (let key in result.data) {
            result.data[key] = result.data[key].filter(applicant =>
                this.state.userInfo.notInterested.indexOf(applicant._id) < 0);
        }
        this.setState(result.data);
    };
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
        this.setState({userInfo: employer})
        this.getSavedAndMessaged()
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
                            <LoginLoading setAppState={this.appState} getSavedAndMessaged={this.getSavedAndMessaged} {...props} />} />
                        <SecuredRoute path="/signup" component={ props =>  
                            <EmployerSignupForm setAppState={this.appState}  {...props} />} />
                        <SecuredRoute path="/dashboard" component={(props) =>   
                            <Dashboard {...props} setAppState={this.appState} getSavedAndMessaged={this.getSavedAndMessaged} messageApplicant={this.messageApplicant} appState={this.state} />} />
                        {/* need to make a no-match component  to go in this route */}
                        <Route component={ Landing }/>
                        {/* <Route component={NoMatch}/>  */}
                    </Switch>
                </Router>
                <SimpleModal component={EmployerSignupForm} passedProps={{noShadow: true}} open={this.state.modalOpen} appState={this.appState} togglOpen={this.toggleModal}/>
            </React.Fragment>
        );
    }
}
export default App;
