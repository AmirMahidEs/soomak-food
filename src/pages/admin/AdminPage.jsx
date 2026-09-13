import AdminStatCard from "../../components/admin/dashboard/AdminStatCard";

import RecentOrders from "../../components/admin/dashboard/RecentOrders";

import {
  ClipboardList,
  DollarSign,
  Package,
  ShoppingBag,
  Users,
  MessageCircle,
} from "lucide-react";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import { getAdminStats } from "../../services/adminServices";

function DashboardContent() {
  const [adminStats, setAdminStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setLoading(true);

        const stats = await getAdminStats();
        setAdminStats(stats);
      } catch (error) {
        console.error("خطا در دریافت آمار داشبورد:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

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
        <h1 className="text-xl font-bold text-white">خلاصه وضعیت</h1>

        <p className="mt-2 text-[13.5px] text-white">
          نمای کلی فروشگاه و سفارش‌های اخیر
        </p>
      </motion.div>

      {/* STATS */}
      {loading ? (
        <section className="flex min-h-[250px] items-center justify-center rounded-[16px] border border-[#6f2826] bg-[#27090c]">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-somak-gold" />

            <p className="text-sm text-white/45">
              در حال دریافت آمار داشبورد...
            </p>
          </div>
        </section>
      ) : adminStats.length === 0 ? (
        <section className="flex min-h-[250px] items-center justify-center rounded-[16px] border border-[#6f2826] bg-[#27090c]">
          <div className="flex flex-col items-center gap-4 px-5 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-white/25">
              <MessageCircle size={26} />
            </div>

            <div>
              <p className="text-[16px] font-medium text-white/70">
                آماری برای نمایش وجود ندارد
              </p>

              <p className="mt-1 text-sm text-white/35">
                در حال حاضر اطلاعاتی برای نمایش در داشبورد موجود نیست.
              </p>
            </div>
          </div>
        </section>
      ) : (
        adminStats.map((stat) => (
          <div
            key={stat.id}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
          >
            <AdminStatCard
              title="سفارش‌های امروز"
              value={stat.totalOrders.toLocaleString("fa-IR")}
              description={`${stat.newOrders.toLocaleString("fa-IR")} سفارش جدید`}
              icon={ShoppingBag}
            />

            <AdminStatCard
              title="فروش امروز"
              value={stat.totalSales.toLocaleString("fa-IR")}
              description="تومان"
              icon={DollarSign}
            />

            <AdminStatCard
              title="غذاها"
              value={stat.totalFoods.toLocaleString("fa-IR")}
              description={`${stat.activeFoods.toLocaleString("fa-IR")} غذای فعال`}
              icon={Package}
            />

            <AdminStatCard
              title="کاربران"
              value={stat.totalUsers.toLocaleString("fa-IR")}
              description={`${stat.newUsers.toLocaleString("fa-IR")} کاربر جدید`}
              icon={Users}
            />
          </div>
        ))
      )}

      {/* RECENT ORDERS */}
      {!loading && adminStats.length > 0 && (
        <div className="mt-5">
          <RecentOrders />
        </div>
      )}
    </div>
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

export default function AdminPage() {
  return <DashboardContent />;
}