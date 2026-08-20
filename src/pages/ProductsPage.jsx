import {
  ChevronDown,
  Grid2X2,
  List,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import PageMotion from "../components/PageMotion";
import ProductCard from "../components/ProductCard";

import { categories, products } from "../data/products";

export default function ProductsPage() {
  const [category, setCategory] = useState("همه محصولات");
  const [view, setView] = useState("grid");

  const filtered = useMemo(
    () =>
      category === "همه محصولات"
        ? products
        : products.filter(
            (p) => p.category === category
          ),
    [category]
  );

  return (
    <PageMotion>
      {/* =================================================
          HERO / HEADER
      ================================================== */}

      <section className="border-b border-[#67201f] bg-[#230709]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-6 py-8 lg:grid-cols-2">
          {/* Image */}

          <div className="order-2 lg:order-1">
            <img
              src={products[1].image}
              alt=""
              className="h-[280px] w-full object-cover lg:h-[290px]"
            />
          </div>

          {/* Content */}

          <div className="order-1 text-right lg:order-2">
            <p className="text-xs text-somak-muted">
              صفحه اصلی{" "}
              <span className="mx-2">
                ‹
              </span>{" "}
              محصولات
            </p>

            <span className="mt-8 block text-somak-gold2">
              ❧
            </span>

            <h1 className="mt-2 text-4xl font-bold text-white">
              محصولات
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-8 text-somak-muted">
              مجموعه‌ای از غذاهای اصیل ایرانی با
              مواد اولیه تازه و طبع روزانه، آماده
              سفارش برای شما.
            </p>
          </div>
        </div>
      </section>

      {/* =================================================
          PRODUCTS SECTION
      ================================================== */}

      <section className="mx-auto max-w-[1200px] px-6 py-8">
        {/* =================================================
            TOOLBAR
        ================================================== */}

        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="text-sm text-somak-muted">
            نمایش{" "}
            {filtered.length.toLocaleString("fa-IR")}{" "}
            غذا
          </span>

          <div className="flex items-center gap-3">
            {/* Sort */}

            <button className="flex items-center gap-2 rounded-full border border-somak-gold/60 px-5 py-2 text-xs text-white">
              مرتب‌سازی پیش‌فرض
              <ChevronDown size={16} />
            </button>

            {/* View Switcher */}

            <div className="hidden rounded-xl border border-[#6d2724] p-1 sm:flex">
              <button
                onClick={() => setView("grid")}
                className={`rounded-lg p-2 ${
                  view === "grid"
                    ? "bg-[#5a1b18] text-somak-gold2"
                    : "text-white/60"
                }`}
              >
                <Grid2X2 size={17} />
              </button>

              <button
                onClick={() => setView("list")}
                className={`rounded-lg p-2 ${
                  view === "list"
                    ? "bg-[#5a1b18] text-somak-gold2"
                    : "text-white/60"
                }`}
              >
                <List size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            MAIN GRID
            فقط Aside + Products
        ================================================== */}

        <div className="grid gap-5 lg:grid-cols-[190px_1fr]">
          {/* =================================================
              SIDEBAR
          ================================================== */}

          <aside className="h-fit rounded-2xl border border-[#6d2724] bg-[#28090c]/75 p-4 lg:sticky lg:top-28">
            {/* Categories Header */}

            <div className="flex items-center gap-2 px-2 pb-4 text-somak-gold2">
              <SlidersHorizontal size={18} />

              <h2 className="font-semibold">
                دسته‌بندی‌ها
              </h2>
            </div>

            {/* Categories */}

            <div className="space-y-1">
              {categories.map(([name, count]) => (
                <button
                  key={name}
                  onClick={() =>
                    setCategory(name)
                  }
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-xs transition ${
                    category === name
                      ? "bg-[#542018] text-somak-gold2"
                      : "text-white/80 hover:bg-white/5"
                  }`}
                >
                  <span>{name}</span>

                  <span>
                    (
                    {count.toLocaleString(
                      "fa-IR"
                    )}
                    )
                  </span>
                </button>
              ))}
            </div>

            {/* Divider */}

            <div className="my-5 h-px bg-[#6d2724]" />

            {/* Price Filter */}

            <h3 className="mb-4 px-2 text-sm font-semibold text-somak-gold2">
              فیلتر بر اساس
            </h3>

            <label className="mb-3 block text-xs text-white">
              قیمت
            </label>

            <input
              type="range"
              min="0"
              max="500000"
              defaultValue="500000"
              className="w-full accent-[#e6a62e]"
            />

            <div className="mt-2 flex justify-between text-[10px] text-somak-muted">
              <span>۰ تومان</span>

              <span>
                ۵۰۰,۰۰۰ تومان
              </span>
            </div>

            {/* Reset */}

            <button className="mt-7 flex w-full items-center justify-center gap-2 rounded-full border border-somak-gold/60 px-3 py-2 text-xs text-somak-gold2">
              <RotateCcw size={14} />

              پاک کردن فیلترها
            </button>
          </aside>

          {/* =================================================
              PRODUCTS
          ================================================== */}

          <div>
            <motion.div
              layout
              className={
                view === "grid"
                  ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
                  : "grid gap-4"
              }
            >
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* =================================================
            PAGINATION
            خارج از Grid اصلی
        ================================================== */}

        <div className="mt-7 flex items-center justify-center gap-2">
          {["‹", "۱", "۲", "۳", "›"].map(
            (n, i) => (
              <button
                key={i}
                className={`grid h-10 min-w-10 place-items-center rounded-lg border border-[#6d2724] text-sm ${
                  n === "۱"
                    ? "bg-somak-gold text-somak-950"
                    : "text-white/70"
                }`}
              >
                {n}
              </button>
            )
          )}
        </div>
      </section>

      {/* =================================================
          CORPORATE ORDER
      ================================================== */}

      <div className="mx-auto max-w-[1200px] px-6 pb-12">
        <Link
          to="/products"
          className="flex items-center justify-between rounded-2xl border border-[#6d2724] bg-[#320b0e]/70 px-8 py-7"
        >
          <span className="rounded-full bg-[#6d1d1c] px-6 py-3 text-sm">
            سفارش سازمانی ←
          </span>

          <div className="text-right">
            <h2 className="text-xl font-semibold text-white">
              سفارش برای مهمانی‌ها و مجالس
            </h2>

            <p className="mt-2 text-sm text-somak-muted">
              ارائه خدمات ویژه برای شرکت‌ها، ادارات
              و مجالس شما
            </p>
          </div>
        </Link>
      </div>
    </PageMotion>
  );
}