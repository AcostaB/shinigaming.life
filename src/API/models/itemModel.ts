// import {Schema} from "mongoose";
'use strict';
import  mongoose from "mongoose";
// const mongoose = require('mongoose');
const schema = mongoose.Schema;

const itemSchema = new schema({
  name: {
    required: 'Kindly enter the name of the item',
    type: String
  },
  description: {
    type: String
  },
  quantity: {
    default: 1,
    type: Number
  }
});

module.exports = mongoose.model('Items', itemSchema);