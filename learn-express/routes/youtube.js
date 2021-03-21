var express = require('express');
var request = require('request');
var keys = require('../config/apiKey');
var router = express.Router();

var optionParams = {
  key: keys.youtube.key,
  q: "IU celebrity",
  part: "snippet",
  order: "viewCount",
  type: "video",
  videoDefinition: "high",
  maxResults: 5
}

var url = "https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.search.list?";
for(var option in optionParams) {
  url += option+"="+optionParams[option]+"&";
}

url = url.substr(0, url.length-1);

router.get('/', function(req, res, next) {
  request.get(url, (err, res, body)=>{
    console.log('===> YOUTUBE API call')
    console.log(body);
  });
});

module.exports = router;
