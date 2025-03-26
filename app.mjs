const express = require('express');
const helmet = require('helmet');
const routes = require('./routes');
const compression = require('compression')
import { GuardianJS } from '@guardianjs/core';

const app = express();
const config: GuardianConfig = {
  threshold: 0.8,
  enableBehaviorAnalysis: true,
  enableTLSFingerprinting: true,
  // ... other options
};

const guardian = new GuardianJS(config);
app.use(guardian.middleware());

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
