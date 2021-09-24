const express = require("express");
const app = express();

app.get("/", function(req, res){
  res.send("<h1>Hello, world</h1>");
});

app.get("/contact", function(req, res){
  res.send("<p>Contact me at marianaleitune@gmail.com</p>");
});

app.get("/about", function(req, res){
  res.send("<h1>Hello, my name is Mariana</h1><p>I'm a lawyer from Brazil. I like doing yoga and I'm passionate on design.I'm studiying to be a developer.</p>");
});

app.get("/hobbies", function(req, res){
  res.send("yoga, chimarrão");
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
