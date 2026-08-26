import { motion } from "framer-motion";

const orders = [
  {
    id: "#1024",
    customer: "امیر محمدی",
    items: "۲ برگر + ۱ پیتزا",
    price: "۸۵۰,۰۰۰ تومان",
    status: "جدید",
    statusClass: "text-[#e9a92f] bg-[#e9a92f]/10",
  },
  {
    id: "#1023",
    customer: "علی رضایی",
    items: "۱ پاستا + ۲ نوشیدنی",
    price: "۵۴۰,۰۰۰ تومان",
    status: "در حال آماده‌سازی",
    statusClass: "text-blue-300 bg-blue-400/10",
  },
  {
    id: "#1022",
    customer: "رضا احمدی",
    items: "۲ پیتزا",
    price: "۷۲۰,۰۰۰ تومان",
    status: "تکمیل شده",
    statusClass: "text-green-300 bg-green-400/10",
  },
];

export default function RecentOrders() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.05 }}
      className="rounded-[16px] border border-[#6f2826] bg-[#27090c] p-5 sm:p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium text-white">سفارش‌های اخیر</h2>

          <p className="mt-1 text-[9px] text-white/35">
            آخرین سفارش‌های ثبت شده
          </p>
        </div>

        <span className="text-[9px] text-[#e9a92f]/80">آخرین سفارش‌ها</span>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[650px] text-right">
          <thead>
            <tr className="border-b border-[#61221f]/70 text-[9px] text-white/30">
              <th className="pb-3 font-normal">سفارش</th>
              <th className="pb-3 font-normal">مشتری</th>
              <th className="pb-3 font-normal">اقلام</th>
              <th className="pb-3 font-normal">مبلغ</th>
              <th className="pb-3 font-normal">وضعیت</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-[#61221f]/40 last:border-0"
              >
                <td className="py-4 text-[10px] font-medium text-white/75">
                  {order.id}
                </td>

                <td className="py-4 text-[10px] text-white/55">
                  {order.customer}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
