import { Router, Request, Response } from "express";
import postController from "./controllers/postController";
import { multerConfig } from "./config/uploader";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  return res.send("Servidor  funcionando!");
});

// posts
routes.get("/get-posts", postController.getPosts);
routes.post("/create-post", multerConfig, postController.createPost);
routes.put("/update-post/:id", multerConfig, postController.updatePost);
routes.delete("/delete-post/:id", postController.deletePost);

export default routes;
