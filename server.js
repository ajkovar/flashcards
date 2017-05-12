var express = require('express')
var translate = require('@google-cloud/translate')({
  projectId: 'alex-kovar-flash-cards',
  keyFilename: './alex-kovar-flash-cards-90aae3b58b7e.json'
});

var app = express()
app.get('/api/translate', function (req, res) {
  translate.translate(req.query.text, {from:'es', to:'en'}, function(err, translation, response) {
    console.log(response.data.translations)
    if (!err) {
      console.log(err)
    }
    res.send(translation)
  });
})

app.listen(3000)
