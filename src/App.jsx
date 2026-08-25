import { AnimatePresence } from "framer-motion";
import { useLayoutEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  const location = useLocation();

  const element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/products", element: <ProductsPage /> },
    { path: "/products/:id", element: <ProductDetailsPage /> },
    { path: "*", element: <NotFoundPage /> },
    { path: "/checkout", element: <CheckoutPage /> },
    { path: "/profile", element: <ProfilePage /> },
  ]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Layout>
      <AnimatePresence mode="popLayout">
        <div key={location.pathname}>{element}</div>
      </AnimatePresence>
    </Layout>
  );
}
