window.onload = function() {

	const apiUrl = 'http://localhost:8081/api/images';
	const http = axios;

	const app = new Vue({
		el: "#images",
		data: { 
			text: "blabla"
		},
		methods: {
			getImages: () => {
				http.get(apiUrl+'/cat')
				.then(function (response) {
					console.log(response.data);
				})
				.catch(function (error) {
					console.log(error);
				});
			}
		}
	});


	app.getImages();


};