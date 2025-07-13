const { getAllCommentByIdPost, createComment, deleteComment } = require('../../models/CommentModel')
const apiResponse = require('../../utils/apiRespone.js')

exports.getAllCommentByIdPost = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId)
    const comments = await getAllCommentByIdPost({ postId })
    res.status(200).json(apiResponse(true, 'get all data comment by post id', comments))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.createComment = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId)
    const { content } = req.body
    const comment = await createComment({ content, userId: req.session.userId, postId })
    res.status(201).json(apiResponse(true, 'create comment data', comment))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}

exports.deleteComment = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const comment = await deleteComment({ id })
    res.status(201).json(apiResponse(true, 'delete comment data', comment))
  } catch (error) {
    res.status(500).json(apiResponse(false, error.message, null, 500))
  }
}
