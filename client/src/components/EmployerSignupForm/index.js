import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Button, Select, FormHelperText, FormControl, MenuItem, InputLabel, Input  } from "@material-ui/core";
import auth0Client from "../../auth";
import axios from "axios";



const styles = () => ({
    form: {
        margin: "2em auto",
        // width: "fit-conteant",
        maxWidth: "90vw",
        minWidth: "30vw",
        
        padding: "2em"
    },
    shadow: {
        boxShadow: "5px 5px 20px 5px grey",
        marginTop: "10vh",
        width: "40vw"
    },
    formControl: {
        width: "100%"
    },
    button: {
        display: "block",
        margin: "2em auto"        
    }
});

const states = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 
'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'MA',   
'MD','ME', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 
'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 
'TN', 'TX', 'UT', 'VT', 'VA', 'VI', 'WA', 'WI', 'WV', 'WY' ];


class EmployerSignupForm extends Component {
    state = {
        businessName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipcode: "",
        email: "",
        phone: ""
    };
    handleChange = event => {
        let { name, value } = event.target;
        if (name === "phone"){
            let phoneNumber = value
            phoneNumber = phoneNumber.split('').filter(char => char.match(/[0-9]/g));
            if (phoneNumber.length > 9){
                phoneNumber.splice(0,0,'(');
                phoneNumber.splice(4,0,')');
                phoneNumber.splice(5,0,' ');
                phoneNumber.splice(9,0,'-');
            };
            phoneNumber = phoneNumber.join('').slice(0,14);
            this.setState({phone: phoneNumber});
        }
        else
            this.setState({ [name]: value });
    };
    handleSubmit = e => {
        e.preventDefault();
        const user = this.state;
        console.log(user);
        axios.post(`/api/employer`, user, {
            headers: { "Authorization": `Bearer ${auth0Client.getIdToken()}` }
        })
        .then(res => {
            this.setState({  
                businessName: "",
                streetAddress: "",
                city: "",
                state: "",
                zipcode: "",
                email: "",
                phone: "",
                
            });
            const userInfo = res.data
            this.props.setAppState({userInfo});
            this.props.history.push("/dashboard");
        });
    };
    noShadow = this.props.hasOwnProperty("passedProps") ? this.props.passedProps.noShadow : null
    render() {
        const { classes } = this.props;
        return (
            <form className={classes.form + (this.noShadow ? '' : ` ${classes.shadow}`)}>
            {console.log(this.props)}

                <h1>Account Information:</h1>
                <FormControl className={`${classes.formControl}`}>
                    <InputLabel  htmlFor="businessName">Business Name</InputLabel>
                    <Input id="businessName" name="businessName" onChange={this.handleChange} value={this.state.businessName}/>
                </FormControl>
                <FormControl className={`${classes.formControl}`}>
                    <InputLabel htmlFor="phone">Phone Number</InputLabel>
                    <Input id="phone" name="phone" onChange={this.handleChange} value={this.state.phone}/>
                </FormControl>
                <FormControl className={`${classes.formControl}`}>
                    <InputLabel htmlFor="email">Email address</InputLabel>
                    <Input value={this.state.email} onChange={this.handleChange} name="email" id="email" aria-describedby="email-helper-text" />
                    <FormHelperText id="email-helper-text">We'll never share your email.</FormHelperText>
                </FormControl>
                &nbsp;
                <hr/>
                <FormControl className={`${classes.formControl}`}>
                    <InputLabel htmlFor="streetAddress">StreetAddress</InputLabel>
                    <Input id="streetAddress" name="streetAddress" onChange={this.handleChange} value={this.state.streetAddress}/>
                </FormControl>
                <FormControl className={`${classes.formControl}`}>
                    <InputLabel htmlFor="city">City</InputLabel>
                    <Input id="city" name="city" onChange={this.handleChange} value={this.state.city}/>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="state">State</InputLabel>
                    <Select
                    value={this.state.state}
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'state',
                        id: 'state',
                    }}
                    >
                    {states.map(state => 
                    <MenuItem value={state} key={state}>{state}</MenuItem>
                    )}
                    </Select>
                </FormControl>
                <FormControl className={`${classes.formControl}`}>
                    <InputLabel htmlFor="zipcode">Zipcode</InputLabel>
                    <Input id="zipcode" name="zipcode" onChange={this.handleChange} value={this.state.zipcode}/>
                </FormControl>
                
                <Button onClick={this.handleSubmit} className={`${classes.white} ${classes.button}`} >Submit</Button>
            </form>
    
        );
    };
}
export default withRouter(withStyles(styles)(EmployerSignupForm));