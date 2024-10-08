import prisma from "../../../config/db.js";

// Create a new post
const createPost = (id, data) => {
  return prisma.post.upsert({
    where: {
      postId: id,
    },
    create: data,
    update: data,
  });
};

// Delete a post
const deletePost = (postId) => {
  return prisma.post.delete({
    where: {
      postId: +postId,
    },
  });
};

// Get all posts
const getAllPosts = (searchSchema, city, category) => {
  return prisma.post.findMany({
    where: {
      city: city !== "" ? city : undefined,
      category: category !== "" ? category : undefined,
      OR: searchSchema,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Get a single post
const getSinglePost = (postId) => {
  return prisma.post.findUnique({
    where: {
      postId: +postId,
    },
    include: {
      user: {
        select: {
          userId: true,
          name: true,
          email: true,
          image: true,
        },
      },
      _count: {
        select: {
          favorites: true,
        },
      },
    },
  });
};

// Get favorite
const getFavorite = (userId, postId) => {
  return prisma.favorite.findFirst({
    where: {
      userId: +userId,
      postId: +postId,
    },
  });
};

// Get favorite
const removeFavorite = (favId) => {
  return prisma.favorite.delete({
    where: {
      favId: +favId,
    },
  });
};

// Add post to favorites
const addPostToFavorite = (userId, postId) => {
  return prisma.favorite.create({
    data: {
      userId: +userId,
      postId: +postId,
    },
  });
};

const service = {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  getFavorite,
  removeFavorite,
  addPostToFavorite,
};

export default service;
