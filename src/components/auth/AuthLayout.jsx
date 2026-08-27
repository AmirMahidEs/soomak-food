import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import logo from "../../assets/logo-placeholder.svg";
import foodImage from "../../assets/zereshk-polo.jpg";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#120304] text-somak-cream"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-[-180px] h-[500px] w-[500px] rounded-full bg-[#6f2826]/10 blur-[120px]" />

        <div className="absolute -left-40 bottom-[-180px] h-[500px] w-[500px] rounded-full bg-[#e6a62e]/5 blur-[120px]" />
      </div>

      <main className="relative mx-auto flex min-h-screen w-full max-w-[1250px] flex-col justify-center px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <motion.section
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
          }}
          className="overflow-hidden rounded-[20px] border border-[#6f2826] bg-[#27090c] shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
        >
          <div
            style={{
              direction: "ltr",
            }}
            className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]"
          >
            {/* ========================================= */}
            {/* IMAGE SIDE - DESKTOP ONLY */}
            {/* ========================================= */}

            <div
              dir="rtl"
              className="relative hidden overflow-hidden lg:block lg:min-h-[720px]"
            >
              <img
                src={foodImage}
                alt="زرشک پلو با مرغ"
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#120304]/95 via-[#1d0608]/35 to-[#120304]/25" />

              {/* Soft overlay */}
              <div className="absolute inset-0 bg-[#30090b]/20" />

              {/* Logo */}
              <Link
                to="/"
                className="absolute left-1/2 top-9 z-10 -translate-x-1/2"
              >
                <img
                  src={logo}
                  alt="سومک فود"
                  className="h-[82px] w-auto object-contain drop-shadow-[0_5px_20px_rgba(0,0,0,0.35)]"
                />
              </Link>

              {/* Caption - ALWAYS VISIBLE */}
              <div className="absolute bottom-9 left-0 right-0 z-10 px-8 text-center">
                <div className="mx-auto max-w-[350px]">
                  <div className="mb-4 h-px bg-gradient-to-r from-transparent via-[#e6a62e]/50 to-transparent" />

                  <p className="text-[20px] leading-8 text-white/80">
                    تجربه طعم اصیل ایرانی
                    <br />
                    در هر لحظه کنار شما
                  </p>
                </div>
              </div>
            </div>

            {/* ========================================= */}
            {/* FORM SIDE */}
            {/* ========================================= */}

            <div
              dir="rtl"
              className="flex flex-col justify-center bg-somak-800 px-5 py-8 sm:px-10 lg:min-h-[720px] lg:px-14 lg:py-10"
            >
              {/* Mobile Logo */}
              {/* <div className="mb-7 flex justify-center lg:hidden">
                <Link to="/">
                  <img
                    src={logo}
                    alt="سومک فود"
                    className="h-[72px] w-auto object-contain"
                  />
                </Link>
              </div> */}

              {/* Header */}
              <div className="mx-auto w-full max-w-[430px] text-right">
                <h1 className="text-[25px] font-semibold tracking-[-0.02em] text-white sm:text-[28px]">
                  {title}
                </h1>

                {/* <p className="mt-2 text-sm leading-7 text-white/50">
                  {subtitle}
                </p> */}
              </div>

              {/* Form */}
              <div className="mx-auto mt-7 w-full max-w-[430px]">
                {children}
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
