
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
      { $push: { members: creatorId, mods: creatorId } },
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
    const communities = await Community.find({ mods: userId });
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
    const community = await Community.findOne({ Name: communityName })
    if (community) {
      const communityCount = await Community.findOne({ Name: communityName })
      const count = communityCount.members.length
      return res.json({ status: true, community, count })
    } else {
      return res.json({ status: false, error: 'Community not found' })
    }
  } catch (err) {
    next(err);
  }
}

module.exports.searchCommunities = async (req, res, next) => {
  try {
    const { Name } = req.query

    const agg = [
      {
        $search: {
          autocomplete: {
            query: Name,
            path: 'Name',
            fuzzy: {
              maxEdits: 2,
            },
          },
        },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 0,
          Name: 1,
          avatar: 1
        },
      },
    ]
    const response = await Community.aggregate(agg)
    return res.json(response)
  } catch (error) {
    console.log(error)
    return res.json([])
  }
}



module.exports.getRandomCommunities = async (req, res, next) => {
  try {
    const communities = await Community.aggregate([{ $sample: { size: 5 } }]);
    if (communities) {
      res.json({ status: true, communities })
    } else {
      res.json({ status: false })
    }
  } catch (err) {
    next(err);
  }
}

module.exports.communityAddImage = async (req, res, next) => {
  try {
    const { avatar, banner, communityName } = req.body;
    if (avatar) {
      Community.findOneAndUpdate(
        { Name: communityName },
        { avatar: avatar },
        function (error, success) {
          if (error) {
            return res.json({ status: false, error })
          } else {
            console.log(success);
            return res.json({ status: true })

          }
        });
    }
    if (banner) {
      Community.findOneAndUpdate(
        { Name: communityName },
        { banner: banner },
        function (error, success) {
          if (error) {
            return res.json({ status: false, error })
          } else {
            console.log(success);
            return res.json({ status: true })

          }
        });
    }
  } catch (err) {
    next(err);
  }
}