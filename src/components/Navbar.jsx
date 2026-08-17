import { ShoppingBag } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo-placeholder.png";
const links = [
  ["/", "صفحه اصلی"],
  ["/products", "منو"],
  ["#corporate", "سفارش سازمانی"],
  ["#about", "درباره ما"],
  ["#contact", "تماس با ما"],
];
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#170405]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[94px] max-w-[1200px] items-center justify-between px-6 lg:px-0">
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
                  `transition hover:text-somak-gold2 ${isActive ? "text-somak-gold2" : ""}`
                }
              >
                {label}
              </NavLink>
            ),
          )}
        </nav>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
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
    </header>
  );
}
