import {
  Edit3,
  Plus,
  Search,
  Trash2,
  MessageCircle,
  Package,
} from "lucide-react";

import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";

import {
  selectProductFilters,
  setProductCategoryFilter,
  setProductSearch,
} from "../../features/admin/adminSlice";

import AdminSelect from "../../components/admin/AdminSelect";

import { useEffect, useState } from "react";

import {
  getCategories,
  getFoods,
  updateFood,
  createFood,
  deleteFood,
} from "../../services/foodServices";

import FoodModal from "../../components/admin/products/FoodModal";

export default function AdminProductsPage() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [categoriesData, foodsData] = await Promise.all([
          getCategories(),
          getFoods(),
        ]);

        setCategories(categoriesData);
        setFoods(foodsData);
      } catch (error) {
        console.error("Error fetching products data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const dispatch = useDispatch();

  const { search, category } = useSelector(selectProductFilters);

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.Name,
  }));

  const foodCategoryOptions = categories
    .filter((cat) => cat.id !== "" && cat.status === "Active")
    .map((cat) => ({
      value: cat.id,
      label: cat.Name,
    }));

  const filteredProducts = foods.filter((product) => {
    const matchesSearch = product.FoodName.toLowerCase().includes(
      search.toLowerCase(),
    );

    const matchesCategory =
      !category || Number(product.categoryId) === Number(category);

    return matchesSearch && matchesCategory;
  });

  const handleCreateFood = () => {
    setSelectedFood(null);
    setOpenDialog(true);
  };

  const handleEditFood = (product) => {
    setSelectedFood(product);
    setOpenDialog(true);
  };

  const handleDeleteFood = async (foodId) => {
    try {
      await deleteFood(foodId);

      const updatedFoods = await getFoods();

      setFoods(updatedFoods);
    } catch (error) {
      console.error("خطا در حذف غذا:", error);
    }
  };

  const isCreate = () => {
    return selectedFood === null;
  };

  const handleSubmit = async (foodData) => {
    try {
      const selectedCategory = categories.find(
        (category) => Number(category.id) === Number(foodData.categoryId),
      );

      const foodToSave = {
        ...foodData,
        category: selectedCategory?.Name || "",
      };

      if (isCreate()) {
        await createFood(foodToSave);
      } else {
        await updateFood(selectedFood.id, foodToSave);
      }

      const updatedFoods = await getFoods();

      setFoods(updatedFoods);
      setOpenDialog(false);
      setSelectedFood(null);
    } catch (error) {
      console.error("خطا در ذخیره غذا:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* TITLE */}
      <div className="flex flex-col justify-end gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          className="flex h-[42px] items-center justify-center gap-2 rounded-full bg-gold-gradient px-5 text-[13px] font-bold text-somak-950 shadow-[0_7px_20px_rgba(230,166,46,0.12)] transition hover:brightness-105"
          onClick={handleCreateFood}
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
              className="h-[42px] w-full rounded-[10px] border border-[#63221f] bg-[#25080b] pl-3 pr-10 text-[13px] text-white/70 outline-none transition placeholder:text-white/25 focus:border-[#e9a92f]/50"
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

      {/* PRODUCTS */}
      <section className="overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c]">
        {loading ? (
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-somak-gold" />

              <p className="text-sm text-white/45">در حال دریافت غذاها...</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex min-h-[250px] flex-col items-center justify-center gap-4 px-5 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-white/25">
              <MessageCircle size={26} />
            </div>

            <div>
              <p className="text-[15px] font-medium text-white/70">
                غذایی برای نمایش وجود ندارد
              </p>

              <p className="mt-1 text-[13px] text-white/35">
                هیچ غذایی مطابق جستجو یا فیلتر انتخاب‌شده پیدا نشد.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden overflow-x-auto md:block">
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
                  {filteredProducts.map((product) => {
                    const filteredCategoryById = categories.find(
                      (category) =>
                        Number(category.id) === Number(product.categoryId),
                    );

                    return (
                      <tr
                        key={product.id}
                        className="border-b border-[#61221f]/40 last:border-0"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-[9px] bg-[#421014]" />

                            <span className="text-[13px] text-white/60">
                              {product.FoodName}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 text-[13px] text-white/50">
                          {filteredCategoryById?.Name}
                        </td>

                        <td className="py-4 text-[13px] text-white/50">
                          {product.price.toLocaleString("fa-IR")} تومان
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="flex h-9 w-9 items-center justify-center rounded-full text-white/35 transition hover:bg-[#421014] hover:text-[#e9a92f]"
                              onClick={() => handleEditFood(product)}
                            >
                              <Edit3 size={20} />
                            </button>

                            <button
                              type="button"
                              className="flex h-9 w-9 items-center justify-center rounded-full text-white/35 transition hover:bg-red-400/10 hover:text-red-300"
                              onClick={() => handleDeleteFood(product.id)}
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="space-y-3 p-3 md:hidden">
              {filteredProducts.map((product) => {
                const filteredCategoryById = categories.find(
                  (category) =>
                    Number(category.id) === Number(product.categoryId),
                );

                return (
                  <motion.article
                    key={product.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-[14px] border border-[#61221f]/70 bg-[#25080b] p-4"
                  >
                    {/* HEADER */}
                    <div className="flex items-center justify-between gap-3 border-b border-[#61221f]/50 pb-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] bg-[#421014]">
                          <Package
                            size={22}
                            strokeWidth={1.4}
                            className="text-[#e9a92f]/80"
                          />
                        </div>

                        <div className="min-w-0">
                         

                          <p className="truncate text-[14px] font-medium text-white/80">
                            {product.FoodName}
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 text-[14px] text-white/30">
                        {product.id}#
                      </span>
                    </div>

                    {/* INFO */}
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="rounded-[10px] bg-white/[0.025] p-3">
                        <span className="text-[12.5px] text-white/35">
                          دسته‌بندی
                        </span>

                        <p className="mt-1.5 text-[16px] text-white/70">
                          {filteredCategoryById?.Name || "بدون دسته‌بندی"}
                        </p>
                      </div>

                      <div className="rounded-[10px] bg-white/[0.025] p-3">
                        <span className="text-[13px] text-white/35">قیمت</span>

                        <p className="mt-1.5 text-[16px] font-bold text-[#e9a92f]">
                          {product.price.toLocaleString("fa-IR")} تومان
                        </p>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-3 flex items-center justify-end gap-2 border-t border-[#61221f]/40 pt-3">
                      <span className="ml-auto text-[14px] text-white/35">
                        عملیات
                      </span>

                      <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-full text-white/35 transition hover:bg-[#421014] hover:text-[#e9a92f]"
                        onClick={() => handleEditFood(product)}
                      >
                        <Edit3 size={22} />
                      </button>

                      <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-full text-white/35 transition hover:bg-red-400/10 hover:text-red-300"
                        onClick={() => handleDeleteFood(product.id)}
                      >
                        <Trash2 size={22} />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </>
        )}
      </section>

      <FoodModal
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={(foodData) => handleSubmit(foodData)}
        initialData={selectedFood}
        categoryOptions={foodCategoryOptions}
      />
    </motion.div>
  );
}
