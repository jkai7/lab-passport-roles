const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ironSchema = new Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    enum: ["Boss", "Developer", "TA"],
    default: "Developer"
});

const Ironhacker = mongoose.model("Ironhacker", ironSchema);

module.exports = Ironhacker;