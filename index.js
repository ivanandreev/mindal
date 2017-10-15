var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/html'));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'html');

app.get('/', function(request, response) {
  response.render('index.html');
});


app.get('/b2f4745f6637.html', function(request, response) {
  response.render('b2f4745f6637.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
