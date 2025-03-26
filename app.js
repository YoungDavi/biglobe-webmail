const express = require('express');
const helmet = require('helmet');
const routes = require('./routes');
const compression = require('compression')

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.set("view options", {layout: false});
// app.use(express.static(__dirname + '/public'));
app.use(compression());
// app.use(helmet());
app.use('/', routes);

// default catch all handler
app.all('*', (req, res) => res.status(404).send('route is not defined'));

module.exports = app;
