import { Menu, X, ShoppingBag } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import logo from "../assets/logo-placeholder.svg";

const links = [
  ["/", "صفحه اصلی"],
  ["/products", "منو"],
  ["#corporate", "سفارش سازمانی"],
  ["#about", "درباره ما"],
  ["#contact", "تماس با ما"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      animate={{
        backgroundColor: scrolled
          ? "rgba(23, 4, 5, 0.5)"
          : "rgba(23, 4, 5, 0.95)",

        backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",

        WebkitBackdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled ? "border-white/10" : "border-white/5"
      }`}
    >
      <div className="relative mx-auto flex h-[74px] max-w-[1200px] items-center justify-between px-6">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center justify-center rounded-full p-2 text-white transition hover:bg-white/10 lg:hidden"
          aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
        >
          {menuOpen ? (
            <X
              size={25}
              strokeWidth={1.7}
              className="text-somak-gold2"
            />
          ) : (
            <Menu
              size={25}
              strokeWidth={1.7}
              className="text-somak-gold2"
            />
          )}
        </button>

        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0">
          <Link
            to="/"
            className="shrink-0"
          >
            <img
              src={logo}
              alt="سومک فود"
              className="h-16 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 text-[15px] font-medium text-white/90 lg:flex">
          {links.map(([to, label]) =>
            to.startsWith("#") ? (
              <a
                key={label}
                href={to}
                className="transition hover:text-somak-gold2"
              >
                {label}
              </a>
            ) : (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `transition hover:text-somak-gold2 ${
                    isActive ? "text-somak-gold2" : ""
                  }`
                }
              >
                {label}
              </NavLink>
            ),
          )}
        </nav>

        {/* Order Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="hidden sm:block"
        >
          <Link
            to="/products"
            className="flex items-center gap-2 rounded-full border border-somak-gold/70 px-5 py-3 text-sm font-medium text-white transition hover:bg-somak-gold hover:text-somak-950"
          >
            <ShoppingBag
              size={18}
              strokeWidth={1.6}
            />
            سفارش آنلاین
          </Link>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: menuOpen ? "auto" : 0,
          opacity: menuOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        className="overflow-hidden border-t border-white/5 lg:hidden"
      >
        <nav className="flex flex-col px-6 py-5 text-right text-sm font-medium text-white/90">
          {links.map(([to, label]) =>
            to.startsWith("#") ? (
              <a
                key={label}
                href={to}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/5 py-4 transition hover:text-somak-gold2"
              >
                {label}
              </a>
            ) : (
              <NavLink
                key={label}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `border-b border-white/5 py-4 transition hover:text-somak-gold2 ${
                    isActive ? "text-somak-gold2" : ""
                  }`
                }
              >
                {label}
              </NavLink>
            ),
          )}

          {/* Mobile Order Button */}
          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="mt-5 flex items-center justify-center gap-2 rounded-full border border-somak-gold/70 px-5 py-3 text-sm font-medium text-white transition hover:bg-somak-gold hover:text-somak-950"
          >
            <ShoppingBag
              size={18}
              strokeWidth={1.6}
            />
            سفارش آنلاین
          </Link>
        </nav>
      </motion.div>
    </motion.header>
  );
}
