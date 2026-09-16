import { UserRound, MessageCircle } from "lucide-react";
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
      const createdOrder = await createOrder(orderData);

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

                <p className="text-sm text-white/45">
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
                <p className="text-[16px] font-medium text-white/70">
                  کاربری برای نمایش وجود ندارد
                </p>

                <p className="mt-1 text-sm text-white/35">
                  در حال حاضر هیچ کاربری ثبت‌نام نکرده است.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
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

                          <span className="text-[17px] text-white/70">
                            {user.UserName}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 text-[17px] text-white/45">
                        {toPersianDigits(user.phoneNumber)}
                      </td>

                      <td className="py-4 text-[19px] text-white/55">
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
                          مشاهده
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
