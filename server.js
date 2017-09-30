const express		= require('express');
const cors			= require('cors');
const app			= express();
const bodyParser 	= require('body-parser');
const compress		= require('compression');
const Twit			= require('twit');

app.use(cors());
app.options('*', cors());
app.use('/scripts', express.static(`${__dirname}/node_modules`));
app.use(express.static(__dirname + '/client'));
console.log('dir: ' + __dirname);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(compress());

const port = 8081;
const router = express.Router();

const T = new Twit({
	//CREDENTIALS
})


const isPhoto = tweets => tweets.filter(tweet => tweet.extended_entities.media[0].type == 'photo').slice(0, 3);

const findTweetsContainingAnImage = tweets => tweets.filter(tweet => tweet.hasOwnProperty('extended_entities'));

const curateTweets = tweets => isPhoto(findTweetsContainingAnImage(tweets));

const formatTweets = tweets => {
	let formattedTweets = [];
	tweets.map(tweet => {
		let formattedTweet = {
			author: tweet.user.screen_name,
			image_url: tweet.extended_entities.media[0].media_url,
			image_url_https: tweet.extended_entities.media[0].media_url_https,
			date: tweet.created_at
		}
		formattedTweets.push(formattedTweet);
	});
	return formattedTweets;
}


app.get('/', (req, res, next) => {
	res.sendFile(__dirname + '/index.html');
});

// all routes will be prefixed with /api
app.use('/api', router);

router.route('/images/:hashtag')
.get((req, res, next) => {
	const query = `${req.params.hashtag} filter:images`;
	console.log('GET /images/:hashtag query: ', query);

	T.get('search/tweets', { q: query, count: 50 }).then(function(result) {
		res.json(formatTweets(curateTweets(result.data.statuses)));
	}).catch(function(err) {
		console.log('error GET /images: ', err);
	})
});


app.listen(port);
console.log(`Server running on port ${port}`);