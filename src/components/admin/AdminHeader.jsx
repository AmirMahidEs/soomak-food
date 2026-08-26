import { Bell } from "lucide-react";

const titles = {
  dashboard: {
    title: "پیشخوان مدیریت",
    description: "مدیریت و نظارت بر فروشگاه سومک",
  },
  products: {
    title: "مدیریت غذاها",
    description: "افزودن، ویرایش و مدیریت غذاهای فروشگاه",
  },
  orders: {
    title: "مدیریت سفارش‌ها",
    description: "مشاهده و مدیریت سفارش‌های مشتریان",
  },
  categories: {
    title: "دسته‌بندی‌ها",
    description: "مدیریت دسته‌بندی غذاهای فروشگاه",
  },
  users: {
    title: "کاربران",
    description: "مشاهده و مدیریت کاربران فروشگاه",
  },
};

export default function AdminHeader({ activeTab }) {
  const current = titles[activeTab] || titles.dashboard;

  return (
    <header className="flex h-[64px] items-center justify-between rounded-[16px] border border-[#6f2826] bg-[#27090c] px-4 sm:px-6">
      <div>
        <p className="text-sm font-medium text-white">{current.title}</p>

        <p className="mt-1 text-[10px] text-white/35">{current.description}</p>
      </div>

      <div className="flex items-center gap-3">
        {/* NOTIFICATION */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#63221f] bg-[#25080b] text-white/55 transition hover:border-[#e9a92f]/40 hover:text-[#e9a92f]"
        >
          <Bell size={16} strokeWidth={1.4} />

          <span className="absolute right-[7px] top-[6px] h-1.5 w-1.5 rounded-full bg-[#e9a92f] shadow-[0_0_7px_#e9a92f]" />
        </button>

        {/* ADMIN */}
        <div className="flex items-center gap-2.5 border-r border-[#61221f] pr-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e9a92f]/10 text-xs font-medium text-[#e9a92f]">
            ا
          </div>

          <div className="hidden sm:block">
            <p className="text-[11px] text-white">مدیر فروشگاه</p>

            <p className="mt-0.5 text-[9px] text-white/35">مدیر سیستم</p>
          </div>
        </div>
      </div>
    </header>
  );
}
