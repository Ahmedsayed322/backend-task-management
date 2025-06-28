"use strict";

var express = require('express');

var _require = require('./mongoose/mongoose'),
    startConnection = _require.startConnection;

var _require2 = require('./routes/registerLoginRoute'),
    SignRouter = _require2.SignRouter;

var _require3 = require('./routes/userRoute'),
    userRoute = _require3.userRoute;

var _require4 = require('./routes/adminRoute'),
    adminRoute = _require4.adminRoute;

var _require5 = require('./routes/taskRoute'),
    taskRoute = _require5.taskRoute;

var app = express();

require('dotenv').config();

var port = process.env.PORT || 5000;
app.use(express.json());
startConnection();
app.use(express.json());
app.use('/api', SignRouter);
app.use('/api', userRoute);
app.use('/api', adminRoute);
app.use('/api', taskRoute);
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});