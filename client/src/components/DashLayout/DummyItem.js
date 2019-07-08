import React from "react";

//csss
import { makeStyles } from "@material-ui/core/styles";
import {Grid, Paper, Typography, ButtonBase}  from "@material-ui/core";

// Icons
import Star from "@material-ui/icons/StarRounded";
import Message from "@material-ui/icons/Message";

//Popper
import Popper from "../Popper";


export default function DummyItem({useStyles}) {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase> 
                        <Star 
                            // style={props.appState.userInfo.interested
                            //     .indexOf(props.appState.searchResult[props.index]._id) < 0 ? 
                            //     {color:"gray"} : {color: "yellow"}} 
                            // onClick={favoriteApplicant}
                        />
                    </ButtonBase>
                    <ButtonBase> 
                        <Popper 
                            // removeApplicant={removeApplicant}
                        />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs >
                            <Typography gutterBottom variant="subtitle1">
                                {/* {props.applicant.name} */}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {/* {addExperience(props.applicant.whMonths1,props.applicant.whMonths2, props.applicant.whMonths3)} */}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {/* {props.applicant.availability} */}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                                {/* {workHistory(props.applicant.positionsWorked1, props.applicant.positionsWorked2, props.applicant.positionsWorked3)} */}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <ButtonBase>
                            <Message style={{color:"gray"}} 
                            // onClick={() => props.messageApplicant(props.applicant)}
                            ></Message>
                        </ButtonBase>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )}