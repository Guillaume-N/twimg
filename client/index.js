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
					})
			.catch(function (error) {
				console.log(error);
			});
		}
	}

	const app = new Vue({
		el: "#twimg",
		data: { 
			hashtag: "",
			images: ""
		},
		methods: {
			getImages: () => refreshImages()
		}
	});	

	setInterval(refreshImages, 30000);
};