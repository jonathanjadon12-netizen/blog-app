import React from "react";
import { mutedText } from "../styles/common";

function Footer() {
  return (
    <footer className="border-t border-[#e8e8ed] bg-white py-6 mt-auto">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className={`${mutedText} text-xs font-medium`}>
          © {new Date().getFullYear()} MyBlog. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className={`${mutedText} text-xs hover:text-[#1d1d1f] transition-colors`}>
            Privacy Policy
          </a>
          <a href="#" className={`${mutedText} text-xs hover:text-[#1d1d1f] transition-colors`}>
            Terms of Service
          </a>
          <a href="#" className={`${mutedText} text-xs hover:text-[#1d1d1f] transition-colors`}>
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;