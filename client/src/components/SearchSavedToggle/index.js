import React from "react";
import { Tabs, Tab, Paper } from "@material-ui/core";
import { Search, Star, Message } from "@material-ui/icons";


  
export default (props) => {      
    
    const classes = props.useStyles();
    const value = props.appState.displayToggle;

    function handleChange(event, newValue) {
        
        props.setAppState({displayToggle: newValue});
        console.log("value: " + newValue);
    }

    return (
        <Paper className={classes.searchToggle} align="center">

            <Tabs
                value={value}
                className={classes.searchToggle}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab icon={<Star style={{color: "primary"}}/>} label="View Saved"  />
                <Tab icon={<Search style={{color: "primary"}}/>} label="View Results"  />
                <Tab icon={<Message style={{color: "primary"}}/>} label="View Messaged"  />
            </Tabs>

        </Paper>
    );
};