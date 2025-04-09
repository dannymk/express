const express = require('express')
const axios = require('axios');
const app = express()
const port = 3000

const options = {
	dotfiles: 'ignore',
	etag: false,
	extensions: ['htm', 'html'],
	index: false,
	maxAge: '1d',
	redirect: false,
	setHeaders (res, path, stat) {
		res.set('x-timestamp', Date.now())
	}
}
app.use(express.static('.', options))

app.get("/authors", async (request, response) => {
	let endpoint = "https://openlibrary.org/search/authors.json?q=j%20k%20rowling";
	let result = "Nothing...";
	try {
		result = await axios.get(endpoint)
			.then(apiResponse => {
				return apiResponse.data;
			})
			.catch(error => {
				console.error(error);
			});

	} catch (error) {
		console.error('Error:', error.message);
		response.status(500).send('Failed to fetch questions.');

	}
	response.send(result);
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})