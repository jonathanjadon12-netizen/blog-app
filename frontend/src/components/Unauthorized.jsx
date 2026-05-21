import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { cardClass, mutedText } from "../styles/common";

const Unauthorized = ({ delay = 5000 }) => {
  console.log("unauthorized");
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirectTo from state
  const redirectTo = location.state?.redirectTo || "/login";
  console.log("redirect", redirectTo);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectTo, { replace: true });
    }, delay);

    return () => clearTimeout(timer);
  }, [navigate, redirectTo, delay]);

  return (
    <div className="py-20 flex flex-col items-center justify-center">
      <div className={`${cardClass} max-w-md w-full text-center flex flex-col items-center p-10`}>
        <span className="text-5xl mb-6 block">🚫</span>
        <h1 className="text-3xl font-extrabold text-[#ff3b30] tracking-tight mb-3">403 - Unauthorized</h1>
        <p className="text-sm text-[#334155] leading-relaxed mb-6">
          You do not have the required permissions to view this page.
        </p>
        <div className="w-full border-t border-[#e8e8ed] pt-6 flex flex-col items-center gap-2">
          <p className={`${mutedText} text-xs font-semibold uppercase tracking-wider animate-pulse`}>
            Redirecting shortly
          </p>
          <p className="text-xs text-[#a1a1a6]">
            Automatically redirecting to login in {delay / 1000} seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
