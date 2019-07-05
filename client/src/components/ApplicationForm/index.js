import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button, Checkbox, Select, ListItemText, FormControl, MenuItem, InputLabel, Input  } from "@material-ui/core";



const styles = () => ({
    form: {
        margin: "2em auto",
        width: "fit-content",
        maxWidth: "90vw",
        minWidth: "50vw",
        boxShadow: "5px 5px 20px 5px grey",
        padding: "2em"
    },
    formControl: {
        width: "100%"
    },
    button: {
        display: "block",
        margin: "2em auto"        
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
    "Prep Cook"
];

const availabilityOptions = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Late Night"
]
// const industryExperienceOptions = [
//     "Less than One",
//     "One to Three",
//     "Three to Five",
//     "Five to Seven",
//     "Seven to Ten",
//     "More than Ten"
// ]

class ApplicationForm extends Component {
    state = {
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
            }
            phoneNumber = phoneNumber.join('').slice(0,14);
            this.setState({phone: phoneNumber})
        }
        else
            this.setState({ [name]: value });
    };
    handleSubmit = e => {
        e.preventDefault();
        const { name, email, phone, selectedPositions, availability, industryExperience, 
            restaurantName1, positionsWorked1, whMonths1, whDetails1, 
            restaurantName2, positionsWorked2, whMonths2, whDetails2, 
            restaurantName3, positionsWorked3, whMonths3, whDetails3, 
            coverLetter } = this.state
        console.log(name, email, phone, selectedPositions, availability, industryExperience || 0, 
            restaurantName1, positionsWorked1, whMonths1 || 0, whDetails1, 
            restaurantName2, positionsWorked2, whMonths2 || 0, whDetails2, 
            restaurantName3, positionsWorked3, whMonths3 || 0, whDetails3, 
            coverLetter );
        this.setState({name: "", email: "", phone: "", selectedPositions: [], availability: [], 
            restaurantName1: "", positionsWorked1: [], whMonths1:"", whDetails1: "", 
            restaurantName2: "", positionsWorked2: [], whMonths2:"", whDetails2: "", 
            restaurantName3: "", positionsWorked3: [], whMonths3:"", whDetails3: "", 
            coverLetter: ""})
    };
    render() {
        const { classes } = this.props;
        return (
            <form className={classes.form}>

                <h3>Applicant Details:</h3>
                <FormControl className={`${classes.formControl}`}>
                    <InputLabel  htmlFor="name">Full Name</InputLabel>
                    <Input id="name" name="name" onChange={this.handleChange} value={this.state.name}/>
                </FormControl>
                <FormControl className={`${classes.formControl}`}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email" name="email" onChange={this.handleChange} value={this.state.email}/>
                </FormControl>
                <FormControl className={`${classes.formControl}`}>
                    <InputLabel htmlFor="phone">Phone Number</InputLabel>
                    <Input id="phone" name="phone" onChange={this.handleChange} value={this.state.phone}/>
                </FormControl>
                <FormControl className={`${classes.formControl}`}>
                    <InputLabel  htmlFor="select-multiple-checkbox">Position Applying For</InputLabel>
                    <Select
                        multiple
                        value={this.state.selectedPositions}
                        onChange={this.handleChange}
                        name="selectedPositions"
                        input={<Input className={classes.white} id="select-multiple-checkbox" />}
                        renderValue={selected => selected.join(", ")}
                        MenuProps={MenuProps}
                    >
                        {positionOptions.map(name => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={this.state.selectedPositions.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
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
                    <Input id="restaurantName1" name="restaurantName1" type="number" onChange={this.handleChange} value={this.state.restaurantName1}/>
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
                        {positionOptions.map(name => (
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
                <hr/>             
                <h1>&#10113;</h1>
                <FormControl className={`${classes.formControl}`}>
                    <InputLabel htmlFor="restaurantName2">Business Name</InputLabel>
                    <Input id="restaurantName2" name="restaurantName2" type="number" onChange={this.handleChange} value={this.state.restaurantName2}/>
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
                <hr/>             
                <h1>&#10114;</h1>
                <FormControl className={`${classes.formControl}`}>
                    <InputLabel htmlFor="restaurantName3">Business Name</InputLabel>
                    <Input id="restaurantName3" name="restaurantName3" type="number" onChange={this.handleChange} value={this.state.restaurantName3}/>
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


                <Button onClick={this.handleSubmit} className={`${classes.white} ${classes.button}`} >Submit</Button>
            </form>
    
        );
    };
}
export default withStyles(styles)(ApplicationForm);