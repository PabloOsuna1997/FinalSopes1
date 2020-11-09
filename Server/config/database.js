const mongoose = require('mongoose');

const urldb = 'mongodb://18.224.82.30/finalSopes';

mongoose.connect(urldb)
    .then(db => console.log('DataBases connected.'))
    .catch(err => console.error(err));


module.exports = mongoose
