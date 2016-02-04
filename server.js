var express = require('express');
var app = require('connect');
var request = require('request');
//var errorhandler = require('errorhandler');
var app = express();
var http = require('http');
var math = require('mathjs');
var bodyParser = require('body-parser');

//app.use(app.router);
var port = 6576;
if (process.argv.length > 0){
    process.argv.forEach(function (val, index, array) {
        console.log(index + ': ' + val);
        if (val.indexOf("--port") != -1){
            port = parseInt(process.argv[index + 1]);
            console.log("port: " + port);
        } 
    });
}
var token = process.env.SLACK_TOKEN;
console.log("Listening on port: " + port + " Token: " + token);
app.set('port', port);
//app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/math', function(req, res) {
    if (req.body.token == token){
        if (req.body.command == "/math"){
            var inputs = req.body.text.split("||");
            console.log(inputs);
            var result = "Unknown";
            if (inputs.length == 2){
                //we have scope
                var scope = JSON.parse(inputs[1].trim());
                result = math.eval(inputs[0].trim(), scope);
            } else if (inputs.length == 1){
                result = math.eval(inputs[0]);
            } else{
                result = "Unknown";
            }
            
            res.send("=" + result);
        } else {
            res.send("We only take /math commands.  See http://mathjs.org/docs/expressions/parsing.html for details: " + req.body)
        }
    } else{
        res.send("This is not an authorized application");
    }
        
    });
app.use(require('errorhandler'));

http.createServer(app).listen(app.get('port'), function(){
	console.log('Dev server listening on port ' + app.get('port'));
    });
