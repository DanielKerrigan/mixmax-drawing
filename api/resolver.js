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
