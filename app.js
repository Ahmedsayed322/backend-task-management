const express = require('express');
const { startConnection } = require('./mongoose/mongoose');
const { SignRouter } = require('./routes/registerLoginRoute');
const { userRoute } = require('./routes/userRoute');
const { adminRoute } = require('./routes/adminRoute');
const { taskRoute } = require('./routes/taskRoute');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(express.json());
startConnection();
app.use(express.json());
app.use('/api', SignRouter);
app.use('/api', userRoute);
app.use('/api', adminRoute);
app.use('/api', taskRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
