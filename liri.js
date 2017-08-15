//Grab keys for APIs
var twitterKeys = require("./keys.js").twitterKeys;
// console.log(twitterKeys);
var spotifyKeys = require("./keys.js").spotifyKeys;
// console.log(spotifyKeys);
var omdbKey = require("./keys.js").omdbKey;
// console.log(omdbKey);

var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");

var client = new twitter(twitterKeys);
var spotify = new spotify(spotifyKeys);


//Grab command line command
var command = process.argv.slice(2);
var title = command.slice(1).join('+');

function query(cmd,title){
	switch(cmd){
		case 'my-tweets':
			client.get('statuses/home_timeline',{count:20}, function(error, tweets, response){
					if(error)
						console.log('error: '+error);
					else{
						for(i=0;i<tweets.length;i++){
							console.log('=================\n');
							console.log(tweets[i]['created_at']);
							console.log(tweets[i].text+'\n');
						}
					}
				});
			break;
		case 'spotify-this-song':
			if(title == '')
				title = 'The+Sign%20artist:Ace+of+Base';
			spotify.search({
				type:'track',
				query: title
			}, function(err,data){
				if(err)
					return console.log('Error occured: '+err);
				else{
					console.log('Artist: ' + data.tracks.items[0].artists[0].name);
					console.log('Track Name: '+data.tracks.items[0].name);
					if(data.tracks.items[0].preview_url==null)
						console.log('No Preview Avaialable');
					else
						console.log('Preview URL: '+data.tracks.items[0].preview_url);
					console.log('Album Name: '+data.tracks.items[0].album.name);
				}
			});
			break;
		case 'movie-this':
			if(title == '')
				title = 'Mr.+Nobody';
			var queryURL = 'https://www.omdbapi.com/?apikey='+omdbKey.key+'&plot=short&t='+title;
			request(queryURL,function(error,response,body){
				if(error)
					return console.log('error:',error);
				else if(response.statusCode == 200){
					var parsed = JSON.parse(body);
					console.log('Title: ' + parsed['Title']);
					console.log('Release Year: '+parsed.Year);
					console.log('IMDB Rating: '+parsed.Ratings[0].Value);
					console.log('Rotten Tomatoes Rating: '+parsed.Ratings[1].Value);
					console.log('Country of Origin: '+parsed.Country);
					console.log('Language: '+parsed.Language);
					console.log('Plot: '+parsed.Plot);
					console.log('Actors: '+parsed.Actors);
				}
			});
			break;
		case 'do-what-it-says':
			fs.readFile('random.txt', 'utf8',function(error, data){
				if(error)
					console.log('error: ' + error);
				else{
					var dataArr = data.split(',');
					query(dataArr[0],dataArr[1]);
				}
			});
			break;
		default:
			break;
	};
}

query(command[0],title);