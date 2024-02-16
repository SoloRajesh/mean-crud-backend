const express = require("express");
const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('customer',customerSchema)
