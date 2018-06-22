const express = require("express");
const mongoose = require("mongoose");

const Cat = require("./cat-model.js");


// connect to a database using a CONNECTION STRING
// (domain and all info about the database we are connecting to)
mongoose.connect("mongodb://localhost/cat-diet");

const app = express();

app.set("view engine", "hbs");


app.get("/", (request, response, next) => {
  Cat.find({ age: { $lte: 10 } })
    .then((catResults) => {
      response.locals.catArray = catResults;
      response.render("cat-list.hbs");
    })
    .catch((err) => {
      console.log("Home page FIND error", err);
      response.render("error-page.hbs");
    });
});


app.listen(3000, () => {
  console.log("meow 😼");
});
