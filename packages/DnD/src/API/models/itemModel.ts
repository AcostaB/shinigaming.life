//import {Schema} from "mongoose";

'use strict';
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var itemSchema = new schema({
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