import { v2 } from 'cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import Datauri from 'datauri/parser'
import path from 'path'

const dUri = new Datauri()
dotenv.config()

export const convertBufferToString = (req: Request) =>
  dUri.format(path.extname(req?.file?.originalname || '').toString(), req?.file?.buffer || '').content

const storage = multer.memoryStorage()

export const multerConfig = multer({ storage }).single('image')


export const cloudinaryConfig = (req: Request, res: Response, next: NextFunction) => {
  v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
  next()
}

export const uploader = v2.uploader
