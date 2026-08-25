import { Menu, X, ShoppingCart, UserRound } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import logo from "../assets/logo-placeholder.svg";

import CartModal from "./cart/CartModal";

const links = [
  ["/", "صفحه اصلی"],
  ["/products", "منو"],
  ["#corporate", "سفارش سازمانی"],
  ["#about", "درباره ما"],
  ["#contact", "تماس با ما"],
];

const CART_COUNT = 1;

export default function Navbar({ isAuthenticated = false, userName = "امیر" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);

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

  /* =====================================================
     AUTH BUTTON
  ====================================================== */

  const renderAuthAction = (mobile = false) => {
    if (isAuthenticated) {
      return (
        <Link
          to="/profile"
          onClick={() => {
            if (mobile) {
              setMenuOpen(false);
            }
          }}
          className={`flex items-center justify-center gap-2 rounded-full border border-somak-gold/30 bg-somak-800 text-white transition hover:border-somak-gold/60 hover:bg-somak-900/80 ${
            mobile ? "px-4 py-2.5 text-xs" : "h-9 px-3.5 text-xs"
          }`}
        >
          <UserRound
            size={17}
            strokeWidth={1.5}
            className="shrink-0 text-somak-cream"
          />

          <span>سلام ، {userName}</span>
        </Link>
      );
    }

    return (
      <>
        <Link
          to="/signup"
          onClick={() => {
            if (mobile) {
              setMenuOpen(false);
            }
          }}
          className={`flex items-center justify-center rounded-full bg-gold-gradient font-medium text-somak-950 shadow-[0_6px_18px_rgba(230,166,46,0.16)] transition hover:brightness-105 ${
            mobile ? "mx-2 my-4 h-12 px-4 py-2.5" : "h-9 px-5 text-sm"
          }`}
        >
          ثبت نام
        </Link>
        <Link
          to="/login"
          onClick={() => {
            if (mobile) {
              setMenuOpen(false);
            }
          }}
          className={`flex items-center justify-center rounded-full border border-somak-gold/70 py-3.5 text-white transition hover:bg-somak-gold hover:text-somak-950 ${
            mobile ? "mx-2 h-12 px-4 py-2.5" : "h-9 px-5 text-sm"
          }`}
        >
          ورود
        </Link>
      </>
    );
  };

  /* =====================================================
     CART BUTTON
  ====================================================== */

  const renderCartButton = (mobile = false) => (
    <button
      type="button"
      onClick={() => setCartOpen(true)}
      aria-label="سبد خرید"
      className={`relative flex shrink-0 items-center justify-center text-somak-cream transition hover:text-somak-gold2 ${
        mobile ? "h-10 w-10" : "h-9 w-9"
      }`}
    >
      <ShoppingCart size={mobile ? 21 : 22} strokeWidth={1.5} />

      {CART_COUNT > 0 && (
        <span className="absolute right-0 top-0 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-somak-gold px-[3px] text-[9px] font-bold leading-none text-somak-950">
          1
        </span>
      )}
    </button>
  );

  return (
    <>
      {/* =================================================
          MAIN NAVBAR
      ================================================== */}

      <motion.header
        initial={false}
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
        className={`sticky top-0 z-50 border-b ${
          scrolled
            ? "border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.22)]"
            : "border-white/5 shadow-[0_6px_20px_rgba(0,0,0,0.10)]"
        }`}
      >
        <div
          dir="rtl"
          className="relative mx-auto flex h-[74px] max-w-[1200px] items-center px-3 md:px-6"
        >
          {/* =================================================
              MOBILE / TABLET
              HAMBURGER - RIGHT
          ================================================== */}

          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center justify-center rounded-full p-2 text-white transition hover:bg-white/10"
              aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X size={25} strokeWidth={1.7} className="text-somak-gold2" />
              ) : (
                <Menu
                  size={25}
                  strokeWidth={1.7}
                  className="text-somak-gold2"
                />
              )}
            </button>
          </div>

          {/* =================================================
              MOBILE / TABLET
              LOGO - EXACT CENTER
          ================================================== */}

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden">
            <Link to="/" className="block shrink-0">
              <img
                src={logo}
                alt="سومک فود"
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>

          {/* =================================================
              MOBILE / TABLET
              CART - LEFT

              Login/Register is intentionally NOT here.
              It lives inside the hamburger menu.
          ================================================== */}

          <div className="mr-auto flex items-center lg:hidden">
            {renderCartButton(true)}
          </div>

          {/* =================================================
              DESKTOP NAVBAR

              RTL visual order:

              RIGHT
              Logo

              Center
              Navigation

              LEFT
              Auth + Cart
          ================================================== */}

          <div dir="rtl" className="hidden w-full items-center lg:flex">
            {/* =================================================
                LOGO - RIGHT
            ================================================== */}

            <div className="shrink-0">
              <Link to="/" className="block shrink-0">
                <img
                  src={logo}
                  alt="سومک فود"
                  className="h-16 w-auto object-contain"
                />
              </Link>
            </div>

            {/* =================================================
                NAVIGATION - CENTER
            ================================================== */}

            <nav
              dir="rtl"
              className="mx-auto flex items-center gap-10 text-[15px] font-medium text-white/90"
            >
              {links.map(([to, label]) =>
                to.startsWith("#") ? (
                  <a
                    key={label}
                    href={to}
                    className="whitespace-nowrap transition hover:text-somak-gold2"
                  >
                    {label}
                  </a>
                ) : (
                  <NavLink
                    key={label}
                    to={to}
                    className={({ isActive }) =>
                      `whitespace-nowrap transition hover:text-somak-gold2 ${
                        isActive ? "text-somak-gold2" : ""
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ),
              )}
            </nav>

            {/* =================================================
                AUTH + CART - LEFT
            ================================================== */}

            <div className="flex shrink-0 items-center gap-2">
              {renderAuthAction()}
              {renderCartButton()}
            </div>
          </div>
        </div>
      </motion.header>

      {/* =================================================
          MOBILE / TABLET MENU
      ================================================== */}

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* =================================================
                OVERLAY
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 lg:hidden"
            />

            {/* =================================================
                GLASS MENU
            ================================================== */}

            <motion.div
              initial={{
                height: 0,
              }}
              animate={{
                height: "auto",
              }}
              exit={{
                height: 0,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="fixed left-0 right-0 top-[74px] z-50 overflow-hidden lg:hidden"
              style={{
                backgroundColor: "rgba(23, 4, 5, 0.5)",

                backdropFilter: "blur(18px)",

                WebkitBackdropFilter: "blur(18px)",
              }}
            >
              <nav
                dir="rtl"
                className="border-t border-white/10 px-6 py-5 text-right text-sm font-medium text-white/90"
              >
                {/* =================================================
                    NAVIGATION LINKS
                ================================================== */}

                {links.map(([to, label]) =>
                  to.startsWith("#") ? (
                    <a
                      key={label}
                      href={to}
                      onClick={() => setMenuOpen(false)}
                      className="block border-b border-white/10 py-4 transition hover:text-somak-gold2"
                    >
                      {label}
                    </a>
                  ) : (
                    <NavLink
                      key={label}
                      to={to}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `block border-b border-white/10 py-4 transition hover:text-somak-gold2 ${
                          isActive ? "text-somak-gold2" : ""
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  ),
                )}

                {/* =================================================
                    LOGIN / REGISTER
                    ONLY INSIDE MOBILE MENU
                ================================================== */}

                <div className="mt-5">{renderAuthAction(true)}</div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
