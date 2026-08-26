import { motion } from "framer-motion";
import CategoryRow from "./CategoryRow";

const categories = [
  {
    id: 1,
    name: "برگر",
    count: 8,
    status: true,
  },
  {
    id: 2,
    name: "پیتزا",
    count: 7,
    status: true,
  },
  {
    id: 3,
    name: "پاستا",
    count: 5,
    status: true,
  },
  {
    id: 4,
    name: "نوشیدنی",
    count: 12,
    status: true,
  },
];

export default function CategoryTable() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c]"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-right">
          <thead>
            <tr className="border-b border-[#61221f]/70 text-[9px] text-white/30">
              <th className="px-5 py-4 font-normal">
                نام دسته‌بندی
              </th>

              <th className="px-4 py-4 font-normal">
                تعداد غذا
              </th>

              <th className="px-4 py-4 font-normal">
                وضعیت
              </th>

              <th className="px-5 py-4 font-normal">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <CategoryRow
                key={category.id}
                category={category}
              />
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}