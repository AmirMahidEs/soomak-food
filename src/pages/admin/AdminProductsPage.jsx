import { Edit3, MoreVertical, Plus, Search, Trash2 } from "lucide-react";

import { motion } from "framer-motion";

import { useState } from "react";
import AdminSelect from "../../components/admin/AdminSelect";

const products = [
  {
    id: 1,
    name: "برگر مخصوص سومک",
    category: "برگر",
    price: "۳۸۰,۰۰۰",
    status: "فعال",
    statusClass: "text-green-300 bg-green-400/10",
  },
  {
    id: 2,
    name: "پیتزا پپرونی",
    category: "پیتزا",
    price: "۴۵۰,۰۰۰",
    status: "فعال",
    statusClass: "text-green-300 bg-green-400/10",
  },
  {
    id: 3,
    name: "پاستا آلفردو",
    category: "پاستا",
    price: "۳۲۰,۰۰۰",
    status: "ناموجود",
    statusClass: "text-red-300 bg-red-400/10",
  },
  {
    id: 4,
    name: "چیکن برگر",
    category: "برگر",
    price: "۳۴۰,۰۰۰",
    status: "فعال",
    statusClass: "text-green-300 bg-green-400/10",
  },
];

export default function AdminProductsPage() {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const categoryOptions = [
    { value: "", label: "همه دسته‌بندی‌ها" },
    { value: "burger", label: "برگر" },
    { value: "pizza", label: "پیتزا" },
    { value: "pasta", label: "پاستا" },
  ];

  const statusOptions = [
    { value: "", label: "همه وضعیت‌ها" },
    { value: "active", label: "فعال" },
    { value: "unavailable", label: "ناموجود" },
  ];
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
              placeholder="جستجوی غذا..."
              className="h-[42px] w-full rounded-[10px] border border-[#63221f] bg-[#25080b] pl-3 pr-10 text-[15px] text-white/70 outline-none transition placeholder:text-white/25 focus:border-[#e9a92f]/50"
            />
          </div>

          <AdminSelect
            value={category}
            onChange={setCategory}
            options={categoryOptions}
            placeholder="همه دسته‌بندی‌ها"
          />

          <AdminSelect
            value={status}
            onChange={setStatus}
            options={statusOptions}
            placeholder="همه وضعیت‌ها"
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
                <th className="py-4">وضعیت</th>
                <th className="px-5 py-4">عملیات</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-[#61221f]/40 last:border-0"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-[9px] bg-[#421014]" />

                      <span className="text-[15px] text-white/60">
                        {product.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 text-[15px] text-white/50">
                    {product.category}
                  </td>

                  <td className="py-4 text-[15px] text-white/50">
                    {product.price} تومان
                  </td>

                  <td className="py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[12px] ${product.statusClass}`}
                    >
                      {product.status}
                    </span>
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

                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-white/35 transition hover:bg-[#421014] hover:text-white"
                      >
                        <MoreVertical size={20} />
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
