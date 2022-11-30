
const Community = require('../Models/Community')

module.exports.createCommunity = async (req, res, next) => {
  try {
    const { Name, creatorId } = req.body
    const comunityexists = await Community.findOne({ Name });
    if (comunityexists)
      return res.json({ msg: "A community with that name already exists", status: false })

    const community = await Community.create({
      Name, creatorId
    });

    Community.findOneAndUpdate(
      { Name },
      { $push: { members: creatorId } },
      function (error, success) {
        if (error) {
        } else {
        }
      });

    return res.json({ status: true, community })
  } catch (err) {
    next(err);
  }
}
module.exports.getCommunitiesModeratedByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id
    const communities = await Community.find({ creatorId: userId });
    return res.json({ status: true, communities })
  } catch (err) {
    next(err);
  }
}
module.exports.getCommunitiesByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id
    const communities = await Community.find({ members: userId },)
    return res.json({ status: true, communities })
  } catch (err) {
    next(err);
  }
}
module.exports.setCommunityDescription = async (req, res, next) => {
  try {

    Community.findOneAndUpdate(
      { Name: req.body.communityName },
      { description: req.body.description },
      function (error, success) {
        if (error) {
          return res.json({ status: false, error })
        } else {
          return res.json({ status: true })
        }
      });
  } catch (err) {
    next(err);
  }
}

module.exports.joinCommunity = async (req, res, next) => {
  try {
    const { communityName, userId } = req.body;
    const user = await Community.findOne({ Name: communityName, members: userId });
    if (user) {
      Community.findOneAndUpdate(
        { Name: communityName },
        { $pull: { members: userId } },
        function (error, success) {
          if (error) {
            return res.json({ status: false, error })
          } else {
            return res.json({ status: true })
          }
        });
    } else {
      Community.findOneAndUpdate(
        { Name: communityName },
        { $push: { members: userId } },
        function (error, success) {
          if (error) {
            return res.json({ status: false, error })
          } else {
            return res.json({ status: true })
          }
        });
    }

  } catch (err) {
    next(err);
  }
}

module.exports.getCommunityInfo = async (req, res, next) => {
  try {
    const { communityName } = req.params;
    const communityCount = await Community.findOne({ Name: communityName })
    const count = communityCount.members.length
    const community = await Community.findOne({ Name: communityName })

    return res.json({ status: true, community, count })

  } catch (err) {
    next(err);
  }
}

