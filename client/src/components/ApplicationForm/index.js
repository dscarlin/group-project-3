import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button, Checkbox, Select, ListItemText, 
    FormControl, FormHelperText, MenuItem, InputLabel, Input  } from "@material-ui/core";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import axios from "axios";
import ApplicationPopper from "../ApplicationPopper";


const styles = () => ({
    form: {
        background: "#fffffff8",
        margin: "8em auto",
        width: "760px",
        maxWidth: "90vw",
        minWidth: "50vw",
        boxShadow: "5px 5px 20px 5px grey",
        padding: "2em"
    },
    //form elements full width
    formControl: {
        width: "100%",
        marginBottom: ".4em"
    },
    //center submit button
    button: {
        display: "block",
        margin: "2em auto"        
    },
    //display error text
    visible: {
        display: "block",
        color: "#f44336"
    },
    // hide error text
    invisible: {
        display: "none"
    },
    //error text
    red: {
        color: "#f44336!important",
    },
    //error underline
    redBorder: {
        borderColor: "#f44336",
        '&:after': {
            transform: "scale(1)",
            borderBottomColor: "#f44336"
        }
    },
    auto: {
        width: "fit-content",
        margin: "auto"
    }

});
// multi select styling props
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: "auto",
        },
    }
}; 
const positionOptions = [
    "Server",
    "Bar Tender",
    "Busser",
    "FOH Manager",
    "BOH Manager",
    "Line Cook",
    "Dishwasher",
    "Prep Cook"
];
const workedPositionOptions = [
    "Server",
    "Bar Tender",
    "Busser",
    "FOH Manager",
    "BOH Manager",
    "Line Cook",
    "Dishwasher",
    "Prep Cook",
    "Other"
];
const availabilityOptions = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Late Night"
];

class ApplicationForm extends Component {
    state = {
        //validation state
        positionError: false,
        experienceError: false,
        months1Error: false,
        months2Error: false,
        months3Error: false,
        anchorEl: null,
        extraValidationPass: false,
        //form data state
        selectedPositions: [],
        availability: [],
        name: "",
        email: "",
        phone: "",
        industryExperience: "",
        restaurantName1: "",
        positionsWorked1: [],
        whMonths1: "",
        whDetails1: "",
        restaurantName2: "",
        positionsWorked2: [],
        whMonths2: "",
        whDetails2: "",
        restaurantName3: "",
        positionsWorked3: [],
        whMonths3: "",
        whDetails3: "",
        coverLetter: ""
    };
    setApplState = value => this.setState(value);
    togglePopper = event => {
        this.setState({anchorEl: this.state.anchorEl ? null : this.refs.submitButton});
    };
    formatPhoneNumber = string => {
        let phoneNumber = string;
            phoneNumber = phoneNumber.split('').filter(char => char.match(/[0-9]/g));
            if (phoneNumber.length > 9){
                phoneNumber.splice(0,0,'(');
                phoneNumber.splice(4,0,')');
                phoneNumber.splice(5,0,' ');
                phoneNumber.splice(9,0,'-');
            }
            return phoneNumber.join('').slice(0,14);
    };
    // change input values for selected input element
    handleChange = event => {
        let { name, value } = event.target;
        if (name === "phone")
            value = this.formatPhoneNumber(value);
        this.setState({ [name]: value });
    };
    // initial submit runs validation checks
    // if they pass, then the popper opens with 
    // secondary final submit button
    handleSubmit = e => {
        if(!this.state.extraValidationPass)
            return window.scrollTo(0,0);
        e.preventDefault();
        this.togglePopper(e);
    };
    // errors from npm validaton will trigger
    // this function 
    handleError = errors => {
        window.scrollTo(0,0);
        console.log(errors);
    };
    // custom validators not provided by npm
    // validation package
    runExtraValidators = () => {
        // selected position required
        if (!this.state.selectedPositions.length)
            this.setState({positionError: true, extraValidationPass: false});
        else
            this.setState({positionError: false, extraValidationPass: true});
        // must be positive
        if(this.state.industryExperience && this.state.industryExperience < 0)
            this.setState({experienceError: true, extraValidationPass: false});
        else
            this.setState({experienceError: false, extraValidationPass: true});
        // must be positive
        if(this.state.whMonths1 && this.state.whMonths1 < 0)
            this.setState({months1Error: true, extraValidationPass: false});
        else    
            this.setState({months1Error: false, extraValidationPass: true});
        // must be positive
        if(this.state.whMonths2 && this.state.whMonths2 < 0)
            this.setState({months2Error: true, extraValidationPass: false});
        else
            this.setState({months2Error: false, extraValidationPass: true});
        // must be positive
        if(this.state.whMonths3 && this.state.whMonths3 < 0)
            this.setState({months3Error: true, extraValidationPass: false});
        else
            this.setState({months3Error: false, extraValidationPass: true}); 
    }
    finalSubmit = e => {
        e.preventDefault();
        //separate validation and form data vars
        const {anchorEl, positionError, experienceError, months1Error,
            months2Error, months3Error, extraValidationPass, ...payload} = this.state;
        //change blank number inputs from string to number for backend validation pass
        payload.industryExperience = this.state.industryExperience || 0  
        payload.whMonths1 = this.state.whMonths1 || 0  
        payload.whMonths2 = this.state.whMonths2 || 0  
        payload.whMonths3 = this.state.whMonths3 || 0  
        //post form data
        console.log(payload)
        axios.post("/api/applicant",payload).then(response => {
            console.log(response)
            if(response.status === 200){
                //clear form state
                this.setState({name: "", email: "", phone: "", selectedPositions: [], availability: [], 
                    restaurantName1: "", positionsWorked1: [], whMonths1:"", whDetails1: "", 
                    restaurantName2: "", positionsWorked2: [], whMonths2:"", whDetails2: "", 
                    restaurantName3: "", positionsWorked3: [], whMonths3:"", whDetails3: "", 
                    coverLetter: ""});
                this.props.setViewState({applied: true})
            }
        });
    };
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <ValidatorForm
                className={classes.form}
                ref="form"
                onSubmit={this.handleSubmit} 
                onError={errors => this.handleError(errors)}
                instantValidate={false}
                >
                    <h1 className={classes.auto}>Apply On-the-Fly</h1>
                    <h3>Applicant Details:</h3>
                    <small>required *</small>
                    <TextValidator
                    className={`${classes.formControl}`}
                    label="Full Name *"
                    onChange={this.handleChange}
                    name="name"
                    value={this.state.name}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    />
                    <TextValidator
                    className={`${classes.formControl}`}
                    label="Email"
                    onChange={this.handleChange}
                    name="email"
                    value={this.state.email}
                    validators={[ 'isEmail']}
                    errorMessages={[ 'email is not valid']}
                    />
                    <TextValidator
                    className={`${classes.formControl}`}
                    label="Phone Number *"
                    onChange={this.handleChange}
                    name="phone"
                    value={this.state.phone}
                    validators={['required' ,'minStringLength:13']}
                    errorMessages={[ 'this field is required','phone number must be 10 digits']}
                    />
                    <FormControl className={ `${classes.formControl}`} >
                        <InputLabel  className={this.state.positionError? `${classes.red}`: ''} htmlFor="select-multiple-checkbox">Position Applying For *</InputLabel>
                        <Select
                            multiple
                            className={this.state.positionError? `${classes.redBorder}`: ''}
                            value={this.state.selectedPositions}
                            onChange={this.handleChange}
                            name="selectedPositions"
                            input={<Input  id="select-multiple-checkbox" />}
                            renderValue={selected => selected.join(", ")}
                            MenuProps={MenuProps}
                            required
                        >
                            {positionOptions.map(name => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={this.state.selectedPositions.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText className={this.state.positionError? `${classes.red} ${classes.visible}` : classes.invisible}>this field is required </FormHelperText>
                    </FormControl>
                    <FormControl className={`${classes.formControl}`}>
                        <InputLabel  htmlFor="select-multiple-checkbox">Availability</InputLabel>
                        <Select
                            multiple
                            value={this.state.availability}
                            onChange={this.handleChange}
                            name="availability"
                            input={<Input className={classes.white} id="select-multiple-checkbox" />}
                            renderValue={selected => selected.join(", ")}
                            MenuProps={MenuProps}
                        >
                            {availabilityOptions.map(name => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={this.state.availability.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={`${classes.formControl}`}>
                        <InputLabel className={this.state.experienceError? `${classes.red}`: ''} htmlFor="industryExperience">Years of Industry Experience</InputLabel>
                        <Input className={this.state.experienceError? `${classes.redBorder}`: ''}id="industryExperience" name="industryExperience" type="number" onChange={this.handleChange} value={this.state.industryExperience}/>
                        <FormHelperText className={this.state.experienceError? `${classes.red} ${classes.visible}` : classes.invisible}>this value must be positive</FormHelperText>
                    </FormControl>

                    <h3>Work History:</h3>
                    <h1>&#10112;</h1>
                    <FormControl className={`${classes.formControl}`}>
                        <InputLabel htmlFor="restaurantName1">Business Name</InputLabel>
                        <Input id="restaurantName1" name="restaurantName1" onChange={this.handleChange} value={this.state.restaurantName1}/>
                    </FormControl>
                    <FormControl className={` ${classes.formControl}`}>
                        <InputLabel  htmlFor="wh-position-1">Positions Worked</InputLabel>
                        <Select
                            multiple
                            value={this.state.positionsWorked1}
                            onChange={this.handleChange}
                            name="positionsWorked1"
                            input={<Input className={classes.white} id="wh-position-1" />}
                            renderValue={selected => selected.join(", ")}
                            MenuProps={MenuProps}
                        >
                            {workedPositionOptions.map(name => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={this.state.positionsWorked1.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={` ${classes.formControl}`} >
                        <InputLabel className={this.state.months1Error? `${classes.red}`: ''} htmlFor="wh-months-1">Months of Experience</InputLabel>
                        <Input className={this.state.months1Error? `${classes.redBorder}`: ''} id="wh-months-1" type="number" name="whMonths1" onChange={this.handleChange} value={this.state.whMonths1}/>
                        <FormHelperText className={this.state.months1Error? `${classes.red} ${classes.visible}` : classes.invisible}>this value must be positive</FormHelperText>
                    </FormControl>
                    <TextField className={classes.formControl} id="wh-details-1" multiline label="Details" name="whDetails1" onChange={this.handleChange} value={this.state.whDetails1}/>
                    &nbsp;
                    <h1>&#10113;</h1>
                    <FormControl className={`${classes.formControl}`}>
                        <InputLabel htmlFor="restaurantName2">Business Name</InputLabel>
                        <Input id="restaurantName2" name="restaurantName2" onChange={this.handleChange} value={this.state.restaurantName2}/>
                    </FormControl>
                    <FormControl className={` ${classes.formControl}`}>
                        <InputLabel  htmlFor="wh-position-2">Positions Worked</InputLabel>
                        <Select
                            multiple
                            value={this.state.positionsWorked2}
                            onChange={this.handleChange}
                            name="positionsWorked2"
                            input={<Input className={classes.white} id="wh-position-2" />}
                            renderValue={selected => selected.join(", ")}
                            MenuProps={MenuProps}
                        >
                            {positionOptions.map(name => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={this.state.positionsWorked2.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={` ${classes.formControl}`} >
                        <InputLabel className={this.state.months2Error? `${classes.red}`: ''} htmlFor="wh-months-2">Months of Experience</InputLabel>
                        <Input className={this.state.months2Error? `${classes.redBorder}`: ''} id="wh-months-2" type="number" name="whMonths2" onChange={this.handleChange} value={this.state.whMonths2}/>
                        <FormHelperText className={this.state.months2Error? `${classes.red} ${classes.visible}` : classes.invisible}>this value must be positive</FormHelperText>
                    </FormControl>
                    <TextField className={classes.formControl} id="wh-details-2" multiline label="Details" name="whDetails2" onChange={this.handleChange} value={this.state.whDetails2}/>
                    &nbsp;
                    <h1>&#10114;</h1>
                    <FormControl className={`${classes.formControl}`}>
                        <InputLabel htmlFor="restaurantName3">Business Name</InputLabel>
                        <Input id="restaurantName3" name="restaurantName3" onChange={this.handleChange} value={this.state.restaurantName3}/>
                    </FormControl>
                    <FormControl className={` ${classes.formControl}`}>
                        <InputLabel  htmlFor="wh-position-3">Positions Worked</InputLabel>
                        <Select
                            multiple
                            value={this.state.positionsWorked3}
                            onChange={this.handleChange}
                            name="positionsWorked3"
                            input={<Input className={classes.white} id="wh-position-3" />}
                            renderValue={selected => selected.join(", ")}
                            MenuProps={MenuProps}
                        >
                            {positionOptions.map(name => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={this.state.positionsWorked3.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={` ${classes.formControl}`} >
                        <InputLabel className={this.state.months3Error? `${classes.red}`: ''} htmlFor="wh-months-3">Months of Experience</InputLabel>
                        <Input className={this.state.months3Error? `${classes.redBorder}`: ''} id="wh-months-3" type="number" name="whMonths3" onChange={this.handleChange} value={this.state.whMonths3}/>
                        <FormHelperText className={this.state.months3Error? `${classes.red} ${classes.visible}` : classes.invisible}>this value must be positive</FormHelperText>
                    </FormControl>
                    <TextField className={classes.formControl} id="wh-details-3" multiline label="Details" name="whDetails3" onChange={this.handleChange} value={this.state.whDetails3}/>
                    &nbsp;      
                    <h3>Message To Employer:</h3>
                    <TextField className={classes.formControl} id="coverLetter" multiline label="CoverLetter" name="coverLetter" onChange={this.handleChange} value={this.state.coverLetter}/>
                    <Button onClick={this.runExtraValidators} ref="submitButton"  type="submit"   className={classes.button} >Apply</Button>
                    <ApplicationPopper  setApplState={this.setAppleState} applState={this.state} togglePopper={this.togglePopper} submit={this.finalSubmit}/>
                {/* </form> */}
                </ValidatorForm>
            </Fragment>
        );
    };
}
export default withStyles(styles)(ApplicationForm);