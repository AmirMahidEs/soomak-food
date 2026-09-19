import { UserRound, MessageCircle, ShoppingBag, Phone } from "lucide-react";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import { getAllUsers, createOrder } from "../../services/adminServices";

import AdminStatsChip from "../../components/admin/dashboard/AdminStatsChip";

import ManualOrderModal from "../../components/admin/orders/ManualOrderModal";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [manualOrderOpen, setManualOrderOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const data = await getAllUsers();

        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toPersianDigits = (value) => {
    return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
  };

  const handleManualOrderSubmit = async (orderData) => {
    try {
      await createOrder(orderData);

      setManualOrderOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error creating manual order:", error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-5"
      >
        <section className="overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c]">
          {loading ? (
            <div className="flex min-h-[250px] items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-somak-gold" />

                <p className="text-[13px] text-white/45">
                  در حال دریافت کاربران...
                </p>
              </div>
            </div>
          ) : users.length === 0 ? (
            <div className="flex min-h-[250px] flex-col items-center justify-center gap-4 px-5 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-white/25">
                <MessageCircle size={26} />
              </div>

              <div>
                <p className="text-[15px] font-medium text-white/70">
                  کاربری برای نمایش وجود ندارد
                </p>

                <p className="mt-1 text-[13px] text-white/35">
                  در حال حاضر هیچ کاربری ثبت‌نام نکرده است.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[650px] text-right">
                  <thead>
                    <tr className="border-b border-[#61221f]/70 text-[15px] font-bold text-white/80">
                      <th className="px-5 py-4">کاربر</th>
                      <th className="py-4">شماره موبایل</th>
                      <th className="py-4">تعداد سفارش</th>
                      <th className="py-4">وضعیت</th>
                      <th className="py-4">عملیات</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-[#61221f]/40 last:border-0"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9a92f]/10 text-[#e9a92f]">
                              <UserRound size={20} />
                            </div>

                            <span className="text-[13px] text-white/70">
                              {user.UserName}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 text-[13px] text-white/45">
                          {toPersianDigits(user.phoneNumber)}
                        </td>

                        <td className="py-4 text-[16px] text-white/55">
                          {user.OrderCount.toLocaleString("fa-IR")}
                        </td>

                        <td className="py-4">
                          <AdminStatsChip order={user} />
                        </td>

                        <td className="py-4">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedUser(user);
                              setManualOrderOpen(true);
                            }}
                            className="text-[12px] text-[#e9a92f]/75 transition hover:text-[#e9a92f]"
                          >
                            ثبت سفارش برای کاربر
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARDS */}
              <div className="space-y-3 p-3 md:hidden">
                {users.map((user) => (
                  <motion.article
                    key={user.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-[14px] border border-[#61221f]/70 bg-[#25080b] p-4"
                  >
                    {/* CARD HEADER */}
                    <div className="flex items-center justify-between gap-3 border-b border-[#61221f]/50 pb-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] bg-[#e9a92f]/10 text-[#e9a92f]">
                          <UserRound size={22} strokeWidth={1.7} />
                        </div>

                        <div className="min-w-0">
                          <span className="block text-[12px] text-white/35">
                            کاربر
                          </span>

                          <p className="mt-0.5 truncate text-[14px] font-medium text-white/80">
                            {user.UserName}
                          </p>
                        </div>
                      </div>

                      <AdminStatsChip order={user} />
                    </div>

                    {/* USER INFO */}
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="rounded-[10px] bg-white/[0.025] p-3">
                        <div className="flex items-center gap-2">
                          <Phone
                            size={16}
                            strokeWidth={1.7}
                            className="text-[#e9a92f]/70"
                          />

                          <span className="text-[12.5px] text-white/35">
                            شماره موبایل
                          </span>
                        </div>

                        <p
                          dir="ltr"
                          className="mt-2 text-right text-[16px] text-white/70"
                        >
                          {toPersianDigits(user.phoneNumber)}
                        </p>
                      </div>

                      <div className="rounded-[10px] bg-white/[0.025] p-3">
                        <div className="flex items-center gap-2">
                          <ShoppingBag
                            size={16}
                            strokeWidth={1.7}
                            className="text-[#e9a92f]/70"
                          />

                          <span className="text-[12.5px] text-white/35">
                            تعداد سفارش
                          </span>
                        </div>

                        <p className="mt-2 text-[16px] text-white/70">
                          {user.OrderCount.toLocaleString("fa-IR")}
                        </p>
                      </div>
                    </div>

                    {/* USER ID */}
                    <div className="mt-3 rounded-[10px] bg-white/[0.025] p-3">
                      <span className="text-[12.5px] text-white/35">
                        شناسه کاربر
                      </span>

                      <p className="mt-2 text-[16px] text-white/70">
                        #{user.id}
                      </p>
                    </div>

                    {/* ACTION */}
                    <div className="mt-3 flex items-center justify-between border-t border-[#61221f]/40 pt-3">
                      <span className="text-[13px] text-white/35">
                        ثبت سفارش برای کاربر
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedUser(user);
                          setManualOrderOpen(true);
                        }}
                        className="flex h-10 items-center gap-2 rounded-full border border-[#63221f] bg-[#27090c] px-3 text-[14px] text-white/50 transition hover:border-[#e9a92f]/40 hover:bg-[#421014] hover:text-[#e9a92f]"
                      >
                        <ShoppingBag size={20} />
                        سفارش
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            </>
          )}
        </section>
      </motion.div>

      <ManualOrderModal
        open={manualOrderOpen}
        onClose={() => {
          setManualOrderOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSubmit={handleManualOrderSubmit}
      />
    </>
  );
}
