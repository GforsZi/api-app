const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { toLocalTime } = require('../utils/convertTimezone')

const getAllPost = async () => {
  const posts = await prisma.posts.findMany()

  const result = posts.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    imageUrl: post.imageUrl,
    createdAt: toLocalTime(post.createdAt),
    updatedAt: toLocalTime(post.updatedAt),
  }))

  return result
}

const getPostById = async (data) => {
  let post = await prisma.posts.findUnique({
    where: { id: data.id },
    include: {
      users: true,
    },
  })

  const value = {
  id: post.id,
  title: post.title,
  description: post.description,
  mediaUrl: post.mediaUrl,
  publicId: post.publicId,
  createdAt: toLocalTime(post.createdAt),
  updatedAt: toLocalTime(post.updatedAt),
  user: {
    id: post.users[0].id,
    name: post.users[0].name,
    email: post.users[0].email,
    photoProfileUrl: post.users[0].photoProfileUrl,
  },
  }

  return value
}

const createPost = async (data) => {
  await prisma.posts.create({
    data: {
      title: data.title,
      description: data.description,
      mediaUrl: data.mediaUrl,
      publicId: data.publicId,
      users: {
        connect: [{ id: data.userId }],
      },
    },
  })
}

const updatePost = async (data) => {
  await prisma.posts.update({
    where: { id: data.id },
    data: { 
      title: data.title,
      description: data.description,
      mediaUrl: data.mediaUrl,
      publicId: data.publicId,
    },
  })
}

const deletePost = async (data) => {
  await prisma.posts.delete({
    where: { id: data.id },
  })
}

module.exports = { getAllPost, getPostById, createPost, updatePost, deletePost }
