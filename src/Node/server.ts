let express = require('express'),
    app = express(),
    path = require('path'),
    port = process.env.PORT || 9000,
    mongoose = require('mongoose'),
    mItem = require('../API/models/itemModel'), // created model loading here
    bodyParser = require('body-parser');
let routes = require('../API/routes/itemRoutes'); // importing route

let __dirname2 = '/Users/Developer/Documents/Projects/shinigaming.life/packages/DnD/'

app.use(express.static(path.join(__dirname2, 'build')));

app.get('/', (req: any, res: any) => {
  res.sendFile(path.join(__dirname2, 'build', 'index.html'));
});
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/shinigaminglifedb'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app); // register the route

app.listen(port);

console.log('mItem RESTful API server started on: ' + port);

