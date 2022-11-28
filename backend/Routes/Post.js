const { createPost,getPosts,getRecentPosts,getPostById } = require('../controllers/Post')

const router=require('express').Router()

router.post("/createPost",createPost)
router.get("/getRecentPosts",getRecentPosts)
router.get("/getPosts/:communityName",getPosts)
router.get("/getPostById/:postId",getPostById)


module.exports=router;
