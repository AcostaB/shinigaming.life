'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the item'
  },
  description: {
    type: String
  },
  quantity: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model('Items', ItemSchema);