var express = require('express');
var router = express.Router();
var slack = require('../slack.js');

router.post('/', function(req, res) {
    var text = "";
    for (var i = 0; i < req.body.length; i++) {
        var obj = req.body[i];
        if (typeof obj.time_answer =="string" &&  obj.time_answer!= "" && obj.time_answer!= "0000-00-00 00:00:00" ) {
            if (typeof obj.remove =="string" && obj.remove=="yes")
            {
              //this is the end of a call
              var now = new Date().toISOString().slice(0, 19).replace('T', ' ');
              var duration = Math.abs(new Date(now) - new Date(obj.time_answer))/1000;
              if (typeof obj.term_sub =="string" && obj.term_sub!="")
                text = "User " + obj.term_sub + " is getting off a "+duration+" second inbound call from " + obj.orig_from_name;
              else if (typeof obj.orig_sub =="string" && obj.orig_sub!="")
                text = "User " + obj.orig_sub + " is getting off a "+duration+" second outbound call to " + obj.orig_req_user;
            }
            else {
              //this is trivial logic, but this should mean the call is now answered.
              if (typeof obj.term_sub =="string" && obj.term_sub!="")
                text = "User " + obj.term_sub + " just answered a call from " + obj.orig_from_name;
              else if (typeof obj.orig_sub =="string" && obj.orig_sub!="")
                text = "User " + obj.orig_sub + " is now talking on a outbound call to " + obj.orig_req_user;
            }
        }
        slack.message(text);
    }
    res.send("ok");
});
module.exports = router;
