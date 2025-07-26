const express = require("express");
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  getSingleBlogBySlug,
  updateBlog,
  deleteBlog
} = require("../controller/BlogPostController")

router.post("/addblog", createBlog);
router.get("/getblog", getAllBlogs);
router.get("/getsingle/:id", getSingleBlog);
router.get("/getslug/:slug" , getSingleBlogBySlug)
router.put("/update/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);


module.exports = router;