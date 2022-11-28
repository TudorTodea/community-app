const { createCommunity, getCommunitiesByUserId, } = require('../controllers/Community')

const router = require('express').Router()

router.post("/createCommunity", createCommunity)
router.get("/getCommunitiesByUserId/:id", getCommunitiesByUserId)

module.exports = router;
