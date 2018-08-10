var express = require("express");
var app = express();
app.use(express.static("public"));  // Tell Express to use the public directory.

app.set("view engine", "ejs"); // This tells express that the view engine will be using EJS files 

app.get("/", function(req, res){
    res.render("home");
    
});

app.get("/fallinlovewith/:thing", function(req, res) {
    var thing = req.params.thing;
    res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res) {
    var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "Post 2", author: "2Susy"},
        {title: "Post 134", author: "4Susy"}
        ];
        res.render("posts", {posts: posts});
})
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is Listening!");
});