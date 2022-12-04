const {addComment,getCommentsOnPost } = require('../controllers/Comment')

const router=require('express').Router()

router.post("/addComment",addComment)
router.get("/getComments/:postId",getCommentsOnPost)

module.exports=router;
