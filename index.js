var express = require('express');
var app = express();
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'yandex',
  auth: {
    user: 'test@hr-mindal.ru',
    pass: 'test12'
  }
});

var mailOptions = {
  from: 'request@hr-mindal.ru',
  to: 'ivanandreev.mail@hgmail.com',
  subject: 'Test message',
  text: 'Hello world!'
};

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/html'));

app.get('/', function(request, response) {
  response.render('index.html');
});


app.get('/b2f4745f6637.html', function(request, response) {
  response.render('b2f4745f6637.html');
});

app.post('/mail', function(req, res) {
  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      console.log(error);
      res.json({msg: 'error'});
    } else {
      res.json({msg: info.response});
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
