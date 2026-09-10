import { UserRound } from "lucide-react";
import { motion } from "framer-motion";
import { getAllUsers } from "../../services/adminServices";
import { useEffect, useState } from "react";
import AdminStatsChip from "../../components/admin/dashboard/AdminStatsChip";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const toPersianDigits = (value) => {
    return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* <div>
        <h1 className="text-xl font-medium text-white">کاربران</h1>

        <p className="mt-2 text-[10px] text-white/35">  
          لیست کاربران ثبت‌نام شده در فروشگاه
        </p>
      </div> */}

      <section className="overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c]">
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
      </section>
    </motion.div>
  );
}
