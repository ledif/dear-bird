//var fetch = require('whatwg-fetch') 
var request = require('request')

var endpoint = "http://archives.lbjlibrary.org/items/show/385"

request({
  uri: endpoint,
	headers: {
		'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36'

	},
	}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
	 console.log(body)
}
})
