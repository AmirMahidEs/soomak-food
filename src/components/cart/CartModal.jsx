import { Minus, Plus, ShoppingBag, Trash2, X, ArrowLeft } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/* =========================================================
   STATIC CART DATA

   فعلاً فقط برای طراحی UI است.
   بعداً این قسمت کامل حذف می‌شود و Redux جایگزین آن خواهد شد.
========================================================= */

const INITIAL_CART = [
  {
    id: 1,
    title: "زرشک پلو با مرغ",
    price: 260000,
    image: "../../assets/zereshk-polo-card.jpg",
    quantity: 1,
  },
  {
    id: 2,
    title: "قورمه سبزی",
    price: 280000,
    image: "../../assets/ghorme-sabzi.jpg",
    quantity: 1,
  },
];

/* =========================================================
   PRICE FORMAT
========================================================= */

const formatPrice = (price) => {
  return price.toLocaleString("fa-IR");
};

/* =========================================================
   CART MODAL
========================================================= */

export default function CartModal({ open, onClose }) {
  const [cartItems, setCartItems] = useState(INITIAL_CART);

  /* =======================================================
     LOCK BODY SCROLL
  ======================================================== */

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  /* =======================================================
     ESC TO CLOSE
  ======================================================== */

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  /* =======================================================
     INCREASE
  ======================================================== */

  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  /* =======================================================
     DECREASE
  ======================================================== */

  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  /* =======================================================
     DELETE
  ======================================================== */

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  /* =======================================================
     CALCULATIONS
  ======================================================== */

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = cartItems.length > 0 ? 30000 : 0;

  const total = subtotal + shipping;

  /* =======================================================
     MODAL
  ======================================================== */

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* =================================================
              BACKDROP
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
              duration: 0.2,
            }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-[1px]"
          />

          {/* =================================================
              CART
          ================================================== */}

          <motion.aside
            dir="rtl"
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -40,
            }}
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed left-[26px] top-[158px] z-[100] flex max-h-[calc(100vh-184px)] w-[398px] flex-col overflow-hidden rounded-[15px] border border-[#6f2826] bg-[#27090c] shadow-[0_18px_55px_rgba(0,0,0,0.42)] max-md:left-4 max-md:right-4 max-md:top-[92px] max-md:max-h-[calc(100vh-110px)] max-md:w-auto"
          >
            {/* =================================================
                HEADER
            ================================================== */}

            <header className="flex h-[75px] shrink-0 items-center justify-between border-[#61221f] px-[18px]">
              {/* CLOSE */}

              <button
                type="button"
                onClick={onClose}
                aria-label="بستن"
                className="flex h-[39px] w-[39px] items-center justify-center rounded-full border border-[#642421] text-[#e9a92f] transition hover:border-[#8a322d] hover:bg-[#421014]"
              >
                <X size={20} strokeWidth={1.4} />
              </button>

              {/* TITLE */}

              <h2 className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[17px] font-medium text-white">
                سبد خرید شما
              </h2>
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[#642421] text-[#e9a92f]">
                <ShoppingBag size={19} strokeWidth={1.4} />
              </div>
            </header>

            {/* =================================================
                ITEMS AREA
            ================================================== */}

            <div className="min-h-0 flex-1 overflow-y-auto px-[18px] py-[14px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {cartItems.length === 0 ? (
                /* =================================================
                    EMPTY
                ================================================== */

                <div className="flex min-h-[330px] flex-col items-center justify-center text-center">
                  <div className="flex h-[66px] w-[66px] items-center justify-center rounded-full border border-[#652522] text-[#e9a92f]">
                    <ShoppingBag size={29} strokeWidth={1.3} />
                  </div>

                  <h3 className="mt-5 text-[15px] font-medium text-white">
                    سبد خرید شما خالی است
                  </h3>

                  <p className="mt-2 text-[11px] text-white/45">
                    هنوز محصولی به سبد خرید اضافه نکرده‌اید.
                  </p>
                </div>
              ) : (
                /* =================================================
                    PRODUCTS
                ================================================== */

                <div className="space-y-[9px]">
                  {cartItems.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      className="rounded-[13px] border border-[#63221f] bg-[#25080b] px-[11px] py-[11px]"
                    >
                      <div className="flex items-center gap-[11px]">
                        {/* PRODUCT IMAGE */}

                        <div className="h-[68px] w-[68px] shrink-0 overflow-hidden rounded-[11px] border border-[#652522] bg-[#180507]">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* PRODUCT INFORMATION */}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="truncate text-[13px] font-medium text-white">
                              {item.title}
                            </h3>
                          </div>

                          <div className="mt-[7px] text-[12px] font-medium text-[#e9a92f]">
                            {formatPrice(item.price)} تومان
                          </div>

                          {/* ACTIONS */}
                        </div>
                        <div className="mt-[8px] flex flex-row-reverse items-center gap-2">
                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label="حذف محصول"
                            className="flex h-[29px] w-[29px] items-center justify-center rounded-full border border-[#642421] text-[#d8952d] transition hover:border-red-400/50 hover:bg-red-950/30 hover:text-red-300"
                          >
                            <Trash2 size={15} strokeWidth={1.4} />
                          </button>

                          {/* QUANTITY */}

                          <div
                            dir="ltr"
                            className="flex h-[29px] flex-row-reverse items-center rounded-full border border-[#642421] bg-[#1b0608]"
                          >
                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.id)}
                              className="flex h-[28px] w-[30px] items-center justify-center text-[#e9a92f] transition hover:text-white"
                              aria-label="افزایش"
                            >
                              <Plus size={13} strokeWidth={1.7} />
                            </button>

                            <span className="min-w-[24px] text-center text-[11px] text-white">
                              {item.quantity.toLocaleString("fa-IR")}
                            </span>

                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item.id)}
                              className="flex h-[28px] w-[30px] items-center justify-center text-[#e9a92f] transition hover:text-white"
                              aria-label="کاهش"
                            >
                              <Minus size={13} strokeWidth={1.7} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* =================================================
                SUMMARY
            ================================================== */}

            {cartItems.length > 0 && (
              <div className="shrink-0 border-[#61221f] px-[18px] pb-[17px]">
                <div className="rounded-[13px] border border-[#63221f] bg-[#25080b] px-[11px] py-[11px]">
                  {/* SUBTOTAL */}
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-white/75">جمع جزئی</span>

                    <span className="text-white">
                      {formatPrice(subtotal)} تومان
                    </span>
                  </div>

                  {/* SHIPPING */}

                  <div className="mt-[10px] flex items-center justify-between text-[11px]">
                    <span className="text-white/75">هزینه ارسال</span>

                    <span className="text-white">
                      {formatPrice(shipping)} تومان
                    </span>
                  </div>

                  {/* TOTAL */}

                  <div className="mt-[13px] flex items-center justify-between border-t border-[#61221f] pt-[13px]">
                    <span className="text-[13px] font-medium text-white">
                      مجموع کل
                    </span>

                    <span className="text-[17px] font-bold text-[#e9a92f]">
                      {formatPrice(total)} تومان
                    </span>
                  </div>
                </div>

                {/* CHECKOUT */}

                <button
                  type="button"
                  className="mt-[15px] flex h-[45px] w-full items-center justify-center gap-3 rounded-full bg-gold-gradient text-[13px] font-medium text-somak-950 shadow-[0_7px_20px_rgba(230,166,46,0.14)] transition hover:brightness-105"
                >
                  <ArrowLeft size={18} strokeWidth={1.6} />

                  <span>تکمیل سفارش</span>
                </button>

                {/* VIEW CART */}

                <button
                  type="button"
                  className="mx-auto mt-[12px] block text-[11px] text-[#e9a92f] underline decoration-[#e9a92f]/40 underline-offset-4 transition hover:text-[#f2bd4a]"
                >
                  مشاهده سبد خرید
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
