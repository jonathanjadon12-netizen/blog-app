import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../store/authStore";
import { pageBackground } from "../styles/common";

function RootLayout() {
  const checkAuth = useAuth((state) => state.checkAuth);
  const loading = useAuth((state) => state.loading);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // wait until auth check completes
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className={`${pageBackground} flex flex-col min-h-screen`}>
      <Header />
      <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
