const { createCommunity, getCommunitiesByUserId, getCommunityInfo, } = require('../controllers/Community')

const router = require('express').Router()

router.post("/createCommunity", createCommunity)
router.get("/getCommunitiesByUserId/:id", getCommunitiesByUserId)
router.get("/getCommunityInfo/:communityName", getCommunityInfo)

module.exports = router;
