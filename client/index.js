window.onload = function() {

	const apiUrl = 'http://localhost:8081/api/images';
	const http = axios;

	const app = new Vue({
		el: "#twimg",
		data: { 
			text: "blabla",
			hashtag: ""
		},
		methods: {
			getImages: function() {
				console.log(this.hashtag);
				if(this.hashtag) {

					if(this.hashtag[0] == "#") this.hashtag = this.hashtag.substring(1);
					
					http.get(apiUrl+'/'+this.hashtag)
					.then(function (response) {
						console.log(response.data);
					})
					.catch(function (error) {
						console.log(error);
					});
				}

			}
		}
	});


	//app.getImages();


};