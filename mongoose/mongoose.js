const mongoose = require('mongoose');
const startConnection = () => {
  console.log('mongoose started');
  mongoose.connect(process.env.MONGO_URL);
};
module.exports = {
  startConnection,
};
