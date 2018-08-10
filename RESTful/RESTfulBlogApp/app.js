var express = require("express"),
    app     = express(),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    bodyParser = require("body-parser");
    
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


// Mongoose/Model Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});


var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image: "https://pixabay.com/get/e131b50c20e90021d85a5854ee4d459fe270e7c818b4134497f9c870a7e5_340.jpg",
//     body: "HELLO THIS IS A BLOG POST"
// });

// RESTful Routes

app.get("/", function(req, res) {
    res.redirect("/blogs");
});

// index route

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else {
           res.render("index", {blogs: blogs});
       }
    });
});

//new route
app.get("/blogs/new", function(req, res){
    res.render("new");
})

//create route

app.post("/blogs", function(req, res){
    //create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            //redirect to index
            res.redirect("/");
        }
    });
    
});

//SHOW ROUTE

app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog})
        }
    })
});

// Edit

app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

// UPDATE ROUTE

app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
});

// Delete Route

app.delete("/blogs/:id", function(req, res){
    // destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            //redirect
            res.redirect("/blogs");
        }
    });
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING!");
});