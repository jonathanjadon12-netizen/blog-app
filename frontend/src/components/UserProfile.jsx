import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  articleGrid,
  articleCardClass,
  articleTitle,
  ghostBtn,
  loadingClass,
  errorClass,
  timestampClass,
  secondaryBtn,
} from "../styles/common.js";

function UserProfile() {
  const logout = useAuth((state) => state.logout);
  const currentUser = useAuth((state) => state.currentUser);
  const navigate = useNavigate();
  //console.log("currentUser in profile",currentUser)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/user-api/articles");

        setArticles(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  // convert UTC → IST
  const formatDateIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const onLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, {
      state: articleObj,
    });
  };

  if (loading) {
    return <p className={loadingClass}>Loading articles...</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      {error && <p className={errorClass}>{error}</p>}

      {/* Profile Welcome Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border border-[#e8e8ed] rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] gap-4">
        <div className="flex items-center gap-4">
          <img src={currentUser?.profileImageUrl} className="w-14 h-14 object-cover rounded-full border border-[#e8e8ed]" alt="avatar" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Reader Profile</p>
            <h2 className="text-xl font-bold text-[#1d1d1f]">Welcome, {currentUser?.firstName}!</h2>
          </div>
        </div>
        <button className={`${secondaryBtn} w-full sm:w-auto`} onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* Articles Section */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-[#1d1d1f] tracking-tight">Your Recommended Feed</h3>
        <div className={articleGrid}>
          {articles.map((articleObj) => (
            <div className={articleCardClass} key={articleObj._id}>
              <div className="flex flex-col h-full justify-between gap-4">
                {/* Top Content */}
                <div>
                  <p className={`${articleTitle} mb-1.5`}>{articleObj.title}</p>
                  <p className="text-xs font-semibold text-[#0066cc] uppercase tracking-wider mb-2">{articleObj.category || "General"}</p>
                  <p className="text-sm text-[#475569] leading-relaxed mb-3">{articleObj.content.slice(0, 80)}...</p>
                </div>

                {/* Bottom Meta & Button */}
                <div className="border-t border-[#f1f5f9] pt-3 flex flex-col gap-3">
                  <p className={timestampClass}>
                    <span className="scale-90">🕒</span> {formatDateIST(articleObj.createdAt)}
                  </p>
                  <button className={`${ghostBtn} w-full justify-center pt-1`} onClick={() => navigateToArticleByID(articleObj)}>
                    Read Article →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
