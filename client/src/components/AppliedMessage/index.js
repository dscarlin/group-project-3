import React, { Fragment } from "react";
import { withRouter } from "react-router-dom"
import { Button } from "@material-ui/core";

export default withRouter((props) => {
    function returnToHome() {
        props.history.push("/")
    }
    return (
        <Fragment>
            <h1>Thanks for applying!</h1>
            <Button onClick={returnToHome}>Return to Homepage</Button>
        </Fragment>
    )
});