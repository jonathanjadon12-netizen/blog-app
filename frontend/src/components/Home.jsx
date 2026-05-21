import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import {
  pageTitleClass,
  bodyText,
  primaryBtn,
  secondaryBtn,
  cardClass,
  headingClass,
  mutedText,
} from "../styles/common";

function Home() {
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleStartReading = () => {
    if (isAuthenticated) {
      if (currentUser?.role === "USER") {
        navigate("/user-profile");
      } else if (currentUser?.role === "AUTHOR") {
        navigate("/author-profile");
      }
    } else {
      navigate("/login");
    }
  };

  const handleWriteStory = () => {
    if (isAuthenticated && currentUser?.role === "AUTHOR") {
      navigate("/author-profile/write-article");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="py-12 flex flex-col gap-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto flex flex-col gap-6">
        <h1 className={pageTitleClass}>
          {isAuthenticated
            ? `Welcome back, ${currentUser?.firstName || "writer"}!`
            : "A beautiful space for modern thoughts & ideas."}
        </h1>
        <p className={`${bodyText} text-lg md:text-xl`}>
          {isAuthenticated
            ? "Your central dashboard for reading and publishing. Jump right back into the conversation or start creating your next masterpiece."
            : "Discover fresh perspectives, in-depth thinking, and stories from developers, designers, and creators on any topic."}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          {isAuthenticated ? (
            currentUser?.role === "AUTHOR" ? (
              <>
                <button onClick={() => navigate("/author-profile/write-article")} className={primaryBtn}>
                  Write an Article
                </button>
                <button onClick={() => navigate("/author-profile")} className={secondaryBtn}>
                  View Dashboard
                </button>
              </>
            ) : (
              <button onClick={() => navigate("/user-profile")} className={primaryBtn}>
                Explore Articles
              </button>
            )
          ) : (
            <>
              <button onClick={handleStartReading} className={primaryBtn}>
                Start Reading
              </button>
              <button onClick={handleWriteStory} className={secondaryBtn}>
                Write a Story
              </button>
            </>
          )}
        </div>
      </div>

      {/* Feature / Topic Grid */}
      <div className="flex flex-col gap-8">
        <h2 className={`${headingClass} text-center`}>
          {isAuthenticated ? "Quick Insights" : "Explore Featured Categories"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div onClick={() => handleStartReading()} className={`${cardClass} flex flex-col items-center text-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-[#0066cc] mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
            </svg>
            <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">Technology</h3>
            <p className={mutedText}>
              In-depth articles covering React, web engineering, systems architecture, and modern developer tooling.
            </p>
          </div>

          {/* Card 2 */}
          <div onClick={() => handleStartReading()} className={`${cardClass} flex flex-col items-center text-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-[#0066cc] mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.08 11.9a8 8 0 1 1 15.6 1.617l-.048.242a2 2 0 0 1-2.529 1.517l-.872-.29a2 2 0 0 0-2.529 1.517l-.048.242a4 4 0 0 1-7.784-2.828v-.242a2 2 0 0 0-1.838-1.993l-.242-.022A2 2 0 0 1 4.08 11.9Z" />
              <circle cx="8" cy="9" r="1" fill="currentColor" />
              <circle cx="12" cy="7" r="1" fill="currentColor" />
              <circle cx="16" cy="10" r="1" fill="currentColor" />
            </svg>
            <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">Design Systems</h3>
            <p className={mutedText}>
              Aesthetic breakdowns, premium micro-interactions, layout formulas, and typographic principles.
            </p>
          </div>

          {/* Card 3 */}
          <div onClick={() => handleStartReading()} className={`${cardClass} flex flex-col items-center text-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-[#0066cc] mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
            <h3 className="text-lg font-bold text-[#1d1d1f] mb-2">Creative Writing</h3>
            <p className={mutedText}>
              Personal growth narratives, engineering journals, lessons learned in production, and industry analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;