

//============== For Testing purposes ============//


global.Promise = require('bluebird');
const mongoose = require('mongoose'),

const mongoURI = 'mongodb://heroku_4024q7n4:36e9qs2rr6sqv4g3aunt3vb6md@ds111993.mlab.com:11993/heroku_4024q7n4';

mongoose.connect(mongoURI, { useNewUrlParser: true });


const Litter = require('./models/Litter');
const User = require('./models/User');

Litter.aggregate([ { $group: {"_id":"$dealer" , "number":{$sum:1}} } ])
.then(function (res) {
      console.log('--->',res); 
    });