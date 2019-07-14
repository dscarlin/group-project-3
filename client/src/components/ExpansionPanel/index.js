import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography, Grid, Divider} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        // flexBasis: "33.33%",
        flexShrink: 0,
    },
    secondaryHeading: {
        // fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    panelDetails: {
        backgroundColor: "#fafafa"
    }
}));

export default function ControlledExpansionPanels(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            <ExpansionPanel expanded={expanded === "panel1"} square="true" onChange={handleChange("panel1")}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    style={{textAlign: "left", color: "#555"}}
                >
                    <Typography className={classes.heading}><strong>{`${props.restaurant} `}</strong></Typography>
                </ExpansionPanelSummary>
                <Divider className={classes.dividerFullWidth}/>
                <ExpansionPanelDetails className={classes.panelDetails}>
                    <Grid>
                        <Grid item>
                            <Typography className={classes.secondaryHeading} align="left"><strong>Positions:</strong>{` ${props.positions[props.index]} for ${props.months[props.index]} months`} </Typography>
                        </Grid>
                        <Grid item>
                            <Typography align="left">
                                <h4 className={classes.secondaryHeading}>Details:</h4>
                                {props.details[props.index]}
                            </Typography>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}