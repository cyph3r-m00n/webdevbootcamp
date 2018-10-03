//==================================================================
// Package Requires
//==================================================================

var express                     = require("express"),
    app                         = express(),
    bodyParser                  = require("body-parser"),
    mongoose                    = require("mongoose"),
    passport                    = require("passport"),
    Campground                  = require("./models/campground"),
    flash                       = require("connect-flash"),
    Comment                     = require("./models/comment"),
    User                        = require("./models/user"),
    LocalStrategy               = require("passport-local"),
    methodOverride              = require("method-override"),
    passportLocalMongoose       = require("passport-local-mongoose"),
    seedDB                      = require("./seeds");

//requiring routes
var commentRoutes               = require("./routes/comments"),
    campgroundRoutes            = require("./routes/campgrounds"),
    indexRoutes                 = require("./routes/index");


//==================================================================
// Mongoose/Body Parser/ View Engine
//==================================================================

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database

//==================================================================
// Passport Setup
//==================================================================

app.use(require("express-session")({
    secret: "Rachel has the cutest booty in the whole wide world, like seriously.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//==================================================================
// Router Uses
//==================================================================
app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
//==================================================================
// APP.LISTEN Route
//==================================================================
// process.env.PORT
app.listen(8000, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started on Port 8000.");
});
