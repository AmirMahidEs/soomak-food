import { Edit3, Plus, Trash2, MessageCircle, Tags } from "lucide-react";

import { motion } from "framer-motion";

import {
  getCategories,
  updateCategories,
  createCategory,
  deleteCategory,
} from "../../services/foodServices";

import { useState, useEffect } from "react";

import AdminStatsChip from "../../components/admin/dashboard/AdminStatsChip";

import CategoryModal from "../../components/admin/categories/CategoryModal";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const data = await getCategories();

      const adminCategories = data.filter((category) => category.id !== "");

      setCategories(adminCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCategory = () => {
    setSelectedCategory(null);
    setOpenDialog(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  const isCreate = () => {
    return selectedCategory === null;
  };

  const handleSubmit = async (categoryData) => {
    try {
      if (isCreate()) {
        await createCategory({
          ...categoryData,
          quantity: 0,
        });
      } else {
        await updateCategories(selectedCategory.id, {
          ...categoryData,
          quantity: selectedCategory.quantity,
        });
      }

      await fetchCategories();

      setOpenDialog(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error("خطا در ذخیره دسته‌بندی:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);

      await fetchCategories();
    } catch (error) {
      console.error("خطا در حذف دسته‌بندی:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* HEADER */}
      <div className="flex flex-col justify-end gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleCreateCategory}
          className="flex h-[42px] items-center justify-center gap-2 rounded-full bg-gold-gradient px-5 text-[13px] font-bold text-somak-950 transition hover:brightness-105"
        >
          <Plus size={20} />
          دسته‌بندی جدید
        </button>
      </div>

      {/* CATEGORIES */}
      <section className="overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c]">
        {loading ? (
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-somak-gold" />

              <p className="text-[13px] text-white/45">
                در حال دریافت دسته‌بندی‌ها...
              </p>
            </div>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex min-h-[250px] flex-col items-center justify-center gap-4 px-5 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-white/25">
              <MessageCircle size={26} />
            </div>

            <div>
              <p className="text-[15px] font-medium text-white/70">
                دسته‌بندی‌ای برای نمایش وجود ندارد
              </p>

              <p className="mt-1 text-[13px] text-white/35">
                در حال حاضر هیچ دسته‌بندی‌ای ثبت نشده است.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* DESKTOP CARDS */}
            <div className="hidden space-y-3 p-4 md:block">
              {categories.map((category) => (
                <motion.article
                  key={category.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden rounded-[14px] border border-[#61221f]/70 bg-[#25080b] transition-colors hover:border-[#6f2826]"
                >
                  {/* HEADER */}
                  <div className="flex items-center justify-between gap-4 border-b border-[#61221f]/50 px-4 py-3.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#e9a92f]/10 text-[#e9a92f]">
                        <Tags size={22} strokeWidth={1.6} />
                      </div>

                      <div className="min-w-0">
                        <span className="block text-[12px] text-white/30">
                          دسته‌بندی
                        </span>

                        <p className="mt-1 truncate text-[15px] font-medium text-white/80">
                          {category.Name}
                        </p>
                      </div>
                    </div>

                    <AdminStatsChip order={category} />
                  </div>

                  {/* INFO */}
                  <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-3 p-4">
                    {/* DESCRIPTION */}
                    <div className="rounded-[10px] bg-white/[0.025] p-3">
                      <span className="text-[12.5px] text-white/35">
                        توضیحات
                      </span>

                      <p className="mt-2 truncate text-[15px] leading-6 text-white/70">
                        {category.Description || "بدون توضیحات"}
                      </p>
                    </div>

                    {/* QUANTITY */}
                    <div className="rounded-[10px] bg-white/[0.025] p-3">
                      <span className="text-[12.5px] text-white/35">
                        تعداد غذا
                      </span>

                      <p className="mt-2 text-[16px] text-white/70">
                        {category.quantity.toLocaleString("fa-IR")} غذا
                      </p>
                    </div>

                    {/* ID */}
                    <div className="rounded-[10px] bg-white/[0.025] p-3">
                      <span className="text-[12.5px] text-white/35">شناسه</span>

                      <p className="mt-2 text-[16px] text-white/70">
                        #{category.id}
                      </p>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="flex items-center justify-between border-t border-[#61221f]/40 px-4 py-3">
                    <span className="text-[13px] text-white/30">
                      عملیات دسته‌بندی
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleEditCategory(category)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#63221f] bg-[#27090c] text-white/40 transition hover:border-[#e9a92f]/40 hover:bg-[#421014] hover:text-[#e9a92f]"
                        aria-label="ویرایش دسته‌بندی"
                      >
                        <Edit3 size={22} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#63221f] bg-[#27090c] text-white/40 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
                        aria-label="حذف دسته‌بندی"
                      >
                        <Trash2 size={22} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* MOBILE CARDS */}
            <div className="space-y-3 p-3 md:hidden">
              {categories.map((category) => (
                <motion.article
                  key={category.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-[14px] border border-[#61221f]/70 bg-[#25080b] p-4"
                >
                  {/* CARD HEADER */}
                  <div className="flex items-center justify-between gap-3 border-b border-[#61221f]/50 pb-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] bg-[#e9a92f]/10 text-[#e9a92f]">
                        <Tags size={22} strokeWidth={1.7} />
                      </div>

                      <div className="min-w-0">
                        <span className="block text-[12px] text-white/35">
                          دسته‌بندی
                        </span>

                        <p className="mt-0.5 truncate text-[14px] font-medium text-white/80">
                          {category.Name}
                        </p>
                      </div>
                    </div>

                    <AdminStatsChip order={category} />
                  </div>

                  {/* CATEGORY INFO */}
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="rounded-[10px] bg-white/[0.025] p-3">
                      <span className="text-[12.5px] text-white/35">
                        تعداد غذا
                      </span>

                      <p className="mt-2 text-[16px] text-white/70">
                        {category.quantity.toLocaleString("fa-IR")} غذا
                      </p>
                    </div>

                    <div className="rounded-[10px] bg-white/[0.025] p-3">
                      <span className="text-[12.5px] text-white/35">شناسه</span>

                      <p className="mt-2 text-[16px] text-white/70">
                        #{category.id}
                      </p>
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <div className="mt-3 rounded-[10px] bg-white/[0.025] p-3">
                    <span className="text-[12.5px] text-white/35">توضیحات</span>

                    <p className="mt-2 text-[15px] leading-6 text-white/70">
                      {category.Description || "بدون توضیحات"}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-3 flex items-center justify-between border-t border-[#61221f]/40 pt-3">
                    <span className="text-[13px] text-white/35">
                      عملیات دسته‌بندی
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleEditCategory(category)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#63221f] bg-[#27090c] text-white/40 transition hover:border-[#e9a92f]/40 hover:bg-[#421014] hover:text-[#e9a92f]"
                        aria-label="ویرایش دسته‌بندی"
                      >
                        <Edit3 size={22} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#63221f] bg-[#27090c] text-white/40 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
                        aria-label="حذف دسته‌بندی"
                      >
                        <Trash2 size={22} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </>
        )}
      </section>

      <CategoryModal
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setSelectedCategory(null);
        }}
        onSubmit={handleSubmit}
        initialData={selectedCategory}
      />
    </motion.div>
  );
}
