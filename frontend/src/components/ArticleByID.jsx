import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/authStore";
import { toast } from "react-hot-toast";
import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
} from "../styles/common.js";

function ArticleByID() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Comments state
  const [newComment, setNewComment] = useState("");
  const [replyInputs, setReplyInputs] = useState({});
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [commenting, setCommenting] = useState(false);
  const [visibleReplies, setVisibleReplies] = useState({});

  useEffect(() => {
    const getArticle = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`/user-api/article/${id}`);
        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;

    const elapsed = now - past;

    if (elapsed < msPerMinute) {
      return "just now";
    } else if (elapsed < msPerHour) {
      const mins = Math.round(elapsed / msPerMinute);
      return `${mins} ${mins === 1 ? "minute" : "minutes"} ago`;
    } else if (elapsed < msPerDay) {
      const hrs = Math.round(elapsed / msPerHour);
      return `${hrs} ${hrs === 1 ? "hour" : "hours"} ago`;
    } else {
      const days = Math.round(elapsed / msPerDay);
      if (days < 7) {
        return `${days} ${days === 1 ? "day" : "days"} ago`;
      }
      return new Date(dateString).toLocaleDateString("en-IN", {
        dateStyle: "medium",
      });
    }
  };

  // delete & restore article
  const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;

    const confirmMsg = newStatus ? "Restore this article?" : "Delete this article?";
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await axios.patch(
        `/author-api/articles/${id}/status`,
        { isArticleActive: newStatus }
      );

      console.log("SUCCESS:", res.data);

      setArticle(res.data.payload);

      toast.success(res.data.message);
    } catch (err) {
      console.log("ERROR:", err.response);

      const msg = err.response?.data?.message;

      if (err.response?.status === 400) {
        toast(msg); // already deleted/active case
      } else {
        setError(msg || "Operation failed");
      }
    }
  };

  const editArticle = (articleObj) => {
    navigate("/edit-article", { state: articleObj });
  };

  // Submit comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!user) {
      toast.error("Please login to comment");
      return;
    }

    setCommenting(true);
    try {
      const res = await axios.post(`/common-api/articles/${article._id}/comments`, {
        comment: newComment,
      });
      setArticle(res.data.payload);
      setNewComment("");
      toast.success("Comment posted!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add comment");
    } finally {
      setCommenting(false);
    }
  };

  // Submit reply
  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    const replyText = replyInputs[commentId];
    if (!replyText || !replyText.trim()) return;
    if (!user) {
      toast.error("Please login to reply");
      return;
    }

    try {
      const res = await axios.post(`/common-api/articles/${article._id}/comments/${commentId}/replies`, {
        reply: replyText,
      });
      setArticle(res.data.payload);
      setReplyInputs({ ...replyInputs, [commentId]: "" });
      setActiveReplyId(null);
      // Automatically show replies for this comment
      setVisibleReplies({ ...visibleReplies, [commentId]: true });
      toast.success("Reply posted!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add reply");
    }
  };

  // Toggle Like
  const handleLikeComment = async (commentId) => {
    if (!user) {
      toast.error("Please login to like comments");
      return;
    }
    try {
      const res = await axios.post(`/common-api/articles/${article._id}/comments/${commentId}/like`);
      setArticle(res.data.payload);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update like");
    }
  };

  // Toggle Dislike
  const handleDislikeComment = async (commentId) => {
    if (!user) {
      toast.error("Please login to dislike comments");
      return;
    }
    try {
      const res = await axios.post(`/common-api/articles/${article._id}/comments/${commentId}/dislike`);
      setArticle(res.data.payload);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update dislike");
    }
  };

  const toggleRepliesVisibility = (commentId) => {
    setVisibleReplies({
      ...visibleReplies,
      [commentId]: !visibleReplies[commentId],
    });
  };

  const renderAvatar = (commenter, size = "w-9 h-9 text-xs") => {
    if (commenter?.profileImageUrl) {
      return (
        <img
          src={commenter.profileImageUrl}
          alt={commenter.firstName}
          className={`${size} object-cover rounded-full border border-[#e8e8ed]`}
        />
      );
    }
    const initial = commenter?.firstName ? commenter.firstName[0] : "?";
    return (
      <div className={`${size} bg-[#ebebf0] text-[#1d1d1f] font-semibold flex items-center justify-center rounded-full uppercase`}>
        {initial}
      </div>
    );
  };

  if (loading) return <p className={loadingClass}>Loading article...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (!article) return null;

  return (
    <div className={articlePageWrapper}>
      {/* Header */}
      <div className={articleHeader}>
        <span className={articleCategory}>{article.category}</span>

        <h1 className={`${articleMainTitle} uppercase`}>{article.title}</h1>

        <div className={articleAuthorRow}>
          <div className={authorInfo}>
            {renderAvatar(article.author, "w-8 h-8 text-xs")}
            <span>✍️ {article.author?.firstName || "Author"}</span>
          </div>

          <div>{formatDate(article.createdAt)}</div>
        </div>
      </div>

      {/* Content */}
      <div className={articleContent}>{article.content}</div>

      {/* AUTHOR actions */}
      {user?.role === "AUTHOR" && (
        <div className={articleActions}>
          <button className={editBtn} onClick={() => editArticle(article)}>
            Edit
          </button>

          <button className={deleteBtn} onClick={toggleArticleStatus}>
            {article.isArticleActive ? "Delete" : "Restore"}
          </button>
        </div>
      )}

      {/* Discussion Section */}
      <div className="border-t border-[#e8e8ed] mt-16 pt-10">
        <h3 className="text-xl font-bold text-[#1d1d1f] tracking-tight mb-8">
          Discussion ({article.comments?.length || 0})
        </h3>

        {/* Comment Box */}
        {user ? (
          <form onSubmit={handleCommentSubmit} className="mb-10">
            <div className="flex gap-4">
              {renderAvatar(user, "w-10 h-10 text-sm")}
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows="3"
                  className="w-full bg-[#f5f5f7] border border-transparent rounded-2xl px-4 py-3 text-[#1d1d1f] text-sm placeholder:text-[#a1a1a6] focus:outline-none focus:bg-white focus:border-[#0066cc] focus:ring-4 focus:ring-[#0066cc]/5 transition duration-200 resize-none"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    disabled={commenting || !newComment.trim()}
                    className="bg-[#0066cc] text-white font-semibold px-5 py-2 rounded-full hover:bg-[#004499] transition disabled:opacity-50 disabled:cursor-not-allowed text-xs cursor-pointer"
                  >
                    {commenting ? "Posting..." : "Post Comment"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="bg-[#f5f5f7] rounded-2xl p-6 text-center mb-10 border border-[#e8e8ed]/60">
            <p className="text-sm text-[#6e6e73] mb-4">You must be signed in to join the discussion.</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-[#0066cc] text-white text-xs font-semibold px-5 py-2 rounded-full hover:bg-[#004499] transition cursor-pointer"
            >
              Sign In
            </button>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-8">
          {article.comments && article.comments.length > 0 ? (
            article.comments.map((commentObj) => {
              const currentUserId = user?._id || user?.userId;
              const hasLiked = commentObj.likes?.includes(currentUserId);
              const hasDisliked = commentObj.dislikes?.includes(currentUserId);

              return (
                <div key={commentObj._id} className="flex gap-4 group">
                  {renderAvatar(commentObj.user, "w-9 h-9 text-xs")}
                  <div className="flex-1">
                    {/* Comment Header */}
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-sm font-semibold text-[#1d1d1f]">
                        {commentObj.user?.firstName || "User"} {commentObj.user?.lastName || ""}
                      </span>
                      {commentObj.user?.role === "AUTHOR" && (
                        <span className="text-[10px] font-bold bg-[#0066cc]/10 text-[#0066cc] px-1.5 py-0.5 rounded-md uppercase tracking-wider scale-90">
                          Author
                        </span>
                      )}
                      <span className="text-xs text-[#a1a1a6]">{timeAgo(commentObj.createdAt)}</span>
                    </div>

                    {/* Comment Content */}
                    <p className="text-sm text-[#323237] leading-relaxed whitespace-pre-wrap">{commentObj.comment}</p>

                    {/* Comment Actions */}
                    <div className="flex items-center gap-5 mt-3 text-xs text-[#86868b]">
                      {/* Like */}
                      <button
                        onClick={() => handleLikeComment(commentObj._id)}
                        className={`flex items-center gap-1.5 hover:text-[#0066cc] transition cursor-pointer ${
                          hasLiked ? "text-[#0066cc] font-medium" : ""
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={hasLiked ? "currentColor" : "none"}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904M14.25 9h2.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                          />
                        </svg>
                        <span>{commentObj.likes?.length || 0}</span>
                      </button>

                      {/* Dislike */}
                      <button
                        onClick={() => handleDislikeComment(commentObj._id)}
                        className={`flex items-center gap-1.5 hover:text-[#ff3b30] transition cursor-pointer ${
                          hasDisliked ? "text-[#ff3b30] font-medium" : ""
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={hasDisliked ? "currentColor" : "none"}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 16.25c-.806 0-1.533.446-2.031 1.08a9.041 9.041 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 0 0-.322 1.672v.328a.75.75 0 0 0 .75.75 2.25 2.25 0 0 0 2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282m0 0h-3.126c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 0 1 1 14.865c0-2.613 1.014-4.964 2.649-6.721.388-.482.987-.729 1.605-.729H6.52c.483 0 .964.078 1.423.23l3.114 1.04c.465.156.953.23 1.423.23h3.619c.083-.205.173-.405.27-.602.197-.4-.078-.898-.523-.898h-.908c-.889 0-1.713.518-1.972 1.368a12 12 0 0 0 .521 3.507c0 1.553-.295 3.036-.831 4.398-.277.697-1.057 1.15-1.89 1.15H7.5Z"
                          />
                        </svg>
                        <span>{commentObj.dislikes?.length || 0}</span>
                      </button>

                      {/* Reply Toggle */}
                      {user && (
                        <button
                          onClick={() =>
                            setActiveReplyId(activeReplyId === commentObj._id ? null : commentObj._id)
                          }
                          className="hover:text-[#0066cc] font-medium transition cursor-pointer"
                        >
                          Reply
                        </button>
                      )}

                      {/* View Replies Toggle */}
                      {commentObj.replies && commentObj.replies.length > 0 && (
                        <button
                          onClick={() => toggleRepliesVisibility(commentObj._id)}
                          className="text-[#0066cc] font-medium hover:text-[#004499] transition cursor-pointer"
                        >
                          {visibleReplies[commentObj._id]
                            ? "Hide replies"
                            : `View replies (${commentObj.replies.length})`}
                        </button>
                      )}
                    </div>

                    {/* Inline Reply Form */}
                    {activeReplyId === commentObj._id && (
                      <form
                        onSubmit={(e) => handleReplySubmit(e, commentObj._id)}
                        className="mt-4 bg-[#f5f5f7] rounded-xl p-3 border border-[#e8e8ed]/60"
                      >
                        <textarea
                          value={replyInputs[commentObj._id] || ""}
                          onChange={(e) =>
                            setReplyInputs({
                              ...replyInputs,
                              [commentObj._id]: e.target.value,
                            })
                          }
                          placeholder="Reply to this comment..."
                          rows="2"
                          className="w-full bg-white border border-[#d2d2d7] rounded-lg px-3 py-2 text-[#1d1d1f] text-sm focus:outline-none focus:border-[#0066cc] transition resize-none"
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => setActiveReplyId(null)}
                            className="text-[#86868b] hover:text-[#1d1d1f] text-xs font-semibold px-3 py-1.5 rounded-full transition cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={!replyInputs[commentObj._id]?.trim()}
                            className="bg-[#0066cc] text-white text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-[#004499] transition disabled:opacity-50 cursor-pointer"
                          >
                            Reply
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Nested Replies List */}
                    {visibleReplies[commentObj._id] && commentObj.replies && commentObj.replies.length > 0 && (
                      <div className="border-l-2 border-[#e8e8ed] pl-4 mt-4 space-y-4">
                        {commentObj.replies.map((replyObj) => (
                          <div key={replyObj._id} className="flex gap-3">
                            {renderAvatar(replyObj.user, "w-7 h-7 text-[10px]")}
                            <div className="flex-1">
                              <div className="flex items-baseline gap-2 mb-0.5">
                                <span className="text-xs font-semibold text-[#1d1d1f]">
                                  {replyObj.user?.firstName || "User"} {replyObj.user?.lastName || ""}
                                </span>
                                {replyObj.user?.role === "AUTHOR" && (
                                  <span className="text-[9px] font-bold bg-[#0066cc]/10 text-[#0066cc] px-1 py-0.2 rounded-md uppercase tracking-wider scale-90">
                                    Author
                                  </span>
                                )}
                                <span className="text-[10px] text-[#a1a1a6]">{timeAgo(replyObj.createdAt)}</span>
                              </div>
                              <p className="text-xs text-[#323237] leading-relaxed">{replyObj.reply}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-[#a1a1a6] text-center py-6">
              No thoughts shared yet. Be the first to start the discussion!
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className={articleFooter}>Last updated: {formatDate(article.updatedAt)}</div>
    </div>
  );
}

export default ArticleByID;
