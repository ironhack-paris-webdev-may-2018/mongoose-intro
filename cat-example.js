const mongoose = require("mongoose");

// Schema constructor from Mongoose
const Schema = mongoose.Schema;

// connect to a database using a CONNECTION STRING
// (domain and all info about the database we are connecting to)
mongoose.connect("mongodb://localhost/cat-diet");

// use the Schema constructor to create our cat schema
const catSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0, max: 30 },
  color: { type: String },
  vetVisits: [ { type: Date } ],
  toys: [ { type: String } ],
  owners: [ { type: Schema.Types.ObjectId } ],
  countryCode: { type: String, match: /^[A-Z]{2}$/ },
  photo: { type: String, default: "https://cdn.iconscout.com/public/images/icon/premium/png-512/cat-pet-animal-feline-back-butt-ass-hole-orange-ginger-asterisk-3dbc6463d19979fd-512x512.png" },
});

// "Cat" is our cat Model object
// The "Cat" will allow us to work the "cats" collection
// ("Cat" -> "cat" -> "cats")
const Cat = mongoose.model("Cat", catSchema);


// Creating new cats
// -----------------
Cat.create({ name: "Yuki", age: 8, color: "white", countryCode: "FR" })
  .then((catDoc) => {
    console.log("Yuki create SUCCESS!", catDoc);
  })
  .catch((err) => {
    console.log("Yuki create FAILURE!", err);
  });

const janasCat = new Cat({ name: "BC", age: 16, color: "tuxedo" });
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

// Cat.findOne({ _id: "5b2cada89b952da6aa16f31a" })
Cat.findById("5b2cada89b952da6aa16f31a")
  .then((catDoc) => {
    console.log(`Find by ID -> ${catDoc.name} (color: ${catDoc.color}`);
  })
  .catch((err) => {
    console.log("Find by ID FAILURE!", err);
  });


// Updating cats
// -------------
Cat.updateMany(
  { name: "Yuki", color: null },
  { color: "white" }
)
.then((result) => {
  console.log("Yuki UPDATES", result);
})
.catch((err) => {
  console.log("Yuki UPDATES FAILED! 💩", err);
});

Cat.updateOne(
  { name: "BC", color: null },
  { color: "tuxedo" }
)
.then((result) => {
  console.log("BC updateOne", result);
})
.catch((err) => {
  console.log("BC updates FAILED! 💩", err);
});


// Deleting cats
// -------------
Cat.deleteOne({ _id: "5b2bb19623ea489d521d68bb" })
  .then((result) => {
    console.log("Delete SUCCESS!", result);
  })
  .catch((err) => {
    console.log("Delete ERROR! 💩", err);
  });

// there's also ".deleteMany()" for deleting multiple documents
