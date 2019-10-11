'use strict';

const moment = require('moment');
const _executeQuery = require('../database/connection');

class ToDo {
	constructor() {
	}

	get description() {
		return this._description;
	}

	set description(new_value) {
		this._description = new_value;
	}

	toJSON() {
		return Object.assign({
			description:this._description,
			date: moment().format('YYYY-MM-DDTHH:mm:ssZ')
		});
	}

	createToDo(data) {
		const todoObject = this.setData(data);
		const query = `INSERT INTO public.todo_list (resource) VALUES ('${JSON.stringify(todoObject)}');`;
		return _executeQuery(query);
	}

	setData(data) {
		this._description = data.description;
		return this.toJSON();
	}

	static createToDoFromArray(payload) {
		let arr = [];
		const tasks = this.getCreateToDo(payload.todo);
		return Promise.all(arr.concat(tasks));
	}

	static getCreateToDo(todolist) {
		const todo = new ToDo();
		return todolist.map(element => {			
				todo.createToDo({
					description: element
				})
		});
	}

	static deleteToDo(toDoID){
		const query = `DELETE FROM public.todo_list WHERE id = ${toDoID}`;
		return _executeQuery(query);
	}

	static list(){
		const query = `SELECT * FROM public.todo_list`;
		return _executeQuery(query);
	}
	
	static updateToDo(payload, toDoID){
		const todo = new ToDo();
		const data = {description: payload.todo};
		const resource = todo.setData(data);
		const query = `UPDATE public.todo_list SET resource = '${JSON.stringify(resource)}' WHERE id = ${toDoID}`;
		return _executeQuery(query);
	}
}
module.exports = ToDo;
