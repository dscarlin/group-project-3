import React, {Component} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import HideAppBar from "./components/HideAppBar";
import Landing from "./views/Landing";
import Apply from "./views/Apply";
import ListAndDetailContainer from "./views/ListAndDetailContainer";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
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
                    {/* { <Switch>
                        <Route path="/" exact />
                        <PrivateRoute path="/profile" component={Profile} />
                    </Switch>    } */}
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
                    {/* Need solution for rendering list item based on whether user wants saved or search */}
                    {/* Initial idea is to first render saved on Login, and searched on click of search button */}
                    <Route exact path="/list-view" component={ ListAndDetailContainer }/>
                    <Route exact path="/list-view/saved" component={ ListAndDetailContainer }/>
                </Router>
            </React.Fragment>
        );
    };
};
export default App;
