const { register, login, getUser, updateUserAvatar, setUserDescription, updateSocialMedia } = require('../controllers/User')

const router = require('express').Router()

router.post("/register", register)
router.post("/login", login)
router.put('/updateSocialMedia', updateSocialMedia)
router.get("/getUser/:username", getUser)
router.put('/updateUserAvatar', updateUserAvatar)
router.post("/setUserDescription", setUserDescription)
module.exports = router;
