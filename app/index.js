window.onload = function() {

const app = new Vue({
		el: "#images",
		data: { 
			text: "blabla"
		},
		methods: {
			getImages: () => console.log('get images')
		}
	});


app.getImages();


};