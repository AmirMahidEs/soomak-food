import { motion } from "framer-motion";
import { CheckCircle2, Heart, Package, Clock3 } from "lucide-react";
import { useSelector } from "react-redux";

import {
  selectProfileFavorites,
  selectProfileInfo,
  selectProfileOrders,
} from "../../features/profile/profileSlice";
import AdminStatsChip from "../admin/dashboard/AdminStatsChip";

export default function ProfileDashboard() {
  const userInfo = useSelector(selectProfileInfo);
  const orders = useSelector(selectProfileOrders);
  const favorites = useSelector(selectProfileFavorites);

  const completedOrders = orders.filter(
    (order) => order.status === "Delivered",
  );

  const activeOrders = orders.filter(
    (order) => order.status === "New" || order.status === "Processing",
  );

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
        <h1 className="text-xl font-medium text-white">
          سلام {userInfo.firstName} 👋
        </h1>
      </div>

      {/* STATS */}
      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-[12px] border border-[#63221f] bg-[#25080b] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[15px] text-white/40">سفارش‌های من</span>

            <Package
              size={22}
              strokeWidth={1.4}
              className="text-[#e9a92f]/70"
            />
          </div>

          <p className="mt-3 text-xl font-medium text-[#e9a92f]">
            {orders.length.toLocaleString("fa-IR")}
          </p>
        </div>

        <div className="rounded-[12px] border border-[#63221f] bg-[#25080b] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[15px] text-white/40">
              سفارش‌های تکمیل شده
            </span>

            <CheckCircle2
              size={22}
              strokeWidth={1.4}
              className="text-[#e9a92f]/70"
            />
          </div>

          <p className="mt-3 text-xl font-medium text-[#e9a92f]">
            {completedOrders.length.toLocaleString("fa-IR")}
          </p>
        </div>

        <div className="rounded-[12px] border border-[#63221f] bg-[#25080b] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[15px] text-white/40">علاقه‌مندی‌ها</span>

            <Heart size={22} strokeWidth={1.4} className="text-[#e9a92f]/70" />
          </div>

          <p className="mt-3 text-xl font-medium text-[#e9a92f]">
            {favorites.length.toLocaleString("fa-IR")}
          </p>
        </div>
      </div>

      {/* ACTIVE ORDERS */}
      <div className="mt-7">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-white">
              سفارش‌های در حال انجام
            </h2>

            <p className="mt-1 text-[13px] text-white/35">
              وضعیت سفارش‌های اخیر شما
            </p>
          </div>

          <Clock3 size={22} strokeWidth={1.35} className="text-[#e9a92f]/70" />
        </div>

        <div className="mt-4 space-y-3">
          {activeOrders.length > 0 ? (
            activeOrders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between gap-3 rounded-[12px] border border-[#63221f] bg-[#25080b] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <span className="text-[15px] text-white/35">
                    سفارش #{order.id}
                  </span>

                  <p className="mt-1 text-[15px] text-white/80">
                    {order.items
                      .map((item) => `${item.quantity} × ${item.title}`)
                      .join("، ")}
                  </p>
                </div>

                <AdminStatsChip order={order} />
              </div>
            ))
          ) : (
            <div className="rounded-[12px] border border-[#63221f] bg-[#25080b] p-5 text-center text-xs text-white/35">
              در حال حاضر سفارش فعالی ندارید.
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
