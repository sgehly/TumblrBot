var Twitter = require('twitter');
var tumblr = require('tumblr.js');
var config = require('./config.js');

var usernameCacheProtection = [];

function countInArray(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === what) {
            count++;
        }
    }
    return count;
}

function reply(post, index){
	var twitter = new Twitter(config.twitter);
	var client = tumblr.createClient(config.tumblr[index]);
	client.posts(post.blog_name+'.tumblr.com', {id: post.id, notes_info: 'True'}, function(err,r){
		if(err){
			console.error(err);
			return;
		}
		if(!r){
			return;
		}
		var postData = r.posts[0];
		var notes = postData.notes;
		if(notes){
			if(notes.length == 0 && notes[0] && notes[0].blog_name == post.blog_name){
				return;
			}
			for(i=0;i<notes.length;i++){
				if(config.tumblrAccounts.indexOf(notes[i].blog_name) !== -1){
					return;
				}
			}
		}else{
			return;
		}

		if(config.blacklist.indexOf(post.blog_name) !== -1){
			return;
		}
		if(countInArray(usernameCacheProtection, post.blog_name) > 4){
			return;
		}
		var comment = config.responses[Math.floor(Math.random()*config.responses.length)].replace('{{username}}', '@'+post.blog_name);
		client.reblog(config.tumblrAccounts[index]+'.tumblr.com', { id: post.id, reblog_key: post.reblog_key, comment: comment }, function (err, data) {
			if(err){
				if(config.tumblr[index+1]){
					return reply(post, index+1);
				}else{
					return;
				}
			}
			usernameCacheProtection.push(post.blog_name);
			console.log("[TumblrBot "+index+"] Successfully Replied to "+post.blog_name)
			var status = '"'+config.responses[Math.floor(Math.random()*config.responses.length)]+'" '+post.short_url;
			var finalStatus = status.replace('{{username}}', post.blog_name);
			twitter.post('statuses/update', {status: finalStatus}, function(error, response, body){});
		});
	})
	
};

function fetchTumblrData(){
	console.log("[TumblrBot] Fetching Tumblr Data")
	for(i=0;i<config.terms.length;i++){
		var searchClient = tumblr.createClient(config.tumblr[0])
		searchClient.tagged(config.terms[i], function (err, data) {
			if(err){
				console.error(err);
				return;
			}
			if(!data){
				console.error("No data found?");
				return;
			}
		    for(i=0;i<data.length;i++){
		    	reply(data[i], 0)
		    }
		});
	}
}

setInterval(fetchTumblrData, 30000);
fetchTumblrData();