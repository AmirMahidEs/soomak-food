import {
  ClipboardList,
  LogOut,
  Package,
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  MessageCircle,
} from "lucide-react";

import { motion } from "framer-motion";

const menuItems = [
  {
    id: "dashboard",
    label: "پیشخوان",
    icon: LayoutDashboard,
  },
  {
    id: "products",
    label: "غذاها",
    icon: Package,
  },
  {
    id: "orders",
    label: "سفارش‌ها",
    icon: ShoppingBag,
  },
  {
    id: "categories",
    label: "دسته‌بندی‌ها",
    mobileLabel: "دسته‌ها",
    icon: ClipboardList,
  },
  {
    id: "users",
    label: "کاربران",
    icon: Users,
  },
  {
    id: "settings",
    label: "تنظیمات",
    icon: Settings,
  },
  {
    id: "comments",
    label: "نظرات",
    icon: MessageCircle,
  },
];

export default function AdminSidebar({ activeTab, onTabChange }) {
  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden h-fit w-[165px] shrink-0 self-start rounded-[18px] border border-[#6f2826] bg-[#27090c] p-3 lg:block">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`group relative flex h-[46px] w-full items-center gap-2 rounded-[11px] px-3 text-right text-xs font-bold transition ${
                  isActive
                    ? "text-[#e9a92f]"
                    : "text-white hover:bg-[#421014] hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="admin-sidebar-active"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 32,
                      mass: 0.7,
                    }}
                    className="absolute inset-0 rounded-[11px] bg-[#e9a92f]/10 shadow-[0_0_8px_rgba(233,169,47,0.35),0_0_20px_rgba(233,169,47,0.18)]"
                  />
                )}

                {isActive && (
                  <span className="absolute inset-y-0 right-0 z-20 flex items-center">
                    <motion.span
                      layoutId="admin-sidebar-neon-line"
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

                <span className="relative z-10">
                  <Icon
                    size={17}
                    strokeWidth={1.45}
                    className={
                      isActive ? "text-[#e9a92f]" : "text-[#debc6c]/70"
                    }
                  />
                </span>

                <span className="relative z-10 flex-1">{item.label}</span>

                {item.badge && (
                  <span className="relative z-10 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e9a92f] px-1.5 text-[9px] font-medium text-[#27090c]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-5 border-t border-[#61221f]/70 pt-3">
          <button
            type="button"
            className="flex h-[46px] w-full items-center gap-3 rounded-[11px] px-3 text-right text-xs font-bold text-white transition hover:bg-[#421014] hover:text-white"
          >
            <LogOut size={17} strokeWidth={1.4} className="text-[#e9a92f]/70" />

            <span>خروج از حساب</span>
          </button>
        </div>
      </aside>

      {/* MOBILE FLOATING BOTTOM DOCK */}
      <div className="fixed inset-x-0 bottom-0 z-40 px-2 pb-[max(10px,env(safe-area-inset-bottom))] lg:hidden">
        <motion.nav
          layout
          transition={{
            layout: {
              type: "spring",
              stiffness: 280,
              damping: 30,
              mass: 0.7,
            },
          }}
          className="mx-auto flex w-fit max-w-full items-center justify-center gap-1 rounded-[20px] border border-[#6f2826] bg-[#25080b]/95 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.45),0_0_30px_rgba(0,0,0,0.2)] backdrop-blur-xl"
          aria-label="ناوبری پنل مدیریت"
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <motion.button
                key={item.id}
                type="button"
                layout
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 360,
                    damping: 34,
                    mass: 0.7,
                  },
                }}
                onClick={() => onTabChange(item.id)}
                className={`relative flex h-[42px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] px-2 ${
                  isActive
                    ? "text-[#e9a92f]"
                    : "text-[#debc6c] hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="admin-mobile-active"
                    transition={{
                      type: "spring",
                      stiffness: 430,
                      damping: 52,
                      mass: 0.9,
                    }}
                    className="absolute inset-0 rounded-[12px] bg-[#e9a92f]/10 shadow-[0_0_10px_rgba(233,169,47,0.2),0_0_22px_rgba(233,169,47,0.1)]"
                  />
                )}

                <span className="relative z-10 flex shrink-0 items-center justify-center">
                  <Icon
                    size={17}
                    strokeWidth={1.5}
                    className={isActive ? "text-[#e9a92f]" : "text-[#debc6c]"}
                  />
                </span>

                {isActive && (
                  <motion.span
                    initial={{
                      opacity: 0,
                      width: 0,
                      marginRight: 0,
                    }}
                    animate={{
                      opacity: 1,
                      width: "auto",
                      marginRight: 7,
                    }}
                    exit={{
                      opacity: 0,
                      width: 0,
                      marginRight: 0,
                    }}
                    transition={{
                      opacity: {
                        duration: 0.16,
                        ease: "easeOut",
                      },
                      width: {
                        duration: 0.22,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      marginRight: {
                        duration: 0.22,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    className="relative z-10 shrink-0 overflow-hidden whitespace-nowrap text-[11px] font-bold"
                  >
                    {item.mobileLabel || item.label}
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </motion.nav>
      </div>
    </>
  );
}
