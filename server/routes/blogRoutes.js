import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  generateContent,
  getAllBlogs,
  getBlogById,
  getBlogComments,
  togglePublish,
} from "../controllers/blogController.js";
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.js";

const blogRouter = express.Router();

// Blog management routes (protected)
blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.post("/delete", auth, deleteBlogById);
blogRouter.post("/toggle-publish", auth, togglePublish);

// AI generation route
blogRouter.post("/generate", generateContent);

// Comment routes
blogRouter.post("/add-comment", addComment);
blogRouter.get("/comments/:blogId", getBlogComments);

// Blog routes single and all
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);

export default blogRouter;
