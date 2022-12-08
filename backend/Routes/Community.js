const { createCommunity, getCommunitiesModeratedByUserId, getCommunitiesByUserId, setCommunityDescription, joinCommunity, getCommunityInfo, searchCommunities
    , communityAddImage, getRandomCommunities } = require('../controllers/Community')

const router = require('express').Router()

router.post("/createCommunity", createCommunity)
router.get("/getCommunitiesModeratedByUserId/:id", getCommunitiesModeratedByUserId)
router.get("/getCommunitiesByUserId/:id", getCommunitiesByUserId)
router.get("/getCommunityInfo/:communityName", getCommunityInfo)
router.get("/searchCommunities", searchCommunities)
router.get("/getRandomCommunities/", getRandomCommunities)
router.post("/addDescription", setCommunityDescription)
router.post("/joinCommunity", joinCommunity)
router.post("/communityAddImage", communityAddImage)
module.exports = router;
