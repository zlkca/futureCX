const http = require('http');
const express = require('express')
const path = require('path')
const app = express()

const fs = require('fs')
const cfg = JSON.parse(fs.readFileSync('../futureCX.cfg.json','utf8'));
const APP_SERVER = cfg.APP_SERVER;

// body-parser does not handle multipart bodies
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: '1mb' }));

// parse application/json
app.use(bodyParser.json({ limit: '1mb' }));

app.use(express.static(__dirname + '/dist'));

// var Auth = require('./server/auth/view');
// var auth = Auth(cfg);
// app.post('/api/login', auth.login);
// app.post('/api/token', auth.checkToken);

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});
//app.listen(SERVER_PORT, () => console.log('Server setup'))
app.set('port', process.env.PORT || APP_SERVER.PORT)

var server = http.createServer(app)
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})
