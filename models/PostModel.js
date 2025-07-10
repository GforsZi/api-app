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

const getPost = async (data) => {
  let post = await prisma.posts.findUnique({
    where: { id: data.id },
    include: {
      users: true,
    },
  })

  // const value = {
  // id: post.id,
  // title: post.title,
  // description: post.description,
  // imageUrl: post.imageUrl,
  // createdAt: toLocalTime(post.createdAt),
  // updatedAt: toLocalTime(post.updatedAt),
  // }

  // return value
}

const createPost = async (data) => {
  await prisma.posts.create({
    data: {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      users: {
        connect: [{ id: data.userId }],
      },
    },
  })
}

const updatePost = async (data) => {
  await prisma.posts.update({
    where: { id: data.id },
    data: { title: data.title, description: data.description, imageUrl: data.imageUrl },
  })
}

const deletePost = async (data) => {
  await prisma.posts.delete({
    where: { id: data.id },
  })
}

module.exports = { getAllPost, getPost, createPost, updatePost, deletePost }
