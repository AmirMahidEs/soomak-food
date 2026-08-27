import { Grid2X2, List, RotateCcw, SlidersHorizontal } from "lucide-react";

import { motion } from "framer-motion";

import { useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  resetFilters,
  selectProductCategory,
  selectProductMaxPrice,
  selectProductSort,
  selectProductView,
  setCategory,
  setMaxPrice,
  setSort,
  setView,
} from "../features/products/productsSlice";

import { Link } from "react-router-dom";

import PageMotion from "../components/PageMotion";

import ProductCard from "../components/ProductCard";

import AdminSelect from "../components/admin/AdminSelect";

import { categories, products } from "../data/products";

/* =========================================================
   SORT OPTIONS
========================================================= */

const sortOptions = [
  {
    value: "default",
    label: "پیش‌فرض",
  },
  {
    value: "price-asc",
    label: "ارزان‌ترین",
  },
  {
    value: "price-desc",
    label: "گران‌ترین",
  },
];

/* =========================================================
   PRODUCTS PAGE
========================================================= */

export default function ProductsPage() {
  const dispatch = useDispatch();

  /* =======================================================
     REDUX STATE
  ======================================================= */

  const category = useSelector(selectProductCategory);

  const view = useSelector(selectProductView);

  const maxPrice = useSelector(selectProductMaxPrice);

  const sort = useSelector(selectProductSort);

  /* =======================================================
     LOCAL UI STATE
  ======================================================= */

  const [filtersOpen, setFiltersOpen] = useState(false);

  /* =======================================================
     DYNAMIC PRICE RANGE
  ======================================================= */

  const priceRange = useMemo(() => {
    if (!products.length) {
      return {
        min: 0,
        max: 0,
      };
    }

    const prices = products.map((product) => Number(product.price) || 0);

    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, []);

  /* =======================================================
     FILTER + SORT PRODUCTS
  ======================================================= */

  const filtered = useMemo(() => {
    let result =
      category === "همه محصولات"
        ? [...products]
        : products.filter((product) => product.category === category);

    /* -------------------------------------------------------
       PRICE FILTER
    ------------------------------------------------------- */

    result = result.filter(
      (product) => Number(product.price) <= Number(maxPrice),
    );

    /* -------------------------------------------------------
       SORT
    ------------------------------------------------------- */

    if (sort === "price-asc") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sort === "price-desc") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [category, maxPrice, sort]);

  /* =======================================================
     FORMAT PRICE
  ======================================================= */

  const formatPrice = (price) => {
    return Number(price).toLocaleString("fa-IR");
  };

  /* =======================================================
     RESET FILTERS
  ======================================================= */

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

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
              src={products[1]?.image}
              alt=""
              className="h-[280px] w-full object-cover lg:h-[290px]"
            />
          </div>

          {/* Content */}

          <div className="order-1 text-right lg:order-2">
            <p className="text-xs text-somak-muted">
              صفحه اصلی
              <span className="mx-2">‹</span>
              محصولات
            </p>

            <h1 className="mt-2 text-4xl font-bold text-white">محصولات</h1>

            <p className="mt-5 max-w-xl text-sm leading-8 text-somak-muted">
              مجموعه‌ای از غذاهای اصیل ایرانی با مواد اولیه تازه و طبع روزانه،
              آماده سفارش برای شما.
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
          {/* Product Count */}

          <span className="text-sm text-somak-muted">
            نمایش {filtered.length.toLocaleString("fa-IR")} غذا
          </span>

          {/* Toolbar Actions */}

          <div className="flex items-center gap-3">
            {/* =================================================
                SORT
            ================================================== */}

            <AdminSelect
              value={sort}
              onChange={(value) => dispatch(setSort(value))}
              options={sortOptions}
              className="w-[190px]"
            />

            {/* =================================================
                VIEW SWITCHER
            ================================================== */}

            <div className="hidden rounded-xl border border-[#6d2724] p-1 sm:flex">
              <button
                type="button"
                onClick={() => dispatch(setView("grid"))}
                className={`rounded-lg p-2 transition ${
                  view === "grid"
                    ? "bg-[#5a1b18] text-somak-gold2"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Grid2X2 size={17} />
              </button>

              <button
                type="button"
                onClick={() => dispatch(setView("list"))}
                className={`rounded-lg p-2 transition ${
                  view === "list"
                    ? "bg-[#5a1b18] text-somak-gold2"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <List size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            MOBILE / TABLET FILTER DROPDOWN
        ================================================== */}

        <div className="mb-5 lg:hidden">
          <motion.div
            initial={false}
            animate={{
              height: filtersOpen ? "auto" : "56px",
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="overflow-hidden rounded-2xl border border-[#6d2724] bg-[#28090c]/75"
          >
            {/* Dropdown Header */}

            <button
              type="button"
              onClick={() => setFiltersOpen((prev) => !prev)}
              className="flex h-[56px] w-full shrink-0 items-center justify-between px-4 text-right"
            >
              <div className="flex items-center gap-2 text-somak-gold2">
                <SlidersHorizontal size={18} />

                <span className="font-semibold">دسته‌بندی‌ها</span>
              </div>

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`text-somak-gold2 transition-transform duration-200 ${
                  filtersOpen ? "rotate-180" : ""
                }`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* Dropdown Content */}

            <div className="border-t border-[#6d2724] p-4">
              {/* Categories Header */}

              <div className="flex items-center gap-2 px-2 pb-4 text-somak-gold2">
                <SlidersHorizontal size={18} />

                <h2 className="font-semibold">دسته‌بندی‌ها</h2>
              </div>

              {/* Categories */}

              <div className="space-y-1">
                {categories.map(([name, count]) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => dispatch(setCategory(name))}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-xs transition ${
                      category === name
                        ? "bg-[#542018] text-somak-gold2"
                        : "text-white/80 hover:bg-white/5"
                    }`}
                  >
                    <span>{name}</span>

                    <span>({count.toLocaleString("fa-IR")})</span>
                  </button>
                ))}
              </div>

              {/* Divider */}

              <div className="my-5 h-px bg-[#6d2724]" />

              {/* Price Filter */}

              <h3 className="mb-4 px-2 text-sm font-semibold text-somak-gold2">
                فیلتر بر اساس
              </h3>

              <label className="mb-3 block text-xs text-white">قیمت</label>

              <input
                type="range"
                min={priceRange.min}
                max={priceRange.max}
                value={Math.min(maxPrice, priceRange.max)}
                onChange={(event) =>
                  dispatch(setMaxPrice(Number(event.target.value)))
                }
                className="w-full accent-[#e6a62e]"
              />

              <div className="mt-2 flex justify-between text-[10px] text-somak-muted">
                <span>{formatPrice(priceRange.min)} تومان</span>

                <span>{formatPrice(maxPrice)} تومان</span>
              </div>

              {/* Reset */}

              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-full border border-somak-gold/60 px-3 py-2 text-xs text-somak-gold2 transition hover:bg-somak-gold/10"
              >
                <RotateCcw size={14} />
                پاک کردن فیلترها
              </button>
            </div>
          </motion.div>
        </div>

        {/* =================================================
            MAIN CONTENT
        ================================================== */}

        <div className="grid gap-5 lg:grid-cols-[190px_1fr]">
          {/* =================================================
              DESKTOP SIDEBAR
          ================================================== */}

          <aside className="hidden h-fit rounded-2xl border border-[#6d2724] bg-[#28090c]/75 p-4 lg:sticky lg:top-28 lg:block">
            {/* Categories Header */}

            <div className="flex items-center gap-2 px-2 pb-4 text-somak-gold2">
              <SlidersHorizontal size={18} />

              <h2 className="font-semibold">دسته‌بندی‌ها</h2>
            </div>

            {/* Categories */}

            <div className="space-y-1">
              {categories.map(([name, count]) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => dispatch(setCategory(name))}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-xs transition ${
                    category === name
                      ? "bg-[#542018] text-somak-gold2"
                      : "text-white/80 hover:bg-white/5"
                  }`}
                >
                  <span>{name}</span>

                  <span>({count.toLocaleString("fa-IR")})</span>
                </button>
              ))}
            </div>

            {/* Divider */}

            <div className="my-5 h-px bg-[#6d2724]" />

            {/* Price Filter */}

            <h3 className="mb-4 px-2 text-sm font-semibold text-somak-gold2">
              فیلتر بر اساس
            </h3>

            <label className="mb-3 block text-xs text-white">قیمت</label>

            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={Math.min(maxPrice, priceRange.max)}
              onChange={(event) =>
                dispatch(setMaxPrice(Number(event.target.value)))
              }
              className="w-full accent-[#e6a62e]"
            />

            <div className="mt-2 flex justify-between text-[10px] text-somak-muted">
              <span>{formatPrice(priceRange.min)} تومان</span>

              <span>{formatPrice(maxPrice)} تومان</span>
            </div>

            {/* Reset */}

            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-full border border-somak-gold/60 px-3 py-2 text-xs text-somak-gold2 transition hover:bg-somak-gold/10"
            >
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
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>

            {/* Empty State */}

            {filtered.length === 0 && (
              <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-[#6d2724] bg-[#28090c]/50">
                <div className="text-center">
                  <p className="text-sm text-white">
                    محصولی با این فیلتر پیدا نشد.
                  </p>

                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="mt-4 rounded-full border border-somak-gold/60 px-5 py-2 text-xs text-somak-gold2 transition hover:bg-somak-gold/10"
                  >
                    پاک کردن فیلترها
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =================================================
            PAGINATION
        ================================================== */}

        <div className="mt-7 flex items-center justify-center gap-2">
          {["‹", "۱", "۲", "۳", "›"].map((number, index) => (
            <button
              key={index}
              type="button"
              className={`grid h-10 min-w-10 place-items-center rounded-lg border border-[#6d2724] text-sm transition ${
                number === "۱"
                  ? "bg-somak-gold text-somak-950"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {number}
            </button>
          ))}
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
              ارائه خدمات ویژه برای شرکت‌ها، ادارات و مجالس شما
            </p>
          </div>
        </Link>
      </div>
    </PageMotion>
  );
}
