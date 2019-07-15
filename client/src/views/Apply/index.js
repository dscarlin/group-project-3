import React, { Component } from "react";
import ApplicationForm from "../../components/ApplicationForm";
import AppliedMessage from "../../components/AppliedMessage";

const style = {
    backgroundImage: "url('http://themomnerd.com/wp-content/uploads/unbelievable-modern-restaurant-design-you-have-to-check-out-6-concept-ideas.jpg')",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    minHeight: "100vh"
}

class Apply extends Component {
    state = {
        applied: false
    };
    setViewState = value => this.setState(value);
    render(){
        return(
            <React.Fragment>
                <div style={style}>
                <h1>&nbsp;</h1>
                {this.state.applied? 
                <AppliedMessage/>
                :
                <ApplicationForm setViewState={this.setViewState}/>
                }
                </div>
            </React.Fragment>
        );
    }
}
export default Apply;
