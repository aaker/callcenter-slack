var express = require('express');
var router = express.Router();
var slack = require('../slack.js');

/* GET users listing. */
router.post('/', function(req, res) {
    var text = "";
    /*
    example data...
    [{"device_aor":"sip:1002@aaker.com","huntgroup_name":"2001","huntgroup_domain":"aaker.com","entry_option":"immediate","wrap_up_sec":"0","auto_ans":"no","entry_order":1,"entry_priority":1,"call_limit":"1","confirm_required":"no","entry_device":"reg","entry_status":"available","owner_user":"","owner_domain":"","session_count":0,"error_info":"","last_update":"2017-02-26T04:24:42.000Z"}]
    */
    for (var i = 0; i < req.body.length; i++) {
        var obj = req.body[i];
        text = "";
        if (typeof obj.device_aor == "string" && typeof obj.entry_option == "string" && typeof obj.entry_status == "string" ) {
            if (obj.entry_option == "immediate" && obj.entry_status == "available" )
                text = "User " + obj.device_aor + " now logged in and ready to take calls on queue " + obj.huntgroup_name;
        }
        slack.message(text);
    }
    res.send("ok");
});
module.exports = router;
