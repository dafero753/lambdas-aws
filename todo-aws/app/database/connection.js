'use strict';

const { Client } = require('pg');
const config = require('../common/config');

const _executeQuery = async query => {
	const client = new Client(config.connection);
	client.connect();
	try {
		const results = await client.query(query);
		return results;
	} catch (error) {
		return error;
	} finally {
		client.end();
	}
};

module.exports = _executeQuery;