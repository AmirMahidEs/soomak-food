import { motion } from "framer-motion";
import ProductRow from "./ProductRow";

const products = [
  {
    id: 1,
    name: "برگر سومک",
    category: "برگر",
    price: "۲۸۰,۰۰۰",
    stock: true,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    name: "پیتزا مخصوص",
    category: "پیتزا",
    price: "۳۹۰,۰۰۰",
    stock: true,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 3,
    name: "پاستا آلفردو",
    category: "پاستا",
    price: "۲۴۰,۰۰۰",
    stock: false,
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=200&q=80",
  },
];

export default function ProductTable() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c]"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-right">
          <thead>
            <tr className="border-b border-[#61221f]/70 text-[9px] text-white/30">
              <th className="px-5 py-4 font-normal">
                غذا
              </th>

              <th className="px-4 py-4 font-normal">
                دسته‌بندی
              </th>

              <th className="px-4 py-4 font-normal">
                قیمت
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
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
              />
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}