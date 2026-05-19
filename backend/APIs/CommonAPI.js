import exp from "express";
import { authenticate } from "../services/authService.js";
import { UserTypeModel } from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { verifyToken } from "../middlewares/verifyToken.js";
import { ArticleModel } from "../models/ArticleModel.js";
export const commonRouter = exp.Router();

//login
commonRouter.post("/login", async (req, res) => {
  //get user cred object
  let userCred = req.body;
  //call authenticate service
  let { token, user } = await authenticate(userCred);
  //save tokan as httpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  //send res
  res.status(200).json({ message: "login success", payload: user });
});

//logout for User, Author and Admin
commonRouter.get("/logout", (req, res) => {
  // Clear the cookie named 'token'
  res.clearCookie("token", {
    httpOnly: true, // Must match original  settings
    secure: false, // Must match original  settings
    sameSite: "lax", // Must match original  settings
  });

  res.status(200).json({ message: "Logged out successfully" });
});

//Change password(Protected route)
commonRouter.put("/change-password", async (req, res) => {
  //get current password and new password
  const { role, email, currentPassword, newPassword } = req.body;
  // Prevent same password
  if (currentPassword === newPassword) {
    return res.status(400).json({ message: "newPassword must be different from currentPassword" });
  }

  // Find user by email (works for USER, AUTHOR, ADMIN — all same collection)
  const account = await UserTypeModel.findOne({ email });
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  // Verify current password
  const isMatch = await bcrypt.compare(currentPassword, account.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Current password is incorrect" });
  }
  // Hash and save new password
  account.password = await bcrypt.hash(newPassword, 10);
  await account.save();

  res.status(200).json({ message: "Password changed successfully" });
});

//Page refresh
commonRouter.get("/check-auth", verifyToken("USER","AUTHOR","ADMIN"), async (req, res) => {
  try {
    const user = await UserTypeModel.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userObj = user.toObject();
    delete userObj.password;
    res.status(200).json({
      message: "authenticated",
      payload: userObj,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Add a comment
commonRouter.post("/articles/:articleId/comments", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res) => {
  const { articleId } = req.params;
  const { comment } = req.body;
  const user = req.user.userId;

  try {
    const article = await ArticleModel.findByIdAndUpdate(
      articleId,
      {
        $push: {
          comments: {
            user,
            comment,
            likes: [],
            dislikes: [],
            replies: [],
          },
        },
      },
      { new: true, runValidators: true }
    )
    .populate("author", "firstName lastName profileImageUrl")
    .populate("comments.user", "firstName lastName profileImageUrl")
    .populate("comments.replies.user", "firstName lastName profileImageUrl");

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(201).json({ message: "Comment added", payload: article });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Add a reply to a comment
commonRouter.post("/articles/:articleId/comments/:commentId/replies", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res) => {
  const { articleId, commentId } = req.params;
  const { reply } = req.body;
  const user = req.user.userId;

  try {
    const article = await ArticleModel.findOneAndUpdate(
      { _id: articleId, "comments._id": commentId },
      {
        $push: {
          "comments.$.replies": {
            user,
            reply,
          },
        },
      },
      { new: true }
    )
    .populate("author", "firstName lastName profileImageUrl")
    .populate("comments.user", "firstName lastName profileImageUrl")
    .populate("comments.replies.user", "firstName lastName profileImageUrl");

    if (!article) {
      return res.status(404).json({ message: "Article or comment not found" });
    }

    res.status(201).json({ message: "Reply added", payload: article });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Toggle Like
commonRouter.post("/articles/:articleId/comments/:commentId/like", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res) => {
  const { articleId, commentId } = req.params;
  const user = req.user.userId;

  try {
    const articleDoc = await ArticleModel.findById(articleId);
    if (!articleDoc) {
      return res.status(404).json({ message: "Article not found" });
    }

    const comment = articleDoc.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const likedIndex = comment.likes.indexOf(user);
    const dislikedIndex = comment.dislikes.indexOf(user);

    if (likedIndex > -1) {
      // Already liked, toggle off
      comment.likes.splice(likedIndex, 1);
    } else {
      // Like it
      comment.likes.push(user);
      // Remove dislike if it exists
      if (dislikedIndex > -1) {
        comment.dislikes.splice(dislikedIndex, 1);
      }
    }

    await articleDoc.save();

    const populatedArticle = await ArticleModel.findById(articleId)
      .populate("author", "firstName lastName profileImageUrl")
      .populate("comments.user", "firstName lastName profileImageUrl")
      .populate("comments.replies.user", "firstName lastName profileImageUrl");

    res.status(200).json({ message: "Like updated", payload: populatedArticle });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Toggle Dislike
commonRouter.post("/articles/:articleId/comments/:commentId/dislike", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res) => {
  const { articleId, commentId } = req.params;
  const user = req.user.userId;

  try {
    const articleDoc = await ArticleModel.findById(articleId);
    if (!articleDoc) {
      return res.status(404).json({ message: "Article not found" });
    }

    const comment = articleDoc.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const likedIndex = comment.likes.indexOf(user);
    const dislikedIndex = comment.dislikes.indexOf(user);

    if (dislikedIndex > -1) {
      // Already disliked, toggle off
      comment.dislikes.splice(dislikedIndex, 1);
    } else {
      // Dislike it
      comment.dislikes.push(user);
      // Remove like if it exists
      if (likedIndex > -1) {
        comment.likes.splice(likedIndex, 1);
      }
    }

    await articleDoc.save();

    const populatedArticle = await ArticleModel.findById(articleId)
      .populate("author", "firstName lastName profileImageUrl")
      .populate("comments.user", "firstName lastName profileImageUrl")
      .populate("comments.replies.user", "firstName lastName profileImageUrl");

    res.status(200).json({ message: "Dislike updated", payload: populatedArticle });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});