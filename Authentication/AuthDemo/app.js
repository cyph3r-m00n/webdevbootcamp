var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/auth_demo_app");
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

//==========================================================================================
// ROUTES
//==========================================================================================



app.get("/", function(req, res){
    res.render("home");
}); 

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

//Auth Routes

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        if(err){
            console.log(err);
            return res.render("register");
        } else {
            console.log("====================================");
            console.log("Hacking all of the users passwords")
            console.log("====================================");
            console.log("Username: " + req.body.username);
            console.log("Password: " + req.body.password);
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secret");
            });
        }
    });
});

// LOGIN ROUTES

//render login form
app.get("/login", function(req, res) {
    res.render("login");
});

//login logic

app.post("/login",passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res) {
    res.render("login");
});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started..............");
});

