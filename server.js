//Express server 
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

//Mongoose Database -- 
const mongoose = require("mongoose");
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");
let dbConn = mongoose.connection;
// checks if connection with the database is successful
dbConn.once("open", () => console.log("MongoDB connection open"));
dbConn.on("error", console.error.bind(console, "MongoDB connection error:"));

//Rest Api Routes
const routes = require("./routes")

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Send all api requests through these routes
app.use(routes);


app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
