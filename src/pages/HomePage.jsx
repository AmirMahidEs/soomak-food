import {
  ArrowLeft,
  Leaf,
  PackageCheck,
  Soup,
  Trophy,
  Truck,
  Headphones,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageMotion from "../components/PageMotion";
import SectionTitle from "../components/SectionTitle";
import ProductCard from "../components/ProductCard";
import CorporateBanner from "../components/CorporateBanner";
import { products } from "../data/products";
import { useEffect, useState } from "react";

import { getPopularFoods } from "../services/foodServices";
export default function HomePage() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    async function fetchPopular() {
      const [popularFoods] = await Promise.all([getPopularFoods()]);

      setPopular(popularFoods);
    }

    fetchPopular();
  }, []);
  return (
    <PageMotion>
      <section
        id="about"
        className="relative overflow-hidden border-b border-white/5"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(110,20,18,.25),transparent_42%)]" />
        <div className="relative z-10 mx-auto grid min-h-[590px] max-w-[1200px] items-center gap-4 px-6 py-12 lg:grid-cols-[1.02fr_.98fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75 }}
            className="order-2 lg:order-1"
          >
            <div className="relative mx-auto max-w-[610px]">
              <img
                src={products[1].image}
                alt="زرشک پلو با مرغ"
                className="w-full rounded-[2.5rem] object-cover shadow-2xl"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="order-1 pr-0 text-right lg:order-2 lg:pr-8"
          >
            <h1 className="text-4xl font-bold leading-[1.55] text-white sm:text-5xl">
              <span className="text-somak-gold2">طعم</span> اصیل ایرانی
              <br />
              در هر لحظه کنار شما
            </h1>
            <p className="mt-6 max-w-xl text-base leading-9 text-somak-muted">
              ما در سومک فود، با عشق و از بهترین مواد اولیه، غذاهای اصیل ایرانی
              را برای شما آماده می‌کنیم.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#f5d26b] to-[#d9931e] px-7 py-3.5 font-semibold text-somak-950 transition-all duration-300 hover:-translate-y-1 hover:from-[#ffe28a] hover:to-[#e6a52e] hover:shadow-[0_8px_25px_rgba(217,147,30,0.3)]"
              >
                سفارش آنلاین <ArrowLeft size={18} />
              </Link>
              <Link
                to="/products"
                className="rounded-full border border-somak-gold/70 px-7 py-3.5 text-white transition hover:bg-somak-gold hover:text-somak-950"
              >
                مشاهده منو
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-8 text-sm text-white/90">
              <Feature icon={Leaf} text="مواد اولیه تازه" />
              <Feature icon={Soup} text="پخت روزانه" />
              <Feature icon={PackageCheck} text="بسته‌بندی بهداشتی" />
            </div>
          </motion.div>
        </div>
      </section>
      <section id="menu" className="mx-auto max-w-[1200px] px-6 py-16">
        <SectionTitle>محبوب‌ترین غذاها</SectionTitle>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {popular.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.07 }}
            >
              <ProductCard product={p} compact />
            </motion.div>
          ))}
        </div>
      </section>
      <CorporateBanner />
      <section className="mx-auto grid max-w-[1200px] gap-5 px-6 py-12 md:grid-cols-3">
        <Service
          icon={Trophy}
          title="کیفیت تضمینی"
          text="تضمین کیفیت و طعم غذاها"
        />
        <Service
          icon={Truck}
          title="ارسال سریع"
          text="تحویل در کوتاه‌ترین زمان"
        />
        <Service
          icon={Headphones}
          title="پشتیبانی آنلاین"
          text="همه روزه از ۹ صبح تا ۱۲ شب"
        />
      </section>
    </PageMotion>
  );
}
function Feature({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <Icon size={28} className="text-somak-gold" strokeWidth={1.4} />
      <span>{text}</span>
    </div>
  );
}
function Service({ icon: Icon, title, text }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="rounded-2xl border border-[#6d2724] bg-[#2a090c]/70 p-8 text-center"
    >
      <Icon className="mx-auto text-somak-gold" size={46} strokeWidth={1.3} />
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-somak-muted">{text}</p>
    </motion.div>
  );
}
