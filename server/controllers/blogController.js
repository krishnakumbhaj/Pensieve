const Blog = require('../models/blogModel');
const User = require('../models/userModel');

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user._id; // Assuming the user's ID is available in req.user

    // Validate input data (optional)

    if (!title) {
      return res.status(400).json({ message: 'Please add the title' });
    }
    if (!content) {
      return res.status(400).json({ message: 'Blog can not be empty ' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newBlog = new Blog({
      title,
      content,
      author: user._id,
    });

    await newBlog.save();

    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all blog posts
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author'); // Populate the author field
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific blog post by ID
const getBlog = async (req, res) => {
  try {
    const { authorId } = req.body; // Assuming author ID is in the request body

    let query = { _id: req.params.id }; // Default query by ID
    if (authorId) {
      query = { _id: req.params.id, author: authorId }; // Add author ID filter
    }

    const blog = await Blog.findById(query).populate('author');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a blog post by ID
const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findByIdAndUpdate(req.params.id, { title, content }, { new: true }).populate('author');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a blog post by ID
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
};