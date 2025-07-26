const BlogPost = require("../models/BlogPost");

// Create a blog post
const createBlog = async (req, res) => {
  try {
    const blog = req.body;
    console.log(req.body);
    const newBlog = await BlogPost.create(blog);
    res.status(200).send({ message: "Blog Post Successfully Created", data: newBlog });
  } catch (error) {
    res.status(500).send({ message: `Error occurred when adding`, error: error.message });
  }
};

// Get all blog posts
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).send(blogs);
  } catch (error) {
    res.status(500).send({ message: "Error occurred when fetching blogs", error: error.message });
  }
};

// Get single blog post by ID
const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogPost.findByPk(id);
    if (!blog) {
      return res.status(404).send({ message: "Blog post not found" });
    }
    res.status(200).send(blog);
  } catch (error) {
    res.status(500).send({ message: "Error occurred when fetching blog", error: error.message });
  }
};

// Get single blog post by slug
const getSingleBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await BlogPost.findOne({ where: { slug } });

    if (!blog) {
      return res.status(404).send({ message: "Blog post not found" });
    }

    res.status(200).send(blog);
  } catch (error) {
    res.status(500).send({ message: "Error occurred when fetching blog", error: error.message });
  }
};

// Update blog post by ID
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await BlogPost.update(req.body, { where: { id } });
    if (updated[0] === 0) {
      return res.status(404).send({ message: "Blog post not found or no changes made" });
    }
    res.status(200).send({ message: "Blog post updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error occurred when updating blog", error: error.message });
  }
};

// Delete blog post by ID
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await BlogPost.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).send({ message: "Blog post not found" });
    }
    res.status(200).send({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error occurred when deleting blog", error: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  getSingleBlogBySlug,
  updateBlog,
  deleteBlog,
};
