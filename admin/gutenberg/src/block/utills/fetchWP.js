import axios from "axios";

export const getStreams = () =>
	axios
		.get(window.location.origin + "/wp-json/rx-insta-feed/v1/getAllStreams")
		.then(function(response) {
			return response.data.streams;
		})
		.catch(function(error) {
			// handle error
			console.log(error);
		});
