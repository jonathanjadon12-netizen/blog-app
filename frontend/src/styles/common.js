// src/styles/common.js
// Theme: Premium Warm Beige / Editorial Cream
// Inspired by high-end reading environments: cozy linen backdrops, soft warm borders, elegant typography

// ─── Layout ───────────────────────────────────────────
export const pageBackground = "bg-[#faf6f0] min-h-screen";
export const pageWrapper = "max-w-5xl mx-auto px-6 py-16";
export const section = "mb-14";

// ─── Cards ────────────────────────────────────────────
export const cardClass =
  "bg-white border border-[#eae6df] rounded-2xl p-7 shadow-[0_1px_3px_rgba(40,30,20,0.01),0_1px_2px_rgba(40,30,20,0.02)] hover:border-[#cbd5e1] hover:shadow-[0_4px_12px_rgba(40,30,20,0.015)] transition-all duration-200 cursor-pointer";

// ─── Typography ───────────────────────────────────────
export const pageTitleClass = "text-5xl font-extrabold text-[#2b2724] tracking-tight leading-none mb-3";
export const headingClass = "text-2xl font-bold text-[#2b2724] tracking-tight";
export const subHeadingClass = "text-lg font-semibold text-[#2b2724] tracking-tight";
export const bodyText = "text-[#514c47] leading-relaxed";
export const mutedText = "text-sm text-[#7c756e]";
export const linkClass = "text-[#0066cc] hover:text-[#004499] transition-colors font-medium";

// ─── Buttons ──────────────────────────────────────────
export const primaryBtn =
  "bg-[#0066cc] text-white font-semibold px-5 py-2.5 rounded-full hover:bg-[#004499] transition-colors duration-150 cursor-pointer text-sm tracking-tight shadow-sm inline-block text-center";
export const secondaryBtn =
  "border border-[#d0c9c0] bg-white text-[#2b2724] font-medium px-5 py-2.5 rounded-full hover:bg-[#faf6f0] hover:border-[#b8b0a5] transition-all duration-150 cursor-pointer text-sm shadow-sm inline-block text-center";
export const ghostBtn = "text-[#0066cc] font-semibold hover:text-[#004499] transition-colors cursor-pointer text-sm inline-flex items-center gap-1";

// ─── Forms ────────────────────────────────────────────
export const formCard = "bg-white border border-[#eae6df] rounded-2xl p-10 max-w-2xl mx-auto shadow-[0_4px_20px_rgba(40,30,20,0.01)]";
export const formTitle = "text-2xl font-bold text-[#2b2724] tracking-tight text-center mb-7";
export const labelClass = "text-xs font-semibold uppercase tracking-wider text-[#7c756e] mb-2 block";
export const inputClass =
  "w-full bg-[#faf6f0] border border-[#e2ddd5] rounded-xl px-4 py-2.5 text-[#2b2724] text-sm placeholder:text-[#b0a89f] focus:outline-none focus:bg-white focus:border-[#0066cc] focus:ring-4 focus:ring-[#0066cc]/5 transition duration-150";
export const formGroup = "mb-5";
export const submitBtn =
  "w-full bg-[#0066cc] text-white font-semibold py-2.5 rounded-full hover:bg-[#004499] transition-colors duration-150 cursor-pointer mt-2 text-sm tracking-tight shadow-sm";

// ─── Navbar ───────────────────────────────────────────
export const navbarClass =
  "bg-white/80 backdrop-blur-md border-b border-[#eae6df] px-8 h-[56px] flex items-center sticky top-0 z-50 shadow-[0_1px_2px_rgba(40,30,20,0.005)]";
export const navContainerClass = "max-w-5xl mx-auto w-full flex items-center justify-between";
export const navBrandClass = "text-base font-bold text-[#2b2724] tracking-tight hover:text-[#0066cc] transition-colors";
export const navLinksClass = "flex items-center gap-7";
export const navLinkClass = "text-[0.8rem] text-[#7c756e] hover:text-[#2b2724] transition-colors font-medium";
export const navLinkActiveClass = "text-[0.8rem] text-[#0066cc] font-semibold";

// ─── Article / Blog ───────────────────────────────────
export const articleGrid = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6";
export const articleCardClass =
  "bg-white border border-[#eae6df] rounded-2xl p-7 shadow-[0_1px_3px_rgba(40,30,20,0.01),0_1px_2px_rgba(40,30,20,0.02)] hover:border-[#cbd5e1] hover:shadow-[0_4px_12px_rgba(40,30,20,0.015)] transition-all duration-200 flex flex-col gap-2.5 cursor-pointer";
export const articleTitle = "text-base font-bold text-[#2b2724] leading-snug tracking-tight hover:text-[#0066cc] transition-colors";
export const articleExcerpt = "text-sm text-[#514c47] leading-relaxed";
export const articleMeta = "text-xs font-semibold text-[#7c756e] tracking-wide uppercase";
export const articleBody = "text-[#514c47] leading-[1.85] text-[0.95rem] max-w-2xl";
export const timestampClass = "text-xs text-[#7c756e] flex items-center gap-1.5";
export const tagClass = "text-[0.65rem] font-bold text-[#0066cc] uppercase tracking-widest w-fit";

// ─── Article Page ─────────────────────────────────────
export const articlePageWrapper = "max-w-3xl mx-auto px-6 py-14";
export const articleHeader = "mb-10 flex flex-col gap-4";
export const articleCategory = "text-[0.7rem] font-bold uppercase tracking-widest text-[#0066cc]";
export const articleMainTitle = "text-4xl font-extrabold text-[#2b2724] leading-tight tracking-tight";
export const articleAuthorRow =
  "flex items-center justify-between border-t border-b border-[#eae6df] py-4 text-sm text-[#7c756e]";
export const authorInfo = "flex items-center gap-2 font-semibold text-[#2b2724]";
export const articleContent = "text-[#2b2724] leading-[1.9] text-[1rem] whitespace-pre-line mt-8 font-normal";
export const articleFooter = "border-t border-[#eae6df] mt-12 pt-6 text-sm text-[#7c756e]";

// ─── Article Actions ─────────────────────────────
export const articleActions = "flex gap-3 mt-6";
export const editBtn = "bg-[#0066cc] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#004499] transition duration-150 shadow-sm cursor-pointer";
export const deleteBtn = "bg-[#ff3b30] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#d62c23] transition duration-150 shadow-sm cursor-pointer";

// ─── Article Status Badge ─────────────────────────
export const articleStatusActive =
  "absolute top-4 right-4 text-[9px] font-bold px-2.5 py-1 rounded-full bg-[#34c759]/10 text-[#248a3d] border border-[#34c759]/20 tracking-wider";
export const articleStatusDeleted =
  "absolute top-4 right-4 text-[9px] font-bold px-2.5 py-1 rounded-full bg-[#ff3b30]/10 text-[#cc2f26] border border-[#ff3b30]/20 tracking-wider";

// ─── Feedback ─────────────────────────────────────────
export const errorClass =
  "bg-[#ff3b30]/[0.02] text-[#cc2f26] border border-[#ff3b30]/[0.12] rounded-xl px-4 py-3 text-sm font-medium";
export const successClass =
  "bg-[#34c759]/[0.02] text-[#248a3d] border border-[#34c759]/12 rounded-xl px-4 py-3 text-sm font-medium";
export const loadingClass = "text-[#0066cc]/80 text-sm font-semibold animate-pulse text-center py-10";
export const emptyStateClass = "text-center text-[#7c756e] py-16 text-sm bg-white border border-[#eae6df] rounded-2xl shadow-sm";

// ─── Divider ──────────────────────────────────────────
export const divider = "border-t border-[#eae6df] my-8";
