import { motion } from "framer-motion";
import OrderRow from "./OrderRow";

const orders = [
  {
    id: "#1024",
    customer: "امیر محمدی",
    items: "۲ برگر + ۱ پیتزا",
    price: "۸۵۰,۰۰۰ تومان",
    status: "جدید",
    time: "۱۴:۳۲",
  },
  {
    id: "#1023",
    customer: "علی رضایی",
    items: "۱ پاستا + ۲ نوشیدنی",
    price: "۵۴۰,۰۰۰ تومان",
    status: "در حال آماده‌سازی",
    time: "۱۴:۱۸",
  },
  {
    id: "#1022",
    customer: "رضا احمدی",
    items: "۲ پیتزا",
    price: "۷۲۰,۰۰۰ تومان",
    status: "تکمیل شده",
    time: "۱۳:۵۵",
  },
];

export default function OrderTable() {
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
                سفارش
              </th>

              <th className="px-4 py-4 font-normal">
                مشتری
              </th>

              <th className="px-4 py-4 font-normal">
                اقلام
              </th>

              <th className="px-4 py-4 font-normal">
                مبلغ
              </th>

              <th className="px-4 py-4 font-normal">
                زمان
              </th>

              <th className="px-5 py-4 font-normal">
                وضعیت
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
              />
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}