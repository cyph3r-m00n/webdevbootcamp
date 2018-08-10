var express = require("express");
var app = express();


app.get("/", function(req, res){
    res.send("Hi there, Welcome to my assignment!");
});


app.get("/speak/:animal", function(req, res) {
    var animal = req.params.animal;
    var animals = {
        pig : "Oink",
        dog : "Woof",
        cat : "Meow",
        cow : "Moooow",
        fish : "Bloop"
    }
    if(animals.hasOwnProperty(animal)) {
        res.send("The " + animal + " says " + animals[animal]);
    }else {
        res.send("Sorry, try again.");
    }
});

app.get("/repeat/:word/:count", function(req, res) {
    var word = req.params.word;
    console.log(word);
    var count = Number(req.params.count);
    var newWord = "";
    if(!isNaN(count)){
        for(var i = 0; i < count; i++) {
            newWord += (" " + word);
        }
        res.send(newWord);
    }else{
            res.send("Sorry, incorrect Parameter entered. Please Try Again.");
        }
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found...What are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});