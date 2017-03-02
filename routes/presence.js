var express = require('express');
var router = express.Router();
var slack = require('../slack.js');

router.post('/', function(req, res) {
    var text = "";
    for (var i = 0; i < req.body.length; i++) {
        var obj = req.body[i];
        text = "";
        if (typeof obj.portal_status == "string" ) {
            //only looks for status changes to minimize chatter in demo.
            if (obj.portal_status == "Break")
                text = "User " + obj.user + " has been working hard, they are taking a break!";
            else if (obj.portal_status == "Lunch")
                text = "User " + obj.user + " is taking a lunch break";
            else if (obj.portal_status == "Meeting")
                text = "User " + obj.user + " must be important, they are in a meeting";
            else if (obj.portal_status == "")
                text = "";
            else
                text = "User " + obj.user + "'s new status is "+obj.portal_status;
        }
        slack.message(text);
    }
    res.send("ok");
});
module.exports = router;
