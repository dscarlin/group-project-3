import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import ListItem from "../../components/ListItem";
import SearchForm from "../../components/SearchForm";
import applicants from "../../dummyApps.json";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        position: "relative",
        marginTop: theme.spacing(8),
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

export default function ListAndDetailContainer(props) {
    const classes = useStyles();
    console.log(applicants);
    return(
        <Container>
            <Grid className={`${classes.root}`}>
                <SearchForm appState={props.appState}/>
            </Grid>
            <Grid container spacing={0} className={""}>
                <Grid item xs={6} className={classes.control}>
                    <ul>
                        {console.log(props)}
                        {props.results.length ?
                            props.results.map(applicant => 
                                <ListItem 
                                    appplicant={applicant}
                                    key={applicant._id}
                                />
                            ) :
                            <div> No Search Results</div>

                                
                        }
                    </ul>
                </Grid>
                <Grid  id="detailView" item xs={6} className={`${classes.control} ${classes.fixed}`}>
                    <h1>detail</h1>
                    <h1>detail</h1>
                </Grid>

            </Grid>
        </Container>
    );
}