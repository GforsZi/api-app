const {
  getAllPost,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require('../../models/PostModel.js')
const { cloudinary } = require("../../utils/cloudinary.js");
const apiResponse = require('../../utils/apiRespone.js')

exports.getAllPost = async (req, res) => {
  try {
    const posts = await getAllPost()
    res.status(200).json(apiResponse(true, 'get all post data', posts))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.getPostById = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const post = await getPostById({ id })
    res.status(200).json(apiResponse(true, 'get post data by id', post))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.createPost = async (req, res) => {
  const { title, description} = req.body

  try {
    const mediaUrl = req.file.path
    const mediaName = req.file.filename
    const posts = await createPost({ title, description, mediaUrl, publicId: mediaName, userId: req.session.userId })
    res.status(201).json(apiResponse(true, 'create post data', posts))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.updatePost = async (req, res) => {
  const id = parseInt(req.params.id)
  const { title, description, imageUrl } = req.body

  try {
    const mediaUrl = req.file.path
    const mediaName = req.file.filename
    const existing = await getPostById({ id })
    if (existing.user.id != req.session.userId ) return res.status(401).json(apiResponse(false, "permission required", null, 401))
    if (!existing) return res.status(404).json(apiResponse(false, "Media not found", null, 404))

    const posts = await updatePost({ id, title, description, mediaUrl, publicId: mediaName })
    await cloudinary.uploader.destroy(existing.publicId, {
      invalidate: true,
    })
    res.status(201).json(apiResponse(true, 'update post data', posts))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.deletePost = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const existing = await getPostById({ id })
    if (existing.user.id != req.session.userId ) return res.status(401).json(apiResponse(false, "permission required", null, 401))
    if (!existing) return res.status(404).json(apiResponse(false, "Media not found", null, 404))
    
    const posts = await deletePost({ id })
    await cloudinary.uploader.destroy(existing.publicId, {
      invalidate: true,
    })
    res.status(201).json(apiResponse(true, 'delete post data', posts))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}
