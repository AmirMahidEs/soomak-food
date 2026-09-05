import { Edit3, Plus, Search, Trash2 } from "lucide-react";

import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import {
  selectProductFilters,
  setProductCategoryFilter,
  setProductSearch,
} from "../../features/admin/adminSlice";
import AdminSelect from "../../components/admin/AdminSelect";
import { useEffect, useState } from "react";
import { getAdminFoods } from "../../services/adminServices";
import { getCategories } from "../../services/foodServices";

export default function AdminProductsPage() {
  const [adminFoods, setAdminFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchAdminFoods = async () => {
      try {
        const data = await getAdminFoods();
        setAdminFoods(data);
      } catch (error) {
        console.error("Error fetching admin foods:", error);
      }
    };
    fetchAdminFoods();
  }, []);

  const dispatch = useDispatch();
  const { search, category } = useSelector(selectProductFilters);

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.Name,
  }));

  const filteredProducts = adminFoods.filter((product) => {
    const matchesSearch = product.FoodName.toLowerCase().includes(
      search.toLowerCase(),
    );

    const matchesCategory =
      !category || product.categoryId.toString() === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* TITLE */}
      <div className="flex flex-col justify-end gap-4 sm:flex-row sm:items-center">
        {/* <div>
          <h1 className="text-xl font-medium text-white">غذاها</h1>

          <p className="mt-2 text-[10px] text-white/35">
            مدیریت غذاها، قیمت‌ها و وضعیت موجودی
          </p>
        </div> */}

        <button
          type="button"
          className="flex h-[42px] items-center justify-center gap-2 rounded-full bg-gold-gradient px-5 text-[13px] font-bold text-somak-950 shadow-[0_7px_20px_rgba(230,166,46,0.12)] transition hover:brightness-105"
        >
          <Plus size={20} strokeWidth={1.6} />
          افزودن غذا
        </button>
      </div>

      {/* FILTER */}
      <section className="rounded-[16px] border border-[#6f2826] bg-[#27090c] p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={20}
              strokeWidth={1.4}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e9a92f]/70"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                dispatch(setProductSearch(event.target.value))
              }
              placeholder="جستجوی غذا..."
              className="h-[42px] w-full rounded-[10px] border border-[#63221f] bg-[#25080b] pl-3 pr-10 text-[15px] text-white/70 outline-none transition placeholder:text-white/25 focus:border-[#e9a92f]/50"
            />
          </div>

          <AdminSelect
            value={category}
            onChange={(value) => dispatch(setProductCategoryFilter(value))}
            options={categoryOptions}
            placeholder="همه محصولات"
          />
        </div>
      </section>

      {/* TABLE */}
      <section className="overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-right">
            <thead>
              <tr className="border-b border-[#61221f]/70 text-[15px] font-bold text-white/80">
                <th className="px-5 py-4">غذا</th>
                <th className="py-4">دسته‌بندی</th>
                <th className="py-4">قیمت</th>
                <th className="px-5 py-4">عملیات</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-white/50">
                    هیچ غذایی برای نمایش وجود ندارد.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-[#61221f]/40 last:border-0"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-[9px] bg-[#421014]" />
                        <span className="text-[15px] text-white/60">
                          {product.FoodName}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 text-[15px] text-white/50">
                      {product.Category}
                    </td>

                    <td className="py-4 text-[15px] text-white/50">
                      {product.price.toLocaleString("fa-IR")} تومان
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
}
