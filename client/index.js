window.onload = () => {

	const apiUrl = 'http://localhost:8081/api/images';
	const http = axios;

	const getImages = () => {
		app.images = [];

		if(app.hashtag) {
			let hashtag = app.hashtag;
			if(app.hashtag[0] == "#") hashtag = app.hashtag.substring(1);

			http.get(apiUrl+'/'+hashtag)
			.then(response => {
				response.data.map(image => {
					image.timeAgo = textTimeAgo(image.date);
				});
				app.images = response.data;
				window.img = response.data;
			})
			.catch(err => console.log(err));
		}
	}

	//TODO: REFACTOR!

	const textTimeAgo = date => {
		const now = new Date();
		const tweetDate = new Date(date);
		const diff = new Date(now - tweetDate);

		if(now.getHours() > tweetDate.getHours()) return 'more than an hour ago';
		if(diff.getMinutes() == 0) return 'less than a minute ago';
		if(diff.getMinutes() == 1) return 'a minute ago';
		return `${diff.getMinutes()} minutes ago`;
	}

	const setClass = date => {
		const now = new Date();
		const tweetDate = new Date(date);
		const diff = new Date(now - tweetDate);

		if (diff.getMinutes() < 1) return 'lessThan1';
		if (now.getHours() > tweetDate.getHours() || diff.getMinutes() >= 15) return 'moreThan15';
		return 'inBetween';
	}

	const setTextColor = date => {
		const now = new Date();
		const tweetDate = new Date(date);
		const diff = new Date(now - tweetDate);

		if(now.getHours() > tweetDate.getHours() || diff.getMinutes() >= 15) return '#666666';
		if (diff.getMinutes() < 1) return '#336699';
		return '#00d1b2';
	}

	const app = new Vue({
		el: "#twimg",
		data: { 
			hashtag: "#sneakers",
			images: []
		},
		methods: {
			getImages: getImages,
			setClass: setClass,
			setTextColor: setTextColor
		}
	});	

	app.getImages();
	setInterval(getImages, 30000);
};