import { AnimatePresence } from "framer-motion";
import { useLocation, useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
export default function App() {
  const location = useLocation();
  const element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/products", element: <ProductsPage /> },
    { path: "/products/:id", element: <ProductDetailsPage /> },
    { path: "*", element: <NotFoundPage /> },
  ]);
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <div key={location.pathname}>{element}</div>
      </AnimatePresence>
    </Layout>
  );
}
