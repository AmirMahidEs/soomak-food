import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-somak-950 text-somak-cream">
      <Navbar />

      <main className="overflow-x-hidden">{children}</main>

      <Footer />
    </div>
  );
}
