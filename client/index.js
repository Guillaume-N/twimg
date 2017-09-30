window.onload = function() {

	const apiUrl = 'http://localhost:8081/api/images';
	const http = axios;

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

	const refreshImages = () => {
		if(app.hashtag) {
			if(app.hashtag[0] == "#") app.hashtag = app.hashtag.substring(1);

			http.get(apiUrl+'/'+app.hashtag)
			.then(function (response) {
						//console.log(response.data);
						app.images = response.data;
						console.log('images', app.images);
					})
			.catch(function (error) {
				console.log(error);
			});
		}
	}

	setInterval(refreshImages, 30000);


	//app.getImages();


};