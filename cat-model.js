const mongoose = require("mongoose");

// Schema constructor from Mongoose
const Schema = mongoose.Schema;

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

module.exports = Cat;
