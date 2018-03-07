var express = require('express'),
    app = express(),
    path = require('path'),
    port = process.env.PORT || 9000,
    mongoose = require('mongoose'),
    Item = require('../api/models/itemModel'), //created model loading here
    bodyParser = require('body-parser');
var routes = require('../api/routes/itemRoutes'); //importing route

let __dirname2 = '/Users/Developer/Documents/Projects/shinigaming.life/packages/DnD/'

app.use(express.static(path.join(__dirname2, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname2, 'build', 'index.html'));
});
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/shinigaminglifedb'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app); //register the route

app.listen(port);

console.log('Item RESTful API server started on: ' + port);

