import React, { Component } from "react";
import ApplicationForm from "../../components/ApplicationForm";
import AppliedMessage from "../../components/AppliedMessage";


class Apply extends Component {
    state = {
        applied: false
    };
    setViewState = value => this.setState(value);
    render(){
        return(
            <React.Fragment>
                <h1>&nbsp;</h1>
                {this.state.applied? 
                <AppliedMessage/>
                :
                <ApplicationForm setViewState={this.setViewState}/>
                }
            </React.Fragment>
        );
    }
}
export default Apply;
