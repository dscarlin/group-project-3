import React, {Component} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import HideAppBar from "./components/HideAppBar";
import Login from "./views/Login";
import Landing from "./views/Landing";
import Apply from "./views/Apply";
import ListAndDetailContainer from "./views/ListAndDetailContainer";
// import Profile from "./components/Profile";
import "./App.css";

class App extends Component {

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Router>
                    <HideAppBar />
                    <Route 
                        exact path="/" 
                        component={ Landing } 
                    />
                    {/* <Switch>
                        <Route path="/" exact />
                        <Route path="/profile" component={Profile} />
                    </Switch>    */}
                    {/* <Route
                        exact path="/login"
                        render={ props => 
                            <Login
                            login={this.login}
                            {...props} 
                            />
                        }
                    />    */}
                    <Route exact path="/Apply" component={ Apply}/>
                    <Route exact path="/list-view" component={ ListAndDetailContainer }/>
                </Router>
            </React.Fragment>
        );
    };
};
export default App;
