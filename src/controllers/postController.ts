import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import { convertBufferToString, uploader } from "../config/uploader";

var cloudinary = require("cloudinary");

const prismaDB = new PrismaClient();

async function createPost(req: Request, res: Response) {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const file = convertBufferToString(req);
    if (file === undefined)
      return res
        .status(400)
        .json({ error: "Error converting buffer to string" });

    const { secure_url } = await uploader.upload(file);

    console.log(secure_url);

    const post = await prismaDB.posts.create({
      data: {
        title: req.body.title,
        image: secure_url,
        text: req.body.text,
        description: req.body.description,
        likes: req.body.likes,
        views: req.body.views,
        author: req.body.author,
      },
    });
    return res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ error: error });
  }
}

async function getPosts(req: Request, res: Response) {
  try {
    const data = await prismaDB.posts.findMany();
    return res.json(data);
  } catch (error) {
    return res.status(400).json({ error: "Failed to fetch posts" });
  }
}

export default {
  createPost,
  getPosts,
};
