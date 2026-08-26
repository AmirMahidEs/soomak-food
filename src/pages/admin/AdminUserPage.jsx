import { UserRound } from "lucide-react";
import { motion } from "framer-motion";

const users = [
  {
    id: 1,
    name: "امیر محمدی",
    phone: "0912 123 4567",
    orders: 8,
    status: "فعال",
  },
  {
    id: 2,
    name: "علی رضایی",
    phone: "0912 222 3344",
    orders: 5,
    status: "فعال",
  },
  {
    id: 3,
    name: "رضا احمدی",
    phone: "0912 555 7788",
    orders: 12,
    status: "فعال",
  },
  {
    id: 4,
    name: "محمد کریمی",
    phone: "0912 111 2233",
    orders: 2,
    status: "فعال",
  },
];

export default function AdminUsersPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      <div>
        <h1 className="text-xl font-medium text-white">کاربران</h1>

        <p className="mt-2 text-[10px] text-white/35">
          لیست کاربران ثبت‌نام شده در فروشگاه
        </p>
      </div>

      <section className="overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-right">
            <thead>
              <tr className="border-b border-[#61221f]/70 text-[9px] text-white/30">
                <th className="px-5 py-4 font-normal">کاربر</th>

                <th className="py-4 font-normal">شماره موبایل</th>

                <th className="py-4 font-normal">تعداد سفارش</th>

                <th className="py-4 font-normal">وضعیت</th>

                <th className="py-4 font-normal">عملیات</th>
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
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e9a92f]/10 text-[#e9a92f]">
                        <UserRound size={16} />
                      </div>

                      <span className="text-[10px] text-white/70">
                        {user.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 text-[10px] text-white/45">
                    {user.phone}
                  </td>

                  <td className="py-4 text-[10px] text-white/55">
                    {user.orders}
                  </td>

                  <td className="py-4">
                    <span className="rounded-full bg-green-400/10 px-2.5 py-1 text-[8px] text-green-300">
                      {user.status}
                    </span>
                  </td>

                  <td className="py-4">
                    <button
                      type="button"
                      className="text-[9px] text-[#e9a92f]/75 transition hover:text-[#e9a92f]"
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
