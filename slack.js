
var request = require('request');
var creds = require('./creds.js');

var slackapi = "https://slack.com/api/chat.postMessage?token=" + creds.slacktoken();
var channel = "callcenter"
var url = slackapi + "&pretty=1&channel=" + channel

module.exports = {
  message: function (text) {
    if (text != "") {
        request(url+ "&text=" + text, function(error, response, body) {
            if (error)
              console.log('error:', error); 
        });
    }
  },
};
