import { Mongoose } from "mongoose";
// import { Item } from "../../Components/Panels/InventoryPanel/Item";

// 'use strict';
const mongoose: Mongoose = require('mongoose');
const mItem = mongoose.model('Items');

exports.get_all_items = (req: any, res: any) => {
  mItem.find({}, (err, item) => {
    if (err) {
      res.send(err);
    }
    res.json(item);
  });
};

exports.create_an_item = (req: any, res: any) => {
  let newItem = new mItem(req.body);
  newItem.save((err, item) => {
    if (err) {
      res.send(err);
    }
    res.json(item);
  });
};

exports.read_an_item = (req: any, res: any) => {
  mItem.findById(req.params.itemId, (err, item) => {
    if (err) {
      res.send(err);
    }
    res.json(item);
  });
};

exports.update_an_item = (req: any, res: any) => {
  mItem.findOneAndUpdate({_id: req.params.itemId}, req.body, {new: true}, (err, task) => {
    if (err) {
      res.send(err); 
    }
    // res.json(item);
  });
};

exports.delete_an_item = (req: any, res: any) => {
  mItem.remove({
    _id: req.params.itemId
  }, (err: any) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'mItem successfully deleted' });
  });
};
