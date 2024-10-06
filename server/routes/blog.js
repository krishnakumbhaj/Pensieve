const express = require('express')

const { createBlog, getBlogs, getBlog, updateBlog, deleteBlog } = require('../controllers/blogController')   

const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

router.use(requireAuth)


// create a blog
router.post('/create', createBlog)

// get all blogs
router.get('/', getBlogs)

// get a blog
router.get('/:id', getBlog)

// update a blog
router.put('/:id', updateBlog)

// delete a blog
router.delete('/:id', deleteBlog)

module.exports = router

