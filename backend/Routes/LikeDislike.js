const {upLike,upDislike,getLikes,unLike,unDislike} = require('../controllers/LikeDislike')

const router=require('express').Router()

router.post("/upLike",upLike)
router.post("/upDislike",upDislike)
router.post("/getLikes",getLikes)
router.post("/unLike",unLike)
router.post("/unDislike",unDislike)


module.exports=router;
