const express = require("express");
const mongoose = require("mongoose");
const app = express();


// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://pricetonbraswell:8ZxWtId9Y5mQ10mY@mowmandb.ch05rsi.mongodb.net/Node-API?retryWrites=true&w=majority&appName=MowManDB",
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
    console.log("Connected to MongoDB MowManDB!");
}).catch((err) => { 
    console.log("Error connecting to MongoDB MowManDB! in database.js");
    console.error(err);
});



// Define the schemas
const userSchema = new mongoose.Schema({
  google_id: { type: String, unique: true },
  profile_id: mongoose.Schema.Types.ObjectId,
  created_at: { type: Date, default: Date.now },
});

const profileSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId, // profile id in the user model
  name: String,
  email: String,
  customers: [mongoose.Schema.Types.ObjectId],
});

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  associated_profile_id: mongoose.Schema.Types.ObjectId,
});



// Create the models
const User = mongoose.model("User", userSchema);
const Profile = mongoose.model("Profile", profileSchema);
const Customer = mongoose.model("Customer", customerSchema);

// Export the models
module.exports = { User, Profile, Customer };