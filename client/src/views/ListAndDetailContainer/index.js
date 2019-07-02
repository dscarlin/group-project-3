import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import ListItem from "../../components/ListItem";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        position: "relative",
        marginTop: theme.spacing(5)
    },
    control: {
        border: "solid black 1px",
    },
    fixed: {
        position: "fixed",
        right: "0",
        width: "50%", 
        height: "100vh"     
    }
}));

export default function ListAndDetailContainer() {
    const classes = useStyles();
    return(
        <Grid container spacing={0} className={classes.root}>
            <Grid item xs={6} className={classes.control}>
                <ul>
                    {[...new Array(15)].map((i,x) => <ListItem key={x}/>) }
                </ul>
            </Grid>
            <Grid  item xs={6   } className={`${classes.control} ${classes.fixed}`}>
                <h1>detail</h1>
                <h1>detail</h1>
            </Grid>
        </Grid>
    )
}