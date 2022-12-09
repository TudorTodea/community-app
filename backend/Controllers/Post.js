const Post = require('../Models/Post');
const Community = require('../Models/Community')
module.exports.createPost = async (req, res, next) => {
    try {
        if (!req.body.title || !req.body.content) {
            return res.json({ status: false, msg: 'Please complete all fields' })
        }
        const community = await Community.findOne({ Name: req.body.Name }).select(["_id"])
        if (!community) {
            return res.json({ status: false, msg: 'Community not found' })
        }
        const post = await Post.create({
            writer: req.body.writer, communityId: community._id, title: req.body.title, content: req.body.content
        });
        return res.json({ post, status: true })

    } catch (err) {
        next(err);
    }
}
module.exports.getPosts = async (req, res, next) => {
    try {
        const community = await Community.findOne({ Name: req.params.communityName }).select(["_id"])
        const posts = await Post.find({ communityId: community._id }).sort({ _id: -1 }).populate(['communityId', 'writer']).exec(function (err, posts) {
            if (err) return res.json({ err, status: false })
            return res.json({ posts, status: true })
        });


    } catch (err) {
        next(err);
    }
}
module.exports.getRecentPosts = async (req, res, next) => {
    try {
        const data = await Post.find({}).sort({ _id: -1 }).populate(['writer', 'communityId', 'title', 'content']);
        res.json({ status: true, data })

    } catch (err) {
        next(err);
    }
}
module.exports.getPostById = async (req, res, next) => {
    try {

        const post = await Post.findOne({ _id: req.params.postId }).populate(['communityId', 'writer', 'title', 'content']).exec(function (err, post) {
            if (err) return res.json({ err, status: false })
            return res.json({ post, status: true })
        });


    } catch (err) {
        next(err);
    }
}
