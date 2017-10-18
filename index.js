var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var request = require('request');

var app = express();

var transporter = nodemailer.createTransport({
  service: 'yandex',
  auth: {
    user: 'web@hr-mindal.ru',
    pass: 'n1A|Wpuvg$'
  }
});

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/html'));

app.get('/', function(request, response) {
  response.render('index.html');
});

app.get('/b2f4745f6637.html', function(request, response) {
  response.render('b2f4745f6637.html');
});

app.post('/mail', function(req, res) {  
  var mailOptions = {
    from: 'web@hr-mindal.ru',
    to: 'info@hr-mindal.ru',
    subject: 'Запрос от ' + req.body.sendername,
    html: '<p><span style=\"font-weight:bold;font-size:16px\">От:</span> ' + req.body.sendername + '</p><p><span style=\"font-weight:bold;font-size:16px\">Email:</span> ' + req.body.emailaddress + '</p><p><span style=\"font-weight:bold;font-size:16px\">Тема:</span> ' + req.body.sendersubject +'</p><p><span style=\"font-weight:bold;font-size:16px;">Сообщение:</span> </p><p style=\"margin-bottom:0;\"> ' + req.body.sendermessage + ' </p>'
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      console.log(error);      
    } else {
      res.json({msg: info.response});
    }
  });
});

app.get('/processReCaptcha', function(req, res) {
  var gRecaptchaResponse = req.query['g-recaptcha-response'];
  var secretKey = '6Ld08TQUAAAAAOlfqufbTGoFYGxM8rBmBIkx-6Cc';
  var verificationUrl = 'https://www.google.com/recaptcha/api/siteverify?secret=' + secretKey + '&response=' + gRecaptchaResponse + '&remoteip='+ req.connection.remoteAddress;

  request(verificationUrl,function(error,response,body) {
    body = JSON.parse(body);

    if(body.success !== undefined && !body.success) {
      return res.send(false);
    }

    res.send(true);
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
