const {
  getAllPost,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../../models/PostModel.js')
const apiResponse = require('../../utils/apiRespone.js')

exports.getAllPost = async (req, res) => {
  try {
    const posts = await getAllPost()
    res.status(200).json(apiResponse(true, 'get all post data', posts))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.getPost = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const post = await getPost({ id })
    res.status(200).json(apiResponse(true, 'get post data by id', post))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.createPost = async (req, res) => {
  const { title, description, imageUrl } = req.body

  try {
    const posts = await createPost({ title, description, imageUrl, userId: req.session.userId })
    res.status(201).json(apiResponse(true, 'create post data', posts))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.updatePost = async (req, res) => {
  const id = parseInt(req.params.id)
  const { title, description, imageUrl } = req.body

  try {
    const posts = await updatePost({ id, title, description, imageUrl })
    res.status(201).json(apiResponse(true, 'update post data', posts))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.deletePost = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const posts = await deletePost({ id })
    res.status(201).json(apiResponse(true, 'delete post data', posts))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}
