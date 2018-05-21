const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiRoutes = require('./api/routes');

const app = express();
const staticPath = path.join(__dirname, "public");

app.use(express.static(staticPath));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/api', apiRoutes);

app.listen(3000, function () {
    console.log('Notes server listening on: http://localhost:3000');
});