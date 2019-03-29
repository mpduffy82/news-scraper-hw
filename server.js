// Dependencies

const express = require('express');
const exphbs = require("express-handlebars");
const logger = require('morgan');
const mongoose = require('mongoose');
var databaseUrl = 'mongodb://localhost/scrap';
// MongoDB

if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
}
else {
	mongoose.connect(databaseUrl, { useCreateIndex: true, useNewUrlParser: true});
}



// Sets up the Express App

const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'))

// Views handlebars

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes

const path = require('path');
require(path.join(__dirname, '/routes/htmlRoutes.js'))(app);


// PORT

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
