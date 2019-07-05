import React, {Component} from "react";
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
            searchResult: []
    };

    appState = (arg) => {
        this.setState(arg)
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
                            <LoginLoading appState={this.appState} {...props} />} />
                        <SecuredRoute path="/signup" component={ props =>  
                            <EmployerSignupForm appState={this.appState} {...props} />} />
                        <SecuredRoute path="/dashboard" component={(props) =>  
                            <Dashboard {...props} appState={this.appState} />} />
                        <SecuredRoute path="/list-view" component={(props) =>  
                            <ListAndDetailContainer {...props} appState={this.appState} results={this.state.searchResult} />} />
                        <SecuredRoute path="/list-view/saved" component={(props) =>  
                            <ListAndDetailContainer {...props} appState={this.appState} results={this.state.searchResult} />} /> */}
                        {/* need to make a no-match component  to go in this route */}
                        <Route component={ Landing }/> 
                    </Switch>
                </Router>
                <SimpleModal open={this.state.modalOpen} appState={this.appState} togglOpen={this.toggleModal}/>
            </React.Fragment>
        );
    }
}
export default App;
