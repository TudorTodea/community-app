const Comment = require("../Models/Comment");

module.exports.addComment = async (req, res, next) => {

    try {
        let commentAdded;
        if (!req.body.responseTo) {
            commentAdded = await Comment.create({
                userId: req.body.userId, postId: req.body.postId, content: req.body.content,
            })
        } else {
            commentAdded = await Comment.create({
                userId: req.body.userId, postId: req.body.postId, content: req.body.content, responseTo: req.body.responseTo
            })
        }
        const comment = await Comment.findOne({ _id: commentAdded._id }).populate('userId')

        return res.json({ comment, status: true })
    } catch (err) {
        next(err);
    }
}
module.exports.getCommentsOnPost = async (req, res, next) => {
    try {
        const count = await Comment.find({ postId: req.params.postId }).count();
        const comments = await Comment.find({ postId: req.params.postId }).populate(['userId', 'content']);
        return res.json({ comments, status: true, count })
    } catch (err) {
        next(err);
    }
}

