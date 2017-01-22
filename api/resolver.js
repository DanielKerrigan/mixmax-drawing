var firebase = require("firebase");
var config = {
  apiKey: "AIzaSyBUcax8rRvYAFhULkS_ASVB9or1poSRi4g",
  authDomain: "mixmax-drawing.firebaseapp.com",
  databaseURL: "https://mixmax-drawing.firebaseio.com",
  storageBucket: "mixmax-drawing.appspot.com",
  messagingSenderId: "219058818935"
};
firebase.initializeApp(config);


module.exports = function(req, res) {
  console.log('req.body', req.body);
  var data = JSON.parse(req.body.params);
  if (!data) {
    res.status(403 /* Unauthorized */ ).send('Invalid params');
    return;
  }
  // set the html that will be displayed
  var base = "https://boilmake-drawapp.herokuapp.com/";
  var html = "<a href="+base+"editor?data="+JSON.stringify(data)+">Edit</a> <img src="+base+"image/"+data.src+">";
  res.json({
    body: html
  });
};
