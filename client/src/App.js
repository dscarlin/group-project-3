import React, {Component} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import HideAppBar from "./components/HideAppBar";
import Login from "./views/Login";
import Landing from "./views/Landing";
import Apply from "./views/Apply";
// import ListAndDetailContainer from "./views/ListAndDetailContainer";
import "./App.css";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Router>
                    <HideAppBar />
                    <Route exact path="/" component={ Landing } />   
                    <Route exact path="/login" component={ Login}/>   
                    <Route exact path="/Apply" component={ Apply}/>
                    {/* <Route exact path="/list-view" component={ ListAndDetailContainer }/> */}
                       
                </Router>
            </React.Fragment>
        );
    }
}
export default App;
