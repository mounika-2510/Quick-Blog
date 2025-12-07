import jwt from "jsonwebtoken";
import "dotenv/config";
import Blog from "../models/blog.js";
import Comment from "../models/comment.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ success: false, message: "Invalid Email" });
    } else if (password !== process.env.ADMIN_PASSWORD) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blogId")
      .sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    console.error("Get all comments error:", error);
    res.json({ success: false, message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const totalBlogs = await Blog.countDocuments();
    const totalComments = await Comment.countDocuments();
    const totalDrafts = await Blog.countDocuments({ isPublished: false });

    const dashboardData = {
      recentBlogs,
      totalBlogs,
      totalComments,
      totalDrafts,
    };
    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { commentId } = req.body;
    console.log("Delete comment request - commentId:", commentId);

    if (!commentId) {
      return res.json({ success: false, message: "Comment ID is required" });
    }

    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      return res.json({ success: false, message: "Comment not found" });
    }

    console.log("Comment deleted successfully:", commentId);
    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Delete comment error:", error);
    res.json({ success: false, message: error.message });
  }
};

export const approveCommentById = async (req, res) => {
  try {
    const { commentId } = req.body;
    console.log("Approve comment request - commentId:", commentId);

    if (!commentId) {
      return res.json({ success: false, message: "Comment ID is required" });
    }

    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { isApproved: true },
      { new: true }
    );

    if (!comment) {
      return res.json({ success: false, message: "Comment not found" });
    }

    console.log("Comment approved successfully:", commentId);
    res.json({
      success: true,
      message: "Comment approved successfully",
      comment,
    });
  } catch (error) {
    console.error("Approve comment error:", error);
    res.json({ success: false, message: error.message });
  }
};
