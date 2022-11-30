const { createCommunity, getCommunitiesModeratedByUserId, getCommunitiesByUserId, setCommunityDescription, joinCommunity, getCommunityInfo } = require('../controllers/Community')

const router = require('express').Router()

router.post("/createCommunity", createCommunity)
router.get("/getCommunitiesModeratedByUserId/:id", getCommunitiesModeratedByUserId)
router.get("/getCommunitiesByUserId/:id", getCommunitiesByUserId)
router.get("/getCommunityInfo/:communityName", getCommunityInfo)
router.post("/addDescription", setCommunityDescription)
router.post("/joinCommunity", joinCommunity)

module.exports = router;
