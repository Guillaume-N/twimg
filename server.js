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
  // INSERT CREDENTIALS HERE
})

T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
  console.log(data)
})


app.get('/', (req, res, next) => {
	res.sendFile(__dirname + '/index.html');
});


// all routes will be prefixed with /api
app.use('/api', router);


router.route('/images')
.get((req, res, next) => {
	res.json({text: "hello"});
})


app.listen(port);
console.log(`Server running on port ${port}`);