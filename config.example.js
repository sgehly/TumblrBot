var consumer_key = '';
var consumer_secret = ''
module.exports = {
	//optional twitter support to tweet out your endeavors.
	twitter: {
  		consumer_key: '',
  		consumer_secret: '',
 		access_token_key: '',
  		access_token_secret: ''
	},
	//The order in this array must match the order below the array.
	tumblrAccounts: [
		'myBot',
		'myOverflowBot'
	],
	tumblr: [
		{
			//The API data for "myBot"
		  	consumer_key: consumer_key,
		  	consumer_secret: consumer_secret,
		  	token: '',
		  	token_secret: '',
		},
		{
			//The API data for "myOverflowBot"
		  	consumer_key: consumer_key,
		  	consumer_secret: consumer_secret,
		  	token: '',
		  	token_secret: '',
		}
	],
	//The actual responses, if you want to include their username, include {{username}}
	responses: [
		"We can dance if we want to, {{username}}, we can leave your friends behind.",
		"If they won't dance and if they wont dance, {{username}}, they are no friends of mine.",
	],
	//These are accounts you don't want to reply to, whether they're satire, or just trying to fill up your 250 daily post limit
	blacklist: ['tedCruz', 'donaldTrump', 'hillaryClinton', 'bernieSanders'],
	//These are the terms you want to sit on.
	terms: ['gif', 'lol', 'ayyy', 'lmao']
}