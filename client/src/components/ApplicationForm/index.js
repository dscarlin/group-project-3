import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button, Checkbox, Select, ListItemText, 
    FormControl, FormHelperText, MenuItem, InputLabel, Input  } from "@material-ui/core";
import { ValidatorForm, SelectValidator, TextValidator} from 'react-material-ui-form-validator';
import axios from "axios";
import ApplicationPopper from "../ApplicationPopper";


const styles = () => ({
    form: {
        background: "#fffffff8",
        margin: "8em auto 0",
        width: "fit-content",
        maxWidth: "90vw",
        minWidth: "50vw",
        boxShadow: "5px 5px 20px 5px grey",
        padding: "2em"
    },
    formControl: {
        width: "100%",
        marginBottom: ".4em"
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
    auto: {
        width: "fit-content",
        margin: "auto"
    }

});
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
    "Prep Cook",
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
        positionError: false,
        anchorEl: null,
        extraValidationPass: false,
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
    }
    handleChange = event => {
        let { name, value } = event.target;
        if (name === "phone"){
            let phoneNumber = value;
            phoneNumber = phoneNumber.split('').filter(char => char.match(/[0-9]/g));
            if (phoneNumber.length > 9){
                phoneNumber.splice(0,0,'(');
                phoneNumber.splice(4,0,')');
                phoneNumber.splice(5,0,' ');
                phoneNumber.splice(9,0,'-');
            }
            value = phoneNumber.join('').slice(0,14);
        }
        this.setState({ [name]: value });
    };
    handleSubmit = e => {
        if(!this.state.extraValidationPass)
            return window.scrollTop();
        e.preventDefault();
        this.togglePopper(e);
    };
    handleError = errors => {
        console.log(errors);
        window.scrollTo(0,0)
        console.log(window);
        
    }
    runExtraValidators = () => {
        let pass = true
        if (!this.state.selectedPositions.length){
            this.setState({positionError: true})
        }
        if(pass)
            this.setState({extraValidationPass: true})
    }
    finalSubmit = e => {
        e.preventDefault();
        this.setState({
            industryExperience: this.state.industryExperience || 0,
            whMonths1: this.state.whMonths1 || 0,
            whMonths2: this.state.whMonths2 || 0,
            whMonths3: this.state.whMonths3 || 0,
        });
        let payload = this.state;
        delete payload.anchorEl;
        delete payload.positionError;
        delete payload.extraValidationPass;
        axios.post("/api/applicant",payload).then(res => console.log(res));
        // maybe display the results to the applicant for feedback
        this.setState({name: "", email: "", phone: "", selectedPositions: [], availability: [], 
            restaurantName1: "", positionsWorked1: [], whMonths1:"", whDetails1: "", 
            restaurantName2: "", positionsWorked2: [], whMonths2:"", whDetails2: "", 
            restaurantName3: "", positionsWorked3: [], whMonths3:"", whDetails3: "", 
            coverLetter: ""});
    };
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                {/* <form className={classes.form}> */}
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
                    validators={[ 'minStringLength:13']}
                    errorMessages={[ 'Phone Number Must Be 10 Digits']}
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
                        <InputLabel htmlFor="industryExperience">Years of Industry Experience</InputLabel>
                        <Input id="industryExperience" name="industryExperience" type="number" onChange={this.handleChange} value={this.state.industryExperience}/>
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
                        <InputLabel htmlFor="wh-months-1">Months of Experience</InputLabel>
                        <Input id="wh-months-1" type="number" name="whMonths1" onChange={this.handleChange} value={this.state.whMonths1}/>
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
                        <InputLabel htmlFor="wh-months-2">Months of Experience</InputLabel>
                        <Input id="wh-months-2" type="number" name="whMonths2" onChange={this.handleChange} value={this.state.whMonths2}/>
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
                        <InputLabel htmlFor="wh-months-3">Months of Experience</InputLabel>
                        <Input id="wh-months-3" type="number" name="whMonths3" onChange={this.handleChange} value={this.state.whMonths3}/>
                    </FormControl>
                    <TextField className={classes.formControl} id="wh-details-3" multiline label="Details" name="whDetails3" onChange={this.handleChange} value={this.state.whDetails3}/>
                    &nbsp;      
                    <h3>Message To Employer:</h3>
                    <TextField className={classes.formControl} id="coverLetter" multiline label="CoverLetter" name="coverLetter" onChange={this.handleChange} value={this.state.coverLetter}/>
                    <Button onClick={this.runExtraValidators} ref="submitButton"  type="submit"   className={classes.button} >Apply</Button>
                    <ApplicationPopper setViewState={this.props.setViewState} setApplState={this.setAppleState} applState={this.state} togglePopper={this.togglePopper} submit={this.finalSubmit}/>
                {/* </form> */}
                </ValidatorForm>
            </Fragment>
        );
    };
}
export default withStyles(styles)(ApplicationForm);