import { ArrowLeft, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CorporateBanner() {
  return (
    <motion.section
      id="corporate"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto max-w-[1200px] px-6"
    >
      <div className="flex flex-col-reverse items-center justify-between gap-8 rounded-2xl border border-[#6d2724] bg-[#320b0e]/75 px-8 py-8 md:flex-row">
        <Link
          to="/products"
          className="flex items-center gap-3 rounded-full bg-[#6d1d1c] px-7 py-3 text-sm text-white transition hover:bg-[#832421]"
        >
          سفارش سازمانی
          <ArrowLeft size={18} />
        </Link>

        <div className="flex items-center gap-6 text-right">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              سفارش برای مهمانی‌ها و مجالس
            </h2>

            <p className="mt-3 text-sm text-somak-muted">
              ارائه خدمات ویژه برای شرکت‌ها، ادارات و مجالس شما
            </p>
          </div>

          <ChefHat
            size={72}
            strokeWidth={1.1}
            className="hidden text-somak-gold md:block"
          />
        </div>
      </div>
    </motion.section>
  );
}
