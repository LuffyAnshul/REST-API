const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
	userID: {
		type: String
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Posts', PostSchema);