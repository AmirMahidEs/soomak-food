import AdminCategoriesPage from "./AdminCategoriesPage";
import AdminOrdersPage from "./AdminOrdersPage";
import AdminProductsPage from "./AdminProductsPage";

import AdminStatCard from "../../components/admin/dashboard/AdminStatCard";
import RecentOrders from "../../components/admin/dashboard/RecentOrders";

import {
  ClipboardList,
  DollarSign,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";

import { motion } from "framer-motion";

function QuickActions() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.22,
        delay: 0.08,
      }}
      className="mt-5 rounded-[16px] border border-[#6f2826] bg-[#27090c] p-5 sm:p-6"
    >
      <div>
        <h2 className="text-lg font-bold text-white">دسترسی سریع</h2>
      </div>

      <div className="mt-5 flex gap-3 sm:grid-cols-2">
        <button
          type="button"
          className="group w-full rounded-[12px] border border-[#63221f] bg-[#25080b] p-4 text-right transition hover:border-[#e9a92f]/40 hover:bg-[#2c0b0e]"
        >
          <Package size={18} strokeWidth={1.35} className="text-[#e9a92f]" />

          <p className="mt-3 text-[15px] text-white/70 transition group-hover:text-white">
            افزودن غذا
          </p>

          <p className="mt-1 text-[15px] text-white/35">ثبت غذای جدید در منو</p>
        </button>

        <button
          type="button"
          className="group w-full rounded-[12px] border border-[#63221f] bg-[#25080b] p-4 text-right transition hover:border-[#e9a92f]/40 hover:bg-[#2c0b0e]"
        >
          <ClipboardList
            size={18}
            strokeWidth={1.35}
            className="text-[#e9a92f]"
          />

          <p className="mt-3 text-[15px] text-white/70 transition group-hover:text-white">
            دسته‌بندی جدید
          </p>

          <p className="mt-1 text-[15px] text-white/35">
            ایجاد دسته‌بندی برای غذاها
          </p>
        </button>

        <button
          type="button"
          className="group w-full rounded-[12px] border border-[#63221f] bg-[#25080b] p-4 text-right transition hover:border-[#e9a92f]/40 hover:bg-[#2c0b0e]"
        >
          <Users
            size={18}
            strokeWidth={1.35}
            className="text-[#e9a92f]"
          />

          <p className="mt-3 text-[15px] text-white/70 transition group-hover:text-white">
           کاربران
          </p>

          <p className="mt-1 text-[15px] text-white/35">
           مدیریت کاربران
          </p>
        </button>
      </div>
    </motion.section>
  );
}

function DashboardContent() {
  return (
    <div>
      {/* PAGE TITLE */}
      <motion.div
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
        className="mb-5"
      >
        <h1 className="text-xl font-medium text-white">خلاصه وضعیت</h1>

        <p className="mt-2 text-[10px] text-white/35">
          نمای کلی فروشگاه و سفارش‌های اخیر
        </p>
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="سفارش‌های امروز"
          value="۲۴"
          description="۳ سفارش جدید"
          icon={ShoppingBag}
        />

        <AdminStatCard
          title="فروش امروز"
          value="۸.۴M"
          description="تومان"
          icon={DollarSign}
        />

        <AdminStatCard
          title="غذاها"
          value="۳۲"
          description="۲۹ غذای فعال"
          icon={Package}
        />

        <AdminStatCard
          title="کاربران"
          value="۵۴۰"
          description="۱۲ کاربر جدید"
          icon={Users}
        />
      </div>

      {/* RECENT ORDERS */}
      <div className="mt-5">
        <RecentOrders />
      </div>

      {/* QUICK ACTIONS */}
      <QuickActions />
    </div>
  );
}

function UsersContent() {
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
      phone: "0912 555 7890",
      orders: 5,
      status: "فعال",
    },
    {
      id: 3,
      name: "رضا احمدی",
      phone: "0935 321 6547",
      orders: 3,
      status: "فعال",
    },
    {
      id: 4,
      name: "محمد کریمی",
      phone: "0919 444 2266",
      orders: 12,
      status: "فعال",
    },
  ];

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
      className="rounded-[16px] border border-[#6f2826] bg-[#27090c] p-5 sm:p-6"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium text-white">کاربران</h1>

          <p className="mt-2 text-[10px] text-white/35">
            مدیریت کاربران ثبت‌نام شده در فروشگاه
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#e9a92f]/10 text-[#e9a92f]">
          <Users size={17} strokeWidth={1.35} />
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[650px] text-right">
          <thead>
            <tr className="border-b border-[#61221f]/70 text-[9px] text-white/30">
              <th className="pb-3 font-normal">کاربر</th>

              <th className="pb-3 font-normal">شماره موبایل</th>

              <th className="pb-3 font-normal">سفارش‌ها</th>

              <th className="pb-3 font-normal">وضعیت</th>

              <th className="pb-3 font-normal">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-[#61221f]/40 last:border-0"
              >
                <td className="py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9a92f]/10 text-[10px] font-medium text-[#e9a92f]">
                      {user.name.charAt(0)}
                    </div>

                    <span className="text-[10px] text-white/70">
                      {user.name}
                    </span>
                  </div>
                </td>

                <td className="py-4 text-[10px] text-white/45">{user.phone}</td>

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
    </motion.section>
  );
}

function EmptyAdminContent({ title, description, icon: Icon }) {
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
      className="flex min-h-[420px] flex-1 items-center justify-center rounded-[16px] border border-[#6f2826] bg-[#27090c] p-7 shadow-[0_18px_55px_rgba(0,0,0,0.18)]"
    >
      <div className="text-center">
        <div className="mx-auto flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#e9a92f]/30 bg-[#e9a92f]/10 text-[#e9a92f]">
          <Icon size={25} strokeWidth={1.35} />
        </div>

        <h1 className="mt-5 text-xl font-medium text-white">{title}</h1>

        <p className="mt-2 text-xs text-white/45">{description}</p>
      </div>
    </motion.section>
  );
}

export default function AdminPage({ activeTab }) {
  switch (activeTab) {
    case "dashboard":
      return <DashboardContent />;

    case "products":
      return <AdminProductsPage />;

    case "orders":
      return <AdminOrdersPage />;

    case "categories":
      return <AdminCategoriesPage />;

    case "users":
      return <UsersContent />;

    default:
      return <DashboardContent />;
  }
}
