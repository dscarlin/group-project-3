// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
// import ButtonBase from "@material-ui/core/ButtonBase";
// import ListItem from "../../components/ListItem";
// import ListTitle from "../..components/ListTitle";

// // Icons
// import Star from "@material-ui/icons/StarRounded";
// import Message from "@material-ui/icons/Message";
// import Delete from "@material-ui/icons/Delete";

// const useStyles = makeStyles(theme => ({
//     root: {
//         flexGrow: 1,
//         listStyleType: "none"
//     },
//     paper: {
//         // padding: theme.spacing(2),
//         margin: "1em 0",
//         maxWidth: "90%",
//     }
// }));


// export default function List(props) {
//     const classes = useStyles();

//     const [SelectedApplicant, setSelectedApplicant] = React.useState(0);

//     const favoriteApplicant = (e) => {
//         e.preventDefault();
//         return console.log("Save this Item to Employer's Favorites");
//     };
//     const removeApplicant = (e) => {
//         e.preventDefault();
//         return console.log("Delete this Item from List View");
//     };
//     const showApplicantDetail = (e) => {
//         e.preventDefault();
//         return console.log("On List Item click, display the detail page for this applicant");
//     };
//     const messageApplicant= (e) => {
//         e.preventDefault();
//         return console.log("*Twilio Message Ping*");
//     };
//     const addExperience = (a, b, c) => {
//         return a + b + c;
//     }
//     const workHistory = (jobOne, jobTwo, jobThree) => {
//         let workHistory = [jobOne, jobTwo, jobThree]
//         return workHistory;
//     }

//     return (
//         <Grid item xs={6} className={classes.control}>
//             <ListTitle /> 
//             <ul>
//                 {applicants.map((applicant, index) =>
//                     <ListItem 
//                         key={applicant._id}
//                         applicant={applicant}
//                         handleClick={setSelectedApplicant}
//                         index={index}
//                     />
//                 )}
//             </ul>
//         </Grid>
//     );
// }