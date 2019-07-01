import React, {Component} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import HideAppBar from "./components/HideAppBar";
import Login from "./views/Login";
import Landing from "./views/Landing";
import Apply from "./views/Apply";
import ListAndDetailContainer from "./views/ListAndDetailContainer";
import "./App.css";

class App extends Component {
    state = {
        loggedIn: false
    }
    login = () => {
        this.setState({loggedIn: true})
    };
    logOut = () => {

        this.setState({loggedIn: false})
    };
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Router>
                    <HideAppBar 
                        loggedIn={this.state.loggedIn}
                        logOut={this.logOut}
                    />
                    <Route 
                        exact path="/" 
                        component={ Landing } 
                    />   
                    <Route
                        exact path="/login"
                        render={ props => 
                            <Login
                            login={this.login}
                            {...props} 
                            />
                        }
                    />   
                    <Route exact path="/Apply" component={ Apply}/>
                    <Route exact path="/list-view" component={ ListAndDetailContainer }/>
                </Router>
            </React.Fragment>
        );
    };
};
export default App;
