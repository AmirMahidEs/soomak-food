import { motion } from "framer-motion";
import AdminStatsChip from "./AdminStatsChip";
import { useEffect, useState } from "react";
import { getLastOrders } from "../../../services/adminServices";

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchLastOrders = async () => {
      const lastOrders = await getLastOrders();
      setOrders(lastOrders);
    };

    fetchLastOrders();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.05 }}
      className="rounded-[16px] border border-[#6f2826] bg-[#27090c] p-5 sm:p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-white">سفارش‌های اخیر</h2>

          <p className="mt-1 text-[15px] text-white/40">
            آخرین سفارش‌های ثبت شده
          </p>
        </div>

        <span className="text-[9px] text-[#e9a92f]/80">آخرین سفارش‌ها</span>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[650px] text-right">
          <thead>
            <tr className="border-b border-[#61221f]/70 text-[15px] text-white/80">
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
                <td className="py-4 text-[13px] font-medium text-white/75">
                  {order.id}#
                </td>

                <td className="py-4 text-[13px] text-white/65">
                  {order.userName}
                  <br />
                  {order.userphone}
                </td>

                <td className="py-4 text-[13px] text-white/65">
                  {order.items}
                </td>

                <td className="py-4 text-[13px] text-white/65">
                  {order.totalPrice.toLocaleString("fa-IR")} تومان
                </td>

                <td className="py-4">
                  <AdminStatsChip order={order} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
