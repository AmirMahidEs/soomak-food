import { Edit3, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { getCategories } from "../../services/foodServices";
import { useState, useEffect } from "react";
import AdminStatsChip from "../../components/admin/dashboard/AdminStatsChip";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();

        const adminCategories = data.filter((category) => category.id !== "");

        setCategories(adminCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      <div className="flex flex-col justify-end gap-4 sm:flex-row sm:items-center">
        {/* <div>
          <h1 className="text-xl font-medium text-white">دسته‌بندی‌ها</h1>

          <p className="mt-2 text-[10px] text-white/35">
            مدیریت دسته‌بندی‌های غذا
          </p>
        </div> */}

        <button
          type="button"
          className="flex h-[42px] items-center justify-center gap-2 rounded-full bg-gold-gradient px-5 text-[13px] font-bold text-somak-950 transition hover:brightness-105"
        >
          <Plus size={20} />
          دسته‌بندی جدید
        </button>
      </div>
      <section className="overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-right">
            <thead>
              <tr className="border-b border-[#61221f]/70 text-[9px] text-white/30">
                <th className="px-5 py-4 text-sm font-bold text-white/80">
                  دسته‌بندی
                </th>

                <th className="py-4 text-sm font-bold text-white/80">
                  توضیحات
                </th>

                <th className="py-4 text-sm font-bold text-white/80">
                  تعداد غذا
                </th>

                <th className="py-4 text-sm font-bold text-white/80">وضعیت</th>

                <th className="px-5 py-4 text-sm font-bold text-white/80">
                  عملیات
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-[#61221f]/40 last:border-0"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-[9px] bg-[#e9a92f]/10 text-[#e9a92f]">
                        {category.Name.charAt(0)}
                      </div>

                      <span className="text-[15px] text-white/60">
                        {category.Name}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 text-[15px] text-white/60">
                    {category.Description}
                  </td>

                  <td className="py-4 text-[15px] text-white/60">
                    {category.quantity.toLocaleString("fa-IR")} غذا
                  </td>

                  <td className="py-4">
                    <AdminStatsChip order={category} />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-white/35 transition hover:bg-[#421014] hover:text-[#e9a92f]"
                      >
                        <Edit3 size={20} />
                      </button>

                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-white/35 transition hover:bg-red-400/10 hover:text-red-300"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
}
