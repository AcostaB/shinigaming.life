'use strict';
module.exports = function(app) {
  var item = require('../controllers/itemController');

  // todoList Routes
  app.route('/item')
    .get(item.get_all_items)
    .post(item.create_an_item);


  app.route('/item/:itemId')
    .get(item.read_an_item)
    .put(item.update_an_item)
    .delete(item.delete_an_item);
};