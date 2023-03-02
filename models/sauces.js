const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const sauceSchema = mongoose.Schema ({
   "name": { type: String, required: true, unique: true },
   "manufacturer": { type: String, required: true },
   "description": { type: String, required: true, unique: true },
   "imageUrl": { type: String, required: true, unique: true },
   "mainPepper": { type: String, required: true },
   "heat": { type: Number, required: true }
})

sauceSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Sauce", sauceSchema);