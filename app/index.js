window.onload = function() {

	const apiUrl = '';
	const http = axios;

	const app = new Vue({
		el: "#images",
		data: { 
			text: "blabla"
		},
		methods: {
			getImages: () => {
				http.get(apiUrl)
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
			}
		}
	});


	//app.getImages();


};