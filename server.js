var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var firebase = require("firebase");

var config = {
  apiKey: "AIzaSyBUcax8rRvYAFhULkS_ASVB9or1poSRi4g",
  authDomain: "mixmax-drawing.firebaseapp.com",
  databaseURL: "https://mixmax-drawing.firebaseio.com",
  storageBucket: "mixmax-drawing.appspot.com",
  messagingSenderId: "219058818935"
};
firebase.initializeApp(config);

// Serve assets in /public.
app.use(express.static(__dirname + '/public'));

// So we can POST.
app.use(bodyParser.urlencoded({
  extended: true
}));

// Since Mixmax calls this API directly from the client-side, it must be whitelisted.
var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

// The editor interface.
app.get('/editor', function(req, res) {
  res.sendFile(__dirname + '/editor.html');
});

app.get('/image/:key', function(req, res) {
  var key = req.params.key;
  firebase.database().ref('/canvases/'+key).once('value').then(function(snapshot) {
      var dataURL = snapshot.val().dataURL;
      var img = new Buffer(dataURL, 'base64');
      res.writeHead(200, {
          'Content-Type': 'image/png',
          'Content-Length': img.length
      });
      res.end(img);
  });
});

// The in-email representation.
app.post('/api/resolver', cors(corsOptions), require('./api/resolver'));

app.listen(process.env.PORT || 8910);
