const express = require("express");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();


MONGO_URL = process.env.MONGO_URL;


// Connect to MongoDB
mongoose.connect(
  MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
    console.log("Connected to MongoDB MowManDB!");
}).catch((err) => { 
    console.log("Error connecting to MongoDB MowManDB! in database.js");
    console.error(err);
});



// Define the user schema
const userSchema = new mongoose.Schema({
  google_id: { type: String, unique: true },
  profile_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  created_at: { type: Date, default: Date.now },
});

// Define the profile schema
const profileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user model
  name: String,
  email: String,
  customers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }], // Reference to the customer model
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }], // Reference to the appointment model
});

// Define the customer schema
const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  associated_profile_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }, // Reference to the profile model
});


// appointment schema
const appointmentSchema = new mongoose.Schema({
  associated_customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }, 
  associated_profile_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }, // Reference to the user model
  name: String,
  email: String,
  phone: String,
  date: Date,
  time: String,
  cost: String,
  notes: String,
  status: { type: Boolean, default: true }
});

// Define the settings schema
const settingSchema = new mongoose.Schema({
  associated_profile_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }, // Reference to the profile model
  sendCustomerEmailNotifications: { type: Boolean, default: true }
});

// Create the models
const User = mongoose.model("User", userSchema);
const Profile = mongoose.model("Profile", profileSchema);
const Customer = mongoose.model("Customer", customerSchema);
const Appointment = mongoose.model("Appointment", appointmentSchema);
const Setting = mongoose.model("Setting", settingSchema);

// Export the models
module.exports = { User, Profile, Customer, Appointment, Setting};