'use strict';

const ToDo = require('../model/todo');
const response = require('../common/response');
const { isEmpty, get } = require('lodash');

const create = (event, context, callback) => {
	let payload;
	try {
		payload = JSON.parse(event.body);
	} catch (error) {
		console.log(error);
	}

	ToDo.createToDoFromArray(payload)
		.then(result => {
			return callback(null, response(201, {message: 'Successful creation of a resource.'}));
		})
		.catch(error => {
			return callback(null, response(500, error));
		});
};

const deleteToDO = (event, context, callback) => {
	const qs = get(event, 'queryStringParameters', {});
	const toDoID = Number(get(qs, 'id', null));

	ToDo.deleteToDo(toDoID)
		.then(result => {
			return callback(null, response(200, {message:'No error, operation successful.'}));
		})
		.catch(error => {
			return callback(null, response(500, error));
		});
};

const list = (event, context, callback) => {

	ToDo.list()
		.then(result => {
			result = (isEmpty (result.rows)) ? {} : result.rows;
			return callback(null, response(200, {data: result}));
		})
		.catch(error => {
			return callback(null, response(500, error));
		});
};

const update = (event, context, callback) => {
	let payload;
	const qs = get(event, 'queryStringParameters', {});
	const toDoID = Number(get(qs, 'id', null));
	try {
		payload = JSON.parse(event.body);
	} catch (error) {
		console.log(error);
	}
	ToDo.updateToDo(payload, toDoID)
	.then(result => {
		return callback(null, response(201, {message: 'The request was received.'}));
	})
	.catch(error => {
		return callback(null, response(500, error));
	});
};


const handler = (event, context, callback) => {
	if (event.httpMethod.toUpperCase() === 'POST') {
		create(event, context, callback);
	}
	if (event.httpMethod.toUpperCase() === 'DELETE') {
		deleteToDO(event, context, callback);
	}
	if (event.httpMethod.toUpperCase() === 'GET') {
		list(event, context, callback);
	}
	if (event.httpMethod.toUpperCase() === 'PUT') {
		update(event, context, callback);
	}
};

module.exports.handler = handler;
