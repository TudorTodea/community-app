const Like = require('../models/Like');
const Dislike = require('../models/Dislike');

module.exports.upLike = async (req, res, next) => {
  try {
    let variable = {};
    if (req.body.commentId) {
      variable = { commentId: req.body.commentId, userId: req.body.userId };
    } else {
      variable = { postId: req.body.postId, userId: req.body.userId };
    }
    const like = await Like.create(variable)
    Dislike.findOneAndDelete(variable).exec((err, disLikeResult) => {
      if (err) return res.status(400).json({ status: false, err });
      res.status(200).json({ status: true });
    });

  } catch (err) {
    next(err);
  }
}

module.exports.upDislike = async (req, res, next) => {
  try {
    let variable = {};
    if (req.body.commentId) {
      variable = { commentId: req.body.commentId, userId: req.body.userId };
    } else {
      variable = { postId: req.body.postId, userId: req.body.userId };
    }
    const dislike = await Dislike.create(variable);
    Like.findOneAndDelete(variable).exec((err, likeResult) => {
      if (err) return res.status(400).json({ status: false, err });
      res.status(200).json({ status: true });
    });

  } catch (err) {
    next(err);
  }
}

module.exports.getLikes = async (req, res, next) => {
  try {
    let variable = {};
    let populateString = '';
    if (req.body.commentId) {
      variable = { commentId: req.body.commentId };
      populateString = 'commentId';
    } else {
      variable = { postId: req.body.postId };
      populateString = 'postId';
    }
    const likes = await Like.find(variable)
    const dislikes = await Dislike.find(variable)
    const nrlikes = await Like.find(variable).populate(populateString).count();
    const nrdislikes = await Dislike.find(variable).populate(populateString).count();
    const likeDislikeDiff = nrlikes - nrdislikes
    res.status(200).json({ status: true, likeDislikeDiff, likes, dislikes });
  } catch (err) {
    next(err);
  }
}

module.exports.unLike = async (req, res, next) => {
  try {
    Like.findOneAndDelete({ commentId: req.body.commentId, userId: req.body.userId }).exec((err, result) => {
      if (err) return res.status(400).json({ status: false, err });
      res.status(200).json({ status: true });
    });
  } catch (err) {
    next(err);
  }
}

module.exports.unDislike = async (req, res, next) => {
  try {
    Dislike.findOneAndDelete({ commentId: req.body.commentId, userId: req.body.userId }).exec((err, result) => {
      if (err) return res.status(400).json({ status: false, err });
      res.status(200).json({ status: true });
    });
  } catch (err) {
    next(err);
  }
}