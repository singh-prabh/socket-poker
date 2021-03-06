import http from 'http';
import SocketIO from 'socket.io';
import express from 'express';
import { createStore } from 'redux';
import pokerApp from '../reducers';

import monk from 'monk';

let db = monk('localhost:27017/poker');
let sessions = db.get('sessions');

let app = express();
let server = http.Server(app);
let io = new SocketIO(server, { path: '/socket' });

app.get('/session/:id', (req, res) => {
	let id = req.params.id;
	sessions.findById(id, (err, doc) => {
		if(err) {
			res.json(err);
			return;
		}
		console.log('found session: ' + doc._id);
		let store = createStore(pokerApp, doc);
		let state = store.getState();
		res.json(state);
	});
});

app.post('/session', (req, res) => {
	let store = createStore(pokerApp);
	let state = store.getState();
	sessions.insert(state).then((doc) => {;
		console.log('create session: ' + doc._id);
		res.json(state);
	});
});

io.on('connection', (socket) => {
	console.log('client connect');

	socket.on('join', (id) => {
		console.log('joining room: ' + id);
		socket.join(id);
	});

	socket.on('action', (action) => {
		console.log('got action ' + action.type + ' with session id: ' + action.id);

		sessions.findById(action.id, (err, doc) => {
			doc.id = doc._id;
			let store = createStore(pokerApp, doc);
			store.subscribe(() => {
				let state = store.getState();
				sessions.update({_id: state.id}, state);
			});
			store.dispatch(action);
		});

		let emit_action = Object.assign({}, action, {distributed: true});
		socket.broadcast.to(action.id).emit('action', emit_action);
	});
});

server.listen(process.env.PORT || 5000);
console.log(`Started on port ${server.address().port}`);
