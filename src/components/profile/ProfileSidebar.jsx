import { Heart, Home, LogOut, MapPin, Package, UserRound } from "lucide-react";

import { motion } from "framer-motion";

const menuItems = [
  {
    id: "dashboard",
    label: "پیشخوان",
    icon: Home,
  },
  {
    id: "orders",
    label: "سفارش‌های من",
    icon: Package,
  },
  {
    id: "profile",
    label: "اطلاعات شخصی",
    icon: UserRound,
  },
  {
    id: "addresses",
    label: "آدرس‌های من",
    icon: MapPin,
  },
  {
    id: "favorites",
    label: "علاقه‌مندی‌ها",
    icon: Heart,
  },
];

export default function ProfileSidebar({ activeTab, onTabChange }) {
  return (
    <aside className="w-full shrink-0 rounded-[16px] border border-[#6f2826] bg-[#27090c] p-3 lg:w-[150px]">
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`group relative flex w-full items-center justify-between rounded-[11px] px-3 py-3 text-right text-[11px] transition-colors duration-200 ${
                isActive
                  ? "text-[#e9a92f]"
                  : "text-white/55 hover:bg-[#421014] hover:text-white"
              }`}
            >
              {/* ACTIVE BACKGROUND */}
              {isActive && (
                <motion.span
                  layoutId="profile-sidebar-active"
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 32,
                    mass: 0.7,
                  }}
                  className="absolute inset-0 rounded-[11px] bg-[#e9a92f]/10 shadow-[0_0_8px_rgba(233,169,47,0.35),0_0_20px_rgba(233,169,47,0.18)]"
                />
              )}

              {/* NEON LINE */}
              {isActive && (
                <span className="absolute inset-y-0 right-0 z-20 flex items-center">
                  <motion.span
                    layoutId="profile-sidebar-neon-line"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                      mass: 0.6,
                    }}
                    className="h-7 w-[2px] rounded-full bg-[#e9a92f] shadow-[0_0_6px_#e9a92f,0_0_12px_#e9a92f,0_0_22px_rgba(233,169,47,0.7)]"
                  />
                </span>
              )}

              {/* CONTENT */}
              <span className="relative z-10 flex items-center gap-2.5">
                <Icon
                  size={17}
                  strokeWidth={1.45}
                  className={isActive ? "text-[#e9a92f]" : "text-[#e9a92f]/75"}
                />

                <span>{item.label}</span>
              </span>
            </button>
          );
        })}

        {/* DIVIDER */}
        <div className="my-2 h-px bg-[#61221f]/70" />

        {/* LOGOUT */}
        <button
          type="button"
          className="flex w-full items-center gap-2.5 rounded-[11px] px-3 py-3 text-right text-[11px] text-white/55 transition hover:bg-[#421014] hover:text-white"
        >
          <LogOut size={17} strokeWidth={1.45} className="text-[#e9a92f]/75" />

          <span>خروج از حساب</span>
        </button>
      </nav>
    </aside>
  );
}
