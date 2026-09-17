import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { useSelector } from "react-redux";

import { selectProfileOrders } from "../../features/profile/profileSlice";
import AdminStatsChip from "../admin/dashboard/AdminStatsChip";

function formatPrice(price) {
  return `${price.toLocaleString("fa-IR")} تومان`;
}

export default function ProfileOrders() {
  const orders = useSelector(selectProfileOrders);

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.22,
      }}
      className="flex-1 rounded-[16px] border border-[#6f2826] bg-[#27090c] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.18)] sm:p-7"
    >
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-medium text-white">سفارش‌های من</h1>

      
      </div>

      {/* ORDERS */}
      <div className="mt-7 space-y-3">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="rounded-[13px] border border-[#63221f] bg-[#25080b] p-4"
            >
              {/* TOP */}
              <div className="flex justify-between gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-[#e9a92f]/10 text-[#e9a92f]">
                    <Package size={25} strokeWidth={1.35} />
                  </div>

                  <div>
                    <span className="text-[14px] text-white/35">
                      سفارش #{order.id}
                    </span>

                    <p className="mt-1 text-[15px] text-white/75">
                      {order.items
                        .map((item) => `${item.quantity} × ${item.title}`)
                        .join("، ")}
                    </p>
                  </div>
                </div>

                <AdminStatsChip order={order} />
              </div>

              {/* BOTTOM */}
              <div className="mt-4 flex flex-col gap-2 border-t border-[#61221f]/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[14px] text-white/35">مبلغ سفارش</span>

                <span className="text-lg font-medium text-[#e9a92f]">
                  {formatPrice(order.totalPrice)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[13px] border border-[#63221f] bg-[#25080b]">
            <Package
              size={28}
              strokeWidth={1.25}
              className="text-[#e9a92f]/50"
            />

            <p className="mt-4 text-sm text-white/50">
              هنوز سفارشی ثبت نکرده‌اید.
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
}
