var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    app         = express(),
    dbRoutes    = require("./routing/db.routes.js")
    stormpath   = require("express-stormpath"),
    Router      = express.Router(),
    PORT        = process.env.PORT || 3000;

// mongo db middleware
mongoose.connect("mongodb://heroku_d3clnhwm:m0g7le97n8pqmlf8acknir3ok7@ds117899.mlab.com:17899/heroku_d3clnhwm");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("./public"));
app.use(dbRoutes);

app.listen(process.env.PORT || PORT, function () {
	console.log("Listening on port ", PORT);
});
