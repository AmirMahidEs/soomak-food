import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Layout({ children }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-somak-950 text-somak-cream">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
