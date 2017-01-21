module.exports = function(req, res) {
  console.log('req.body', req.body);
  var data = JSON.parse(req.body.params);
  if (!data) {
    res.status(403 /* Unauthorized */ ).send('Invalid params');
    return;
  }
  // set the html that will be displayed
  var html = "<img src="+data.src+">";
  res.json({
    body: html
    // Add raw:true if you're returning content that you want the user to be able to edit
  });
};
