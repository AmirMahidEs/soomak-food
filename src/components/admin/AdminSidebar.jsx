import {
  ClipboardList,
  LogOut,
  Package,
  LayoutDashboard,
  ShoppingBag,
  Users,
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
    badge: 3,
  },
  {
    id: "categories",
    label: "دسته‌بندی‌ها",
    icon: ClipboardList,
  },
  {
    id: "users",
    label: "کاربران",
    icon: Users,
  },
];

export default function AdminSidebar({ activeTab, onTabChange }) {
  return (
    <aside className="hidden h-fit w-[165px] shrink-0 self-start rounded-[18px] border border-[#6f2826] bg-[#27090c] p-3 lg:block">
      {/* LOGO */}

      {/* <div className="mb-6 flex items-center gap-3 px-3 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#e9a92f]/10 text-[#e9a92f]">
          <Package size={19} strokeWidth={1.4} />
        </div>

        <div>
          <p className="text-sm font-medium text-white">سومک</p>

          <p className="mt-0.5 text-[9px] text-white/35">
            پنل مدیریت
          </p>
        </div>
      </div> */}

      {/* MENU */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`group relative flex h-[46px] w-full items-center gap-2 rounded-[11px] px-3 text-right text-[11px] text-xs font-bold transition ${
                isActive
                  ? "text-[#e9a92f]"
                  : "text-white hover:bg-[#421014] hover:text-white"
              }`}
            >
              {/* ACTIVE BACKGROUND */}
              {isActive && (
                <motion.span
                  layoutId="admin-sidebar-active"
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 32,
                    mass: 0.7,
                  }}
                  className="absolute inset-0 rounded-[11px] bg-[#e9a92f]/10 shadow-[0_0_12px_rgba(233,169,47,0.12)]"
                />
              )}

              {/* NEON LINE */}
              {isActive && (
                <span className="absolute right-0 top-1/2 z-20 h-6 w-[2px] -translate-y-1/2 rounded-full bg-[#e9a92f] shadow-[0_0_6px_#e9a92f,0_0_14px_#e9a92f]" />
              )}

              {/* ICON */}
              <span className="relative z-10">
                <Icon
                  size={17}
                  strokeWidth={1.45}
                  className={isActive ? "text-[#e9a92f]" : "text-[#debc6c]/70"}
                />
              </span>

              {/* LABEL */}
              <span className="relative z-10 flex-1">{item.label}</span>

              {/* BADGE */}
              {item.badge && (
                <span className="relative z-10 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e9a92f] px-1.5 text-[9px] font-medium text-[#27090c]">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* BOTTOM */}
      <div className="mt-5 border-t border-[#61221f]/70 pt-3">
        <button
          type="button"
          className="flex h-[46px] w-full items-center gap-3 rounded-[11px] px-3 text-right text-[11px] text-xs font-bold text-white transition hover:bg-[#421014] hover:text-white"
        >
          <LogOut size={17} strokeWidth={1.4} className="text-[#e9a92f]/70" />

          <span>خروج از حساب</span>
        </button>
      </div>
    </aside>
  );
}
