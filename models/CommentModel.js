const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { toLocalTime } = require('../utils/convertTimezone')

const getAllCommentByIdPost = async (data) => {
  const comments = await prisma.comments.findMany({
    where: { postId: data.postId },
    include: { user: true },
  })

  const result = comments.map((comment) => ({
    content: comment.content,
    createdAt: toLocalTime(comments.createdAt),
    user: {
      id: comment.user.id,
      name: comment.user.name,
      photoProfileUrl: comment.user.photoProfileUrl,
    },
  }))

  return result
}

const createComment = async (data) => {
  await prisma.comments.create({
    data: {
      content: data.content,
      user: { connect: { id: data.userId } },
      post: { connect: { id: data.postId } },
    },
  })
}

const deleteComment = async (data) => {
  await prisma.comments.delete({
    where: { id: data.id },
  })
}

module.exports = { getAllCommentByIdPost, createComment, deleteComment }
