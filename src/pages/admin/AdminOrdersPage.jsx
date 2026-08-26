import { Eye, Search } from "lucide-react";
import { motion } from "framer-motion";

const orders = [
  {
    id: "#1024",
    customer: "امیر محمدی",
    phone: "0912 123 4567",
    items: "۲ برگر + ۱ پیتزا",
    price: "۸۵۰,۰۰۰ تومان",
    status: "جدید",
    statusClass: "text-[#e9a92f] bg-[#e9a92f]/10",
  },
  {
    id: "#1023",
    customer: "علی رضایی",
    phone: "0912 222 3344",
    items: "۱ پاستا + ۲ نوشیدنی",
    price: "۵۴۰,۰۰۰ تومان",
    status: "در حال آماده‌سازی",
    statusClass: "text-blue-300 bg-blue-400/10",
  },
  {
    id: "#1022",
    customer: "رضا احمدی",
    phone: "0912 555 7788",
    items: "۲ پیتزا",
    price: "۷۲۰,۰۰۰ تومان",
    status: "تکمیل شده",
    statusClass: "text-green-300 bg-green-400/10",
  },
];

export default function AdminOrdersPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      <div>
        <h1 className="text-xl font-medium text-white">سفارش‌ها</h1>

        <p className="mt-2 text-[10px] text-white/35">
          مشاهده و مدیریت سفارش‌های مشتریان
        </p>
      </div>

      {/* FILTER */}
      <section className="rounded-[16px] border border-[#6f2826] bg-[#27090c] p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e9a92f]/70"
            />

            <input
              placeholder="جستجوی شماره سفارش یا مشتری..."
              className="h-[42px] w-full rounded-[10px] border border-[#63221f] bg-[#25080b] pl-3 pr-10 text-[10px] text-white/70 outline-none placeholder:text-white/25 focus:border-[#e9a92f]/50"
            />
          </div>

          <select className="h-[42px] rounded-[10px] border border-[#63221f] bg-[#25080b] px-4 text-[10px] text-white/55 outline-none">
            <option>همه وضعیت‌ها</option>
            <option>جدید</option>
            <option>در حال آماده‌سازی</option>
            <option>تکمیل شده</option>
            <option>لغو شده</option>
          </select>
        </div>
      </section>

      {/* TABLE */}
      <section className="overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-right">
            <thead>
              <tr className="border-b border-[#61221f]/70 text-[9px] text-white/30">
                <th className="px-5 py-4 font-normal">سفارش</th>
                <th className="py-4 font-normal">مشتری</th>
                <th className="py-4 font-normal">اقلام</th>
                <th className="py-4 font-normal">مبلغ</th>
                <th className="py-4 font-normal">وضعیت</th>
                <th className="px-5 py-4 font-normal">جزئیات</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-[#61221f]/40 last:border-0"
                >
                  <td className="px-5 py-4 text-[10px] font-medium text-white/75">
                    {order.id}
                  </td>

                  <td className="py-4">
                    <p className="text-[10px] text-white/60">
                      {order.customer}
                    </p>

                    <p className="mt-1 text-[8px] text-white/25">
                      {order.phone}
                    </p>
                  </td>

                  <td className="py-4 text-[10px] text-white/40">
                    {order.items}
                  </td>

                  <td className="py-4 text-[10px] text-white/60">
                    {order.price}
                  </td>

                  <td className="py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[8px] ${order.statusClass}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      className="flex h-8 items-center gap-1.5 rounded-full border border-[#63221f] bg-[#25080b] px-3 text-[9px] text-white/50 transition hover:border-[#e9a92f]/40 hover:text-[#e9a92f]"
                    >
                      <Eye size={13} />
                      مشاهده
                    </button>
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
