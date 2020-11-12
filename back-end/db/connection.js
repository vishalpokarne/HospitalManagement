const mongoose = require('mongoose');

let connect = () => {

  const uri = 'mongodb://mongo:27017/rest_api_container';
  mongoose
    .connect( uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
}

exports.connect = connect;
