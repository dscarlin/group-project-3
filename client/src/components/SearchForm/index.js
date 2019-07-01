import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Input, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox, Button } from "@material-ui/core/Input";



const useStyles = makeStyles(() => ({
    root: {
        textAlign: "center",
        flexWrap: "wrap",
        margin: "auto",
    },
    formControl: {
        minWidth: 120,
        maxWidth: 300,
        verticalAlign: "center",
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
  

  
export default function SearchForm() {
    const classes = useStyles();
    const [SelectedPositions, setSelectedPositions] = React.useState([]);
  
    function handleChange(event) {
        setSelectedPositions(event.target.value);
    }
    const handleSubmit = e => {
        e.preventDefault();
        //SelectedPositions is the array of 
        console.log(SelectedPositions);
    };
    return (
        <form className={classes.root} >
            <FormControl className={classes.formControl}>
                <InputLabel className={`${classes.white}`} htmlFor="select-multiple-checkbox">Position to fill</InputLabel>
                <Select
                    multiple
                    className={classes.white}
                    value={SelectedPositions}
                    onChange={handleChange}
                    input={<Input className={classes.white} id="select-multiple-checkbox" />}
                    renderValue={selected => selected.join(", ")}
                    MenuProps={MenuProps}
                >
                    {positionOptions.map(name => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={SelectedPositions.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={handleSubmit} className={`${classes.white} ${classes.button}`} >Search</Button>             
        </form>

    );
}