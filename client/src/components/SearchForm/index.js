import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Input, InputLabel, MenuItem, FormControl, 
    FormControlLabel, ListItemText, Select, 
    Checkbox, Button } from "@material-ui/core";
import auth0Client from "../../auth";



const useStyles = makeStyles(() => ({
    root: {
        textAlign: "center",
        flexWrap: "wrap",
        margin: "auto",
    },
    formControl: {
        minWidth:180,
        maxWidth: 300,
        verticalAlign: "center",
        margin: "0 1em"
        // margin: "auto"
    },  
    white: {
        color: "inherit"
    },
    button: {
        verticalAlign: "bottom"
    }
}));
  
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
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
];
  
export default withRouter(function SearchForm(props) {
    const classes = useStyles();
    // const [SelectedPositions, setSelectedPositions,] = React.useState([]);
    // const [selectedAvailability, setSelectedAvailability] = React.useState([]);
    const [state, setState] = React.useState({
        selectedPositions: [],
        selectedAvailability: [],
        checkbox: false,
    });
    const handleChange = event => {
        console.log(event.target);
        let { name, value } = event.target;
        if(name === "checkbox")
            value = event.target.checked;
        setState({ ...state, [name]: value });
    };
    // function handleChange(event) {
    //     if(event.target.name === "pos")
    //         setSelectedPositions(event.target.value);
    //     else
    //         setSelectedAvailability(event.target.value);
    // }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(state);
        let positions = state.selectedPositions.join();
        let checkbox = state.checkbox ? "$all" : "$in";
        let availability = state.selectedAvailability.join();
        let url = `/api/applicant?selectedPositions=${positions}`+
            `&availability=${availability}&checkbox=${checkbox}`;
        async function submitForm() {
            await setState({
                selectedPositions: [],
                selectedAvailability: [],
                checkbox: false,
            });
            const response =  await axios.get(url, {headers: 
                { "Authorization": `Bearer ${auth0Client.getIdToken()}` }});
            //filter out notInterested in candidates
            let searchResult = response.data.filter(applicant =>
                props.appState.userInfo.notInterested.indexOf(applicant._id) < 0);
            console.log("search: ",searchResult);

            await props.setAppState({ searchResult });
            if(props.redirect)
                props.history.push("/list-view");
        }
        submitForm();        
    };
    return (
        <form className={classes.root} >
            <FormControl className={classes.formControl}>
                <InputLabel className={`${classes.white}`} htmlFor="select-multiple-checkbox">Position to fill</InputLabel>
                <Select
                    multiple
                    name="selectedPositions"
                    className={classes.white}
                    value={state.selectedPositions}
                    onChange={handleChange}
                    input={<Input className={classes.white} id="select-multiple-checkbox" />}
                    renderValue={selected => selected.join(", ")}
                    MenuProps={MenuProps}
                >
                    {positionOptions.map(name => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={state.selectedPositions.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel className={`${classes.white}`} htmlFor="select-multiple-checkbox">Availability Needed</InputLabel>
                <Select
                    multiple
                    name="selectedAvailability"
                    className={classes.white}
                    value={state.selectedAvailability}
                    onChange={handleChange}
                    input={<Input className={classes.white} id="select-multiple-checkbox" />}
                    renderValue={selected => selected.join(", ")}
                    MenuProps={MenuProps}
                >
                    {availabilityOptions.map(name => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={state.selectedAvailability.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControlLabel
                className={classes.button}
                control={
                    <Checkbox   checked={state.checkbox} onChange={handleChange} name="checkbox" value={state.checkbox} />
                }
                label="Match All Availability"
            />            
            <Button onClick={handleSubmit} className={`${classes.white} ${classes.button}`} >Search</Button>             
        </form>

    );
});