import React from "react";
import { Grid, Typography, Avatar, Divider, Card, CardContent, CardHeader } from "@material-ui/core";
import { Email, Phone } from "@material-ui/icons";
import applicants from "../../dummyApps.json";



export default ({useStyles}) => {

    const classes = useStyles();

    return (
        <Grid item sm>
            
            <Card className={`${classes.card} ${classes.container}`} align="center">
                <CardHeader title="Candidate Details" className={classes.cardHeader} />
                <CardContent>    
                    <Avatar className={classes.avatar}>initials</Avatar>
                    <Typography style={{display: "inline-block", color: "#555"}} variant="h3" align="center">name</Typography>
                    <Typography style={{color: "#999"}} subtitle1="h2"><em>application date</em></Typography>
                    <Divider className={classes.widthControl}/>
                    <p style={{color: "#555"}}><strong style={{color: "#3F51B5"}}>Available Shifts: </strong>shifts</p>
                    <Card className={classes.card} align="center">
                        <CardContent className={classes.CardContent}>
                            <p><strong style={{color: "#3F51B5"}}>Years of Hospitality Experience: </strong>years </p>
                            {/* <p><strong style={{color: '#3F51B5'}}>Experience: </strong>{addExperience(applicants[SelectedApplicant].whMonths1, applicants[SelectedApplicant].whMonths2, applicants[SelectedApplicant].whMonths3)} months</p> */}
                            <p><strong style={{color: "#3F51B5"}}>Work History: </strong>history</p>
                        </CardContent>
                    </Card>           
                                
                    <span><Email style={{color: "#3F51B5"}}/>email@emailaddress.com</span>
                    <span><Phone style={{color: "#3F51B5"}}/>(555)555-5555</span>
                      
                    <Card className={classes.card} align="center">
                        <CardHeader title="Cover Letter" className={classes.cardHeader}/>
                        <Divider />
                        <CardContent className={classes.coverLetter}>
                            <p>"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
                            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
                            </p>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </Grid>
    )
}
