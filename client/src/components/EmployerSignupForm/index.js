import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Button, Select, FormHelperText, FormControl, MenuItem, InputLabel, Input  } from "@material-ui/core";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
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
    },
    visible: {
        display: "block",
        color: "#f44336"
    },
    invisible: {
        display: "none"
    },
    red: {
        color: "#f44336!important",
    },
    redBorder: {
        borderColor: "#f44336",
        '&:after': {
            transform: "scale(1)",
            borderBottomColor: "#f44336"
        }
    },
});

const states = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 
'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'MA',   
'MD','ME', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 
'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 
'TN', 'TX', 'UT', 'VT', 'VA', 'VI', 'WA', 'WI', 'WV', 'WY' ];


class EmployerSignupForm extends Component {
    state = {
        stateError: false,
        zipError: false,
        zipFormatError: false,
        extraValidationPass: true,
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
    extraValidation = () => {
        if(!this.state.zipcode)
            this.setState({zipError: true, extraValidationPass: false})
        else
            this.setState({zipError: false, extraValidationPass: true})
        if(this.state.zipcode && !this.state.zipcode.match(/^[0-9]{5}(?:-[0-9]{4})?$/))
            this.setState({zipFormatError: true, extraValidationPass: false})
        else    
            this.setState({zipFormatError: false, extraValidationPass: true})
        if(!this.state.state)
            this.setState({stateError: true, extraValidationPass: false})
        else
            this.setState({stateError: false, extraValidationPass: true})

    }
    handleSubmit = e => {
        if(!this.state.extraValidationPass)
        return window.scrollTop();
        e.preventDefault();
        const {stateError, zipError, zipFormatError, extraValidationPass, ...user} = this.state;
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
            <ValidatorForm
                className={classes.form + (this.noShadow ? '' : ` ${classes.shadow}`)}
                ref="form"
                onSubmit={this.handleSubmit} 
                onError={errors => this.handleError(errors)}
                instantValidate={false}
                >
            {console.log(this.props)}

                <h1>Account Information:</h1>
                <TextValidator
                    className={`${classes.formControl}`}
                    label="Business Name"
                    onChange={this.handleChange}
                    name="businessName"
                    value={this.state.businessName}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    />
                <TextValidator
                    className={`${classes.formControl}`}
                    label="Business Phone Number"
                    onChange={this.handleChange}
                    name="phone"
                    value={this.state.phone}
                    validators={['required', 'minStringLength:13',]}
                    errorMessages={['this field is required', 'Phone Number Must Be 10 Digits']}
                    />
                <TextValidator
                    className={`${classes.formControl}`}
                    label="Email address"
                    onChange={this.handleChange}
                    name="email"
                    value={this.state.email}
                    validators={['required','isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                    />
                    <FormHelperText id="email-helper-text">This email is used to track your account and must match the login email. We'll never share your email.</FormHelperText>
                &nbsp;
                <hr/>
                <TextValidator
                    className={`${classes.formControl}`}
                    label="Street Address"
                    onChange={this.handleChange}
                    name="streetAddress"
                    value={this.state.streetAddress}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    />
                <TextValidator
                    className={`${classes.formControl}`}
                    label="City"
                    onChange={this.handleChange}
                    name="city"
                    value={this.state.city}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    />
                <FormControl className={classes.formControl}>
                    <InputLabel className={this.state.stateError? `${classes.red}`: ''} htmlFor="state">State</InputLabel>
                    <Select
                    value={this.state.state}
                    className={this.state.stateError? `${classes.redBorder}`: ''}
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
                    <FormHelperText className={this.state.stateError? `${classes.red} ${classes.visible}` : classes.invisible}>this field is required </FormHelperText>
                </FormControl>
                <FormControl className={`${classes.formControl}`}>
                    <InputLabel className={this.state.zipError || this.state.zipFormatError? `${classes.red}`: ''} htmlFor="zipcode">Zipcode</InputLabel>
                    <Input className={this.state.zipError || this.state.zipFormatError? `${classes.redBorder}`: ''} id="zipcode" name="zipcode" onChange={this.handleChange} value={this.state.zipcode}/>
                    <FormHelperText className={this.state.zipError? `${classes.red} ${classes.visible}` : classes.invisible}>this field is required </FormHelperText>    
                    <FormHelperText className={this.state.zipFormatError? `${classes.red} ${classes.visible}` : classes.invisible}>zip code invalid </FormHelperText>    
                </FormControl>
                
                <Button type="submit" onClick={this.extraValidation} className={`${classes.white} ${classes.button}`} >Submit</Button>
            </ValidatorForm>
    
        );
    };
}
export default withRouter(withStyles(styles)(EmployerSignupForm));