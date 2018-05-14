import { Mongoose } from "mongoose";
import { Item } from "../../Components/Panels/InventoryPanel/Item";

'use strict';
var mongoose: Mongoose = require('mongoose');
var mItem = mongoose.model('Items');

exports.get_all_items = function(req, res) {
  mItem.find({}, function(err, item) {
    if (err) {
      res.send(err);
    }
    res.json(item);
  });
};

exports.create_an_item = function(req, res) {
  var newItem = new mItem(req.body);
  newItem.save(function(err, item) {
    if (err) {
      res.send(err);
    }
    res.json(item);
  });
};

exports.read_an_item = function(req, res) {
  mItem.findById(req.params.itemId, function(err, item) {
    if (err) {
      res.send(err);
    }
    res.json(item);
  });
};

exports.update_an_item = function(req, res) {
  mItem.findOneAndUpdate({_id: req.params.itemId}, req.body, {new: true}, function(err, task) {
    if (err) {
      res.send(err); 
    }
    res.json(item);
  });
};

exports.delete_an_item = function(req, res) {
  mItem.remove({
    _id: req.params.itemId
  }, function(err, item) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'mItem successfully deleted' });
  });
};
