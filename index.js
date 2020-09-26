const express = require('express');
var app = express();
const path = require('path');
const exphb = require('express-handlebars');
const bodyparser = require('body-parser');
const config = require('config');
const emailRoute =  require('./controllers/emailController')
const auth = require('./middlewares/auth');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

const port = process.env.PORT || config.get('app').port;

app.listen(port, () => console.log(`Listening on port ${port}..`));

app.use(auth.authMiddleware)
app.use('/email', emailRoute)
app.post('/admin/getKey', require('./controllers/keyProvider'));