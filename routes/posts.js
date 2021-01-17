const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

// Create A post for specific user - Create
router.post('/:uid', async (req, res) => {
	const post = new Post({
		userID: req.params.uid,
		title: req.body.title,
		description: req.body.description
	})

	try{
		const savedPost = await post.save();
		res.json(savedPost)
	} catch (err) {
		res.json({ message: err })
	}
});

// Get All Posts for specific user - Read
router.get('/:uid', async(req, res) => {
	try {
		const posts = await Post.find({ userID: { $eq: req.params.uid } });
		console.log(posts)
		res.json(posts);
	} catch(err) {
		res.json({ message: err });
	}
});

// Get Specific Post of user - Read
router.get('/:uid/:postId', async(req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		if (post.userID === req.params.uid) {
			res.json(post);
		} else {
			res.json({ message: "Incorrect User" });
		}
	} catch(err) {
		res.json({ message: err });
	}
});

// Update Specific Post of a user - Update
router.patch('/:uid/:postId', async (req, res) => {
	try {
		const updatedPost = await Post.updateOne({ _id: req.params.postId, userID: { $eq: req.params.uid } }, {
			$set: {
				title: req.body.title
			}
		});
		res.json(updatedPost);
	} catch(err) {
		res.json({ message: err });
	}
});

// Delete Specific Post of a user - Delete
router.delete('/:uid/:postId', async(req, res) => {
	try {
		const removedPost = await Post.remove({ _id: req.params.postId, userID: { $eq: req.params.uid } });
		res.json(removedPost);
	} catch(err) {
		res.json({ message: err });
	}
});

module.exports = router;