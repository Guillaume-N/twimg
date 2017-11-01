const express		= require('express');
const cors			= require('cors');
const bodyParser 	= require('body-parser');
const compress		= require('compression');
const Twit			= require('twit');
const app			= express();
const router 		= express.Router();
const port 			= 8081;

app.use(cors());
app.options('*', cors());
app.use('/scripts', express.static(`${__dirname}/node_modules`));
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(compress());


const T = new Twit({
	consumer_key:         '***',
	consumer_secret:      '***',
	access_token:         '***',
	access_token_secret:  '***',
  	timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

app.get('/', (req, res, next) => {
	res.sendFile(__dirname + '/index.html');
});

// all routes will be prefixed with /api
app.use('/api', router);

router.route('/images/:hashtag')
.get((req, res, next) => {
	const query = `#${req.params.hashtag}`;
	console.log('GET /images/:hashtag query: ', query);

	T.get('search/tweets', { q: query, count: 50 }).then(result => {
		res.json(formatTweets(curateTweets(result.data.statuses)));
	}).catch(err => {
		console.log('error GET /images: ', err);
	});
});


app.listen(port);
console.log(`Server running on port ${port}`);


const isPhoto = tweets => tweets.filter(tweet => tweet.extended_entities.media[0].type == 'photo').slice(0, 3);

const findTweetsContainingAnImage = tweets => tweets.filter(tweet => tweet.hasOwnProperty('extended_entities'));

const curateTweets = tweets => isPhoto(findTweetsContainingAnImage(tweets));

const formatSingleTweet = tweet => {
	return { author: tweet.user.screen_name,
			image_url: tweet.extended_entities.media[0].media_url,
			image_url_https: tweet.extended_entities.media[0].media_url_https,
			date: tweet.created_at
		}
}

const formatTweets = tweets => {
	let formattedTweets = tweets.map(formatSingleTweet);

	return formattedTweets;
}