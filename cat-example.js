const mongoose = require("mongoose");

// connect to a database using a CONNECTION STRING
// (domain and all info about the database we are connecting to)
mongoose.connect("mongodb://localhost/cat-diet");

// "Cat" is our cat Model object
// The "Cat" will allow us to work the "cats" collection
// ("Cat" -> "cat" -> "cats")
const Cat = mongoose.model("Cat", {
  name: String,
  age: Number
});


// Creating new cats
// -----------------
Cat.create({ name: "Yuki", age: 8 })
  .then((catDoc) => {
    console.log("Yuki create SUCCESS!", catDoc);
  })
  .catch((err) => {
    console.log("Yuki create FAILURE!", err);
  });

const janasCat = new Cat({ name: "BC", age: 16 });
janasCat.save()
  .then((catDoc) => {
    console.log("BC save SUCCESS!", catDoc);
  })
  .catch((err) => {
    console.log("BC save FAILURE!", err);
  });


// Reading cats from the database (use filter objects!)
Cat.find({ age: { $gte: 10 } })
  .then((catResults) => {
    // "catResults" is an array of the documents that match!
    catResults.forEach((oneCat) => {
      console.log(`meow ${oneCat.name} (id: ${oneCat._id})`);
    });
  })
  .catch((err) => {
    console.log("Cat find() FAILURE! 💩", err);
  });

Cat.findOne({ name: "Yuki" })
  .then((catDoc) => {
    // "catDoc" is ONE document (the first one that matches)
    console.log(`ONE CAT -> ${catDoc.name} (id: ${catDoc._id})`);
  })
  .catch((err) => {
    console.log("One cat FAILURE! 💩", err);
  });

// Updating cats

// Deleting cats
