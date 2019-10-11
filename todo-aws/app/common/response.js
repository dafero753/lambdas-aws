const response = (code, body) => {
	const response = {
		statusCode: code,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true,
			'Content-type': 'application/json'
		},
		body: JSON.stringify(body)
	};
	return response;
};

module.exports = response;