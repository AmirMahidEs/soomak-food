import { motion } from "framer-motion";

import AdminStatsChip from "./AdminStatsChip";

import { useEffect, useState } from "react";

import { getLastOrders } from "../../../services/adminServices";

import { MessageCircle, Phone, ShoppingBag, UserRound } from "lucide-react";

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastOrders = async () => {
      try {
        setLoading(true);

        const lastOrders = await getLastOrders();

        setOrders(lastOrders);
      } catch (error) {
        console.error("خطا در دریافت سفارش‌های اخیر:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLastOrders();
  }, []);

  const toPersianDigits = (value) => {
    return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
  };

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

      {loading ? (
        <div className="flex min-h-[250px] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-somak-gold" />

            <p className="text-sm text-white/45">
              در حال دریافت سفارش‌های اخیر...
            </p>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex min-h-[250px] flex-col items-center justify-center gap-4 px-5 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-white/25">
            <MessageCircle size={26} />
          </div>

          <div>
            <p className="text-[16px] font-medium text-white/70">
              سفارشی برای نمایش وجود ندارد
            </p>

            <p className="mt-1 text-sm text-white/35">
              در حال حاضر هیچ سفارش اخیری ثبت نشده است.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <div className="mt-5 hidden overflow-x-auto md:block">
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
                      #{order.id}
                    </td>

                    <td className="py-4 text-[14px] text-white/65">
                      {order.userName}
                      <br />
                      {toPersianDigits(order.userphone)}
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

          {/* MOBILE CARDS */}
          <div className="mt-5 space-y-3 md:hidden">
            {orders.map((order) => (
              <motion.article
                key={order.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="rounded-[14px] border border-[#61221f]/70 bg-[#25080b] p-4"
              >
                {/* CARD HEADER */}
                <div className="flex items-center justify-between gap-3 border-b border-[#61221f]/50 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#e9a92f]/10">
                      <ShoppingBag
                        size={16}
                        strokeWidth={1.5}
                        className="text-[#e9a92f]"
                      />
                    </div>

                    <div>
                      <span className="block text-[14px] text-white/35">
                        شماره سفارش
                      </span>

                      <span className="text-[14px] font-medium text-white/80">
                        #{order.id}
                      </span>
                    </div>
                  </div>

                  <AdminStatsChip order={order} />
                </div>

                {/* CUSTOMER */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-[10px] bg-white/[0.025] p-3">
                    <div className="flex items-center gap-2">
                      <UserRound
                        size={14}
                        strokeWidth={1.4}
                        className="text-[#e9a92f]/80"
                      />

                      <span className="text-[14px] text-white/35">مشتری</span>
                    </div>

                    <p className="mt-2 text-[13px] text-white/75">
                      {order.userName}
                    </p>
                  </div>

                  <div className="rounded-[10px] bg-white/[0.025] p-3">
                    <div className="flex items-center gap-2">
                      <Phone
                        size={14}
                        strokeWidth={1.4}
                        className="text-[#e9a92f]/80"
                      />

                      <span className="text-[14px] text-white/35">
                        شماره تماس
                      </span>
                    </div>

                    <p
                      dir="ltr"
                      className="mt-2 text-right text-[13px] text-white/75"
                    >
                      {toPersianDigits(order.userphone)}
                    </p>
                  </div>
                </div>

                {/* ITEMS */}
                <div className="mt-3 rounded-[10px] bg-white/[0.025] p-3">
                  <div className="flex items-center gap-2">
                    <ShoppingBag
                      size={14}
                      strokeWidth={1.4}
                      className="text-[#e9a92f]/80"
                    />

                    <span className="text-[14px] text-white/35">
                      اقلام سفارش
                    </span>
                  </div>

                  <p className="mt-2 text-[13px] leading-6 text-white/70">
                    {order.items}
                  </p>
                </div>

                {/* TOTAL */}
                <div className="mt-3 flex items-center justify-between rounded-[10px] bg-[#e9a92f]/[0.06] px-3 py-3">
                  <span className="text-[15px] text-white/45">مبلغ سفارش</span>

                  <span className="text-[16px] font-medium text-[#e9a92f]">
                    {order.totalPrice.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </>
      )}
    </motion.section>
  );
}
