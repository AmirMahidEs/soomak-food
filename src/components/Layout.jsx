import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-somak-950 text-somak-cream">
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
