import React from "react";
import { Container, Tabs, Tab } from "@material-ui/core";
import { Search, Star, Message } from "@material-ui/icons";


  
export default (props) => {      
    
    const classes = props.useStyles();

    return (
        <Container className={classes.searchToggle}>

            <Tabs
                className={classes.searchToggle}
                variant="fullWidth"
                indicatorColor="red"
                centered
            >
                <Tab icon={<Star style={{color: "white"}}/>} label="View Saved" style={{color: "white"}} />
                <Tab icon={<Search style={{color: "white"}}/>} label="View Results" style={{color: "white"}} />
                <Tab icon={<Message style={{color: "white"}}/>} label="View Messaged" style={{color: "white"}} />
            </Tabs>

        </Container>
    );
};