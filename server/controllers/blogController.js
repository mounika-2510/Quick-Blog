import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/blog.js";
import Comment from "../models/comment.js";
import main from "../configs/gemini.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.upload({
      file: fileBuffer, // required
      fileName: imageFile.originalname, // required
      folder: "/blogs", // optional
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: 1280 },
      ],
    });

    const image = optimizedImageUrl;

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      isPublished,
      image,
    });

    res.json({
      success: true,
      message: "Blog added successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({
      success: true,
      blogs,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  const { blogId } = req.params;

  try {
    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required",
      });
    }

    if (!blogId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Blog ID format",
      });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("Get blog by ID error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBlogById = async (req, res) => {
  const { blogId } = req.body;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({
        success: false,
        message: "Blog not found",
      });
    }

    await Comment.deleteMany({ blogId });
    await Blog.findByIdAndDelete(blogId);

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const togglePublish = async (req, res) => {
  const { blogId } = req.body;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({
      success: true,
      message: "Blog publication status updated",
      blog,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blogId, name, content } = req.body;

    console.log("Received comment data:", { blogId, name, content });

    if (!blogId || !name || !content) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.json({
        success: false,
        message: "Blog not found",
      });
    }

    await Comment.create({
      blogId,
      name,
      content,
    });

    res.json({
      success: true,
      message: "Comment added for review",
    });
  } catch (error) {
    console.error("Add comment error:", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
export const getBlogComments = async (req, res) => {
  const { blogId } = req.params;

  try {
    // Validate blogId
    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required",
      });
    }

    // Fetch only approved comments for this blog
    const comments = await Comment.find({
      blogId,
      isApproved: true,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error("Get blog comments error:", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(
      prompt + " Generate a blog content for this topic in simple text format"
    );
    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
