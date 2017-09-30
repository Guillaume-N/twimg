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
				app.images = response.data;
				window.img = response.data;
			})
			.catch(function (error) {
				console.log(error);
			});
		}
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