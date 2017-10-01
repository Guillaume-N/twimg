window.onload = function() {

	const apiUrl = 'http://localhost:8081/api/images';
	const http = axios;

	const refreshImages = () => {
		if(app.hashtag) {
			let hashtag = app.hashtag;
			if(app.hashtag[0] == "#") hashtag = app.hashtag.substring(1);

			http.get(apiUrl+'/'+hashtag)
			.then(function (response) {
				console.log(response.data);
				response.data.map(image => {
					image.timeAgo = minutesSinceTweetWasPosted(image.date);
				})
				app.images = response.data;
				window.img = response.data;
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	}

	//TODO: Refactor minutesSinceTweetWasPosted and getClass
	const minutesSinceTweetWasPosted = date => {
		const now = new Date();
		const tweetDate = new Date(date);
		let diff = new Date(now - tweetDate);

		console.log('Hour diff', diff, diff.getHours());

		if(now.getHours() > tweetDate.getHours()) return 'more than an hour ago';
		if(diff.getMinutes() == 0) return 'less than a minute ago';
		if(diff.getMinutes() == 1) return 'A minute ago';
		return `${diff.getMinutes()} minutes ago`;
	}

	const getClass = image => {
		const now = new Date();
		const imageDate = new Date(image.date);
		let diff = new Date(now - imageDate);

		console.log('diff', diff.getMinutes());

		if (diff.getMinutes() < 1) return 'lessThan1';
		if (diff.getMinutes() >= 15) return 'moreThan15';
		return 'inBetween';
	}

	const app = new Vue({
		el: "#twimg",
		data: { 
			hashtag: "#sneakers",
			images: ""
		},
		methods: {
			getImages: refreshImages,
			getClass: getClass
		}
	});	

	app.getImages();
	setInterval(refreshImages, 30000);
};