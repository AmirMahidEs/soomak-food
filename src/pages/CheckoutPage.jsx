import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  MapPin,
  Phone,
  UserRound,
  Check,
  WalletCards,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

import CheckoutTimeline from "../components/checkout/CheckoutTimeline";

const formatPrice = (price) => price.toLocaleString("fa-IR");

/* =========================================================
   STATIC ORDER DATA

   فعلاً فقط برای UI.
   بعداً از Redux Cart گرفته خواهد شد.
========================================================= */

const orderItems = [
  {
    id: 1,
    title: "زرشک پلو با مرغ",
    quantity: 1,
    price: 260000,
  },
  {
    id: 2,
    title: "قورمه سبزی",
    quantity: 1,
    price: 280000,
  },
];

const subtotal = orderItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0,
);

const shipping = 30000;
const total = subtotal + shipping;

/* =========================================================
   STATIC CUSTOMER DATA

   فعلاً هاردکد شده.
   بعداً از Redux گرفته خواهد شد.
========================================================= */

const customerInfo = {
  name: "امیر مهدی اسلامی",
  phone: "0912 345 6789",
  address: "تهران، خیابان ولیعصر، کوچه نمونه، پلاک ۱۲، واحد ۴",
};

/* =========================================================
   INPUT
========================================================= */

function Input({ label, placeholder, icon: Icon, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs text-white/65">{label}</span>

      <div className="relative">
        <Icon
          size={17}
          strokeWidth={1.4}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#e9a92f]"
        />

        <input
          type={type}
          placeholder={placeholder}
          className="h-[48px] w-full rounded-[11px] border border-[#63221f] bg-somak-850 pl-4 pr-11 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#e9a92f]/60 focus:ring-1 focus:ring-[#e9a92f]/20"
        />
      </div>
    </label>
  );
}

/* =========================================================
   SHIPPING STEP
========================================================= */

function ShippingStep({ onNext }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 15,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -15,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <div className="mb-7">
        <h1 className="text-xl font-medium text-white">اطلاعات ارسال</h1>

        <p className="mt-2 text-xs text-white/45">
          اطلاعات دریافت سفارش خود را وارد کنید.
        </p>
      </div>

      <div className="space-y-5">
        <Input
          label="نام و نام خانوادگی"
          placeholder="نام و نام خانوادگی"
          icon={UserRound}
        />

        <Input
          label="شماره موبایل"
          placeholder="0912 000 0000"
          icon={Phone}
          type="tel"
        />

        <label className="block">
          <span className="mb-2 block text-xs text-white/65">آدرس</span>

          <div className="relative">
            <MapPin
              size={17}
              strokeWidth={1.4}
              className="absolute right-4 top-4 text-[#e9a92f]"
            />

            <textarea
              rows={4}
              placeholder="آدرس کامل خود را وارد کنید..."
              className="w-full resize-none rounded-[11px] border border-[#63221f] bg-somak-850 px-4 py-3 pr-11 text-sm leading-7 text-white outline-none transition placeholder:text-white/25 focus:border-[#e9a92f]/60 focus:ring-1 focus:ring-[#e9a92f]/20"
            />
          </div>
        </label>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="mt-7 flex h-[48px] w-full items-center justify-center gap-3 rounded-full bg-gold-gradient text-sm font-medium text-somak-950 shadow-[0_7px_20px_rgba(230,166,46,0.14)] transition hover:brightness-105"
      >
        ادامه
        <ArrowLeft size={18} strokeWidth={1.7} />
      </button>
    </motion.div>
  );
}

/* =========================================================
   CONFIRMATION STEP
========================================================= */

function ConfirmationStep({ onNext, onBack }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 15,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -15,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <div className="mb-7">
        <div className="mx-auto flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#e9a92f]/40 bg-[#e9a92f]/10 text-[#e9a92f]">
          <Check size={27} strokeWidth={1.6} />
        </div>

        <h1 className="mt-5 text-center text-xl font-medium text-white">
          تأیید سفارش
        </h1>

        <p className="mt-2 text-center text-xs text-white/45">
          اطلاعات سفارش خود را بررسی و تأیید کنید.
        </p>
      </div>

      {/* =====================================================
          CUSTOMER INFO
      ====================================================== */}

      <div className="mb-5 rounded-[13px] border border-[#63221f] bg-[#25080b] p-4">
        <h2 className="mb-4 text-xs font-bold text-white">
          اطلاعات دریافت سفارش
        </h2>

        <div className="space-y-4">
          {/* NAME */}

          <div className="flex justify-items-center items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#180507] text-[#e9a92f]">
              <UserRound size={16} strokeWidth={1.4} />
            </div>

            <div className="flex h-9 min-w-0 items-center gap-3">
              <span className="text-[10px] text-white/35">
                نام و نام خانوادگی
              </span>

              <span className="block text-xs text-white/75">
                {customerInfo.name}
              </span>
            </div>
          </div>

          {/* PHONE */}

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#180507] text-[#e9a92f]">
              <Phone size={16} strokeWidth={1.4} />
            </div>

            <div className="flex h-9 min-w-0 items-center gap-3">
              <span className="block text-[10px] text-white/35">
                شماره تماس
              </span>

              <span
                dir="ltr"
                className="mt-1 block text-left text-xs text-white/75"
              >
                {customerInfo.phone}
              </span>
            </div>
          </div>

          {/* ADDRESS */}

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#180507] text-[#e9a92f]">
              <MapPin size={16} strokeWidth={1.4} />
            </div>

            <div className="flex h-9 min-w-0 items-center gap-3">
              <span className="block text-[10px] text-white/35">
                آدرس تحویل
              </span>

              <span className="block text-xs leading-6 text-white/75">
                {customerInfo.address}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ORDER ITEMS
      ====================================================== */}

      <div className="rounded-[13px] border border-[#63221f] bg-[#25080b] p-4">
        <h2 className="mb-4 text-xs font-medium text-white">خلاصه سفارش</h2>

        <div className="space-y-3">
          {orderItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 text-xs"
            >
              <span className="text-white/60">
                {item.title} × {item.quantity.toLocaleString("fa-IR")}
              </span>

              <span className="shrink-0 text-white">
                {formatPrice(item.price * item.quantity)} تومان
              </span>
            </div>
          ))}
        </div>

        <div className="my-4 h-px bg-[#61221f]" />

        <div className="flex items-center justify-between text-xs">
          <span className="text-white/60">جمع سفارش</span>

          <span className="text-white">{formatPrice(subtotal)} تومان</span>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-white/60">هزینه ارسال</span>

          <span className="text-white">{formatPrice(shipping)} تومان</span>
        </div>

        <div className="my-4 h-px bg-[#61221f]" />

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">
            مبلغ قابل پرداخت
          </span>

          <span className="text-lg font-bold text-[#e9a92f]">
            {formatPrice(total)} تومان
          </span>
        </div>
      </div>

      {/* =====================================================
          NEXT / BACK BUTTONS
      ====================================================== */}

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex h-[48px] flex-1 items-center justify-center gap-2 rounded-full border border-[#642421] text-sm text-white/70 transition hover:border-[#8a322d] hover:bg-[#421014] hover:text-white"
        >
          <ArrowRight size={17} strokeWidth={1.6} />
          بازگشت
        </button>

        <button
          type="button"
          onClick={onNext}
          className="flex h-[48px] flex-[1.7] items-center justify-center gap-2 rounded-full bg-gold-gradient text-sm font-medium text-somak-950 shadow-[0_7px_20px_rgba(230,166,46,0.14)] transition hover:brightness-105"
        >
          ادامه
          <ArrowLeft size={18} strokeWidth={1.7} />
        </button>
      </div>
    </motion.div>
  );
}

/* =========================================================
   PAYMENT STEP
========================================================= */

function PaymentStep({ onBack }) {
  const [paymentMethod, setPaymentMethod] = useState("online");

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 15,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -15,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <div className="mb-7">
        <h1 className="text-xl font-medium text-white">روش پرداخت</h1>

        <p className="mt-2 text-xs text-white/45">
          روش پرداخت سفارش خود را انتخاب کنید.
        </p>
      </div>

      <div className="space-y-3">
        {/* ONLINE */}

        <button
          type="button"
          onClick={() => setPaymentMethod("online")}
          className={`flex w-full items-center gap-4 rounded-[13px] border p-4 text-right transition ${
            paymentMethod === "online"
              ? "border-[#e9a92f]/60 bg-[#e9a92f]/5"
              : "border-[#63221f] bg-[#25080b]"
          }`}
        >
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
              paymentMethod === "online"
                ? "bg-[#e9a92f] text-somak-950"
                : "bg-[#180507] text-[#e9a92f]"
            }`}
          >
            <CreditCard size={20} strokeWidth={1.4} />
          </span>

          <span className="flex-1">
            <span className="block text-sm text-white">
              پرداخت آنلاین
            </span>

            <span className="mt-1 block text-[11px] text-white/40">
              پرداخت امن از طریق درگاه بانکی
            </span>
          </span>

          <span
            className={`h-4 w-4 rounded-full border ${
              paymentMethod === "online"
                ? "border-[#e9a92f] bg-[#e9a92f]"
                : "border-white/20"
            }`}
          />
        </button>

        {/* CASH */}

        <button
          type="button"
          onClick={() => setPaymentMethod("cash")}
          className={`flex w-full items-center gap-4 rounded-[13px] border p-4 text-right transition ${
            paymentMethod === "cash"
              ? "border-[#e9a92f]/60 bg-[#e9a92f]/5"
              : "border-[#63221f] bg-[#25080b]"
          }`}
        >
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
              paymentMethod === "cash"
                ? "bg-[#e9a92f] text-somak-950"
                : "bg-[#180507] text-[#e9a92f]"
            }`}
          >
            <WalletCards size={20} strokeWidth={1.4} />
          </span>

          <span className="flex-1">
            <span className="block text-sm text-white">
              پرداخت هنگام تحویل
            </span>

            <span className="mt-1 block text-[11px] text-white/40">
              پرداخت نقدی هنگام دریافت سفارش
            </span>
          </span>

          <span
            className={`h-4 w-4 rounded-full border ${
              paymentMethod === "cash"
                ? "border-[#e9a92f] bg-[#e9a92f]"
                : "border-white/20"
            }`}
          />
        </button>
      </div>

      <div className="mt-7 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex h-[48px] flex-1 items-center justify-center gap-2 rounded-full border border-[#642421] text-sm text-white/70 transition hover:border-[#8a322d] hover:bg-[#421014] hover:text-white"
        >
          <ArrowRight size={17} strokeWidth={1.6} />
          بازگشت
        </button>

        <button
          type="button"
          className="flex h-[48px] flex-[1.7] items-center justify-center gap-2 rounded-full bg-gold-gradient text-sm font-medium text-somak-950 shadow-[0_7px_20px_rgba(230,166,46,0.14)] transition hover:brightness-105"
        >
          <Check size={18} strokeWidth={1.7} />
          ثبت نهایی سفارش
        </button>
      </div>
    </motion.div>
  );
}

/* =========================================================
   CHECKOUT PAGE
========================================================= */

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const goNext = () => {
    setCurrentStep((step) => Math.min(step + 1, 3));
  };

  const goBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 1));
  };

  return (
    <main
      dir="rtl"
      className="min-h-[calc(100vh-74px)] bg-somak-950 px-4 pb-20 pt-10 sm:px-6 sm:pt-14"
    >
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="mx-auto mb-10 max-w-[900px]">
        <div className="flex items-center justify-between">
          <Link
            to="/products"
            className="flex items-center gap-2 text-[11px] text-white/40 transition hover:text-[#e9a92f]"
          >
            بازگشت به منو
            <ArrowLeft size={15} strokeWidth={1.5} />
          </Link>
        </div>

        <h1 className="text-center text-2xl font-medium text-white sm:text-[27px]">
          تکمیل سفارش
        </h1>
      </div>

      {/* =====================================================
          TIMELINE
      ====================================================== */}

      <div className="mb-10">
        <CheckoutTimeline currentStep={currentStep} />
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <motion.div
        layout
        transition={{
          layout: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        className="mx-auto grid w-full max-w-[900px] grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]"
      >
        {/* ===================================================
            MAIN FORM
        ==================================================== */}

        <motion.section
          layout
          transition={{
            layout: {
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="order-2 rounded-[16px] border border-[#6f2826] bg-[#27090c] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.18)] sm:p-7 lg:order-1"
        >
          <AnimatePresence mode="wait" initial={false}>
            {/* STEP 1 - SHIPPING */}

            {currentStep === 1 && (
              <ShippingStep
                key="shipping"
                onNext={goNext}
              />
            )}

            {/* STEP 2 - CONFIRMATION */}

            {currentStep === 2 && (
              <ConfirmationStep
                key="confirmation"
                onNext={goNext}
                onBack={goBack}
              />
            )}

            {/* STEP 3 - PAYMENT */}

            {currentStep === 3 && (
              <PaymentStep
                key="payment"
                onBack={goBack}
              />
            )}
          </AnimatePresence>
        </motion.section>

        {/* ===================================================
            ORDER SUMMARY
        ==================================================== */}

        <motion.aside
          layout
          transition={{
            layout: {
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="order-1 h-fit rounded-[16px] border border-[#6f2826] bg-[#27090c] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.18)] lg:sticky lg:top-[95px] lg:order-2"
        >
          <h2 className="text-sm font-medium text-white">
            خلاصه سفارش
          </h2>

          <div className="mt-5 space-y-3">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-xs text-white/70">
                    {item.title}
                  </p>

                  <p className="mt-1 text-[10px] text-white/35">
                    تعداد: {item.quantity.toLocaleString("fa-IR")}
                  </p>
                </div>

                <span className="shrink-0 text-[11px] text-white">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="my-5 h-px bg-[#61221f]" />

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-white/50">جمع سفارش</span>

            <span className="text-white">
              {formatPrice(subtotal)}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-white/50">ارسال</span>

            <span className="text-white">
              {formatPrice(shipping)}
            </span>
          </div>

          <div className="my-5 h-px bg-[#61221f]" />

          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white">
              مجموع
            </span>

            <span className="text-[16px] font-bold text-[#e9a92f]">
              {formatPrice(total)} تومان
            </span>
          </div>
        </motion.aside>
      </motion.div>
    </main>
  );
}