var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

var Post = require("./models/posts");

var User = require("./models/user");

Post.create({
    title: "How to cook the best burger pt.23sdfs",
    content: "BLAHsdfsfgdfgdfgdfgdfgdfgdf"
}, function(err, newPost){
    User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
        if(err){
            console.log(err)
        } else {
            foundUser.posts.push(newPost);
            foundUser.save(function(err, data){
                if(err){
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});


//find user 
//find all posts for that user

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// })



// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });