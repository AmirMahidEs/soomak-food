import { Heart, Home, LogOut, MapPin, Package, UserRound } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import { useEffect, useState } from "react";

const menuItems = [
  {
    id: "dashboard",
    label: "پیشخوان",
    icon: Home,
  },
  {
    id: "orders",
    label: "سفارش‌های من",
    mobileLabel: "سفارش‌ها",
    icon: Package,
  },
  {
    id: "profile",
    label: "اطلاعات شخصی",
    mobileLabel: "اطلاعات",
    icon: UserRound,
  },
  {
    id: "addresses",
    label: "آدرس‌های من",
    mobileLabel: "آدرس‌ها",
    icon: MapPin,
  },
  {
    id: "favorites",
    label: "علاقه‌مندی‌ها",
    mobileLabel: "علاقه‌مندی",
    icon: Heart,
  },
];

const DISCOVERY_STORAGE_KEY = "soomak-profile-dock-discovered";

export default function ProfileSidebar({ activeTab, onTabChange }) {
  const [isDiscovering, setIsDiscovering] = useState(false);

  useEffect(() => {
    const hasDiscovered = sessionStorage.getItem(DISCOVERY_STORAGE_KEY);

    if (hasDiscovered) return;

    setIsDiscovering(true);

    const timer = window.setTimeout(() => {
      setIsDiscovering(false);
      sessionStorage.setItem(DISCOVERY_STORAGE_KEY, "true");
    }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden w-full shrink-0 rounded-[16px] border border-[#6f2826] bg-[#27090c] p-3 lg:block lg:w-[160px]">
        <nav className="flex flex-col gap-2">
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
                    : "text-white hover:bg-[#421014] hover:text-white"
                }`}
              >
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

                <span className="relative z-10 flex items-center gap-2.5">
                  <Icon
                    size={17}
                    strokeWidth={1.45}
                    className={isActive ? "text-somak-gold" : "text-[#debc6c]"}
                  />

                  <span className="text-xs font-bold">{item.label}</span>
                </span>
              </button>
            );
          })}

          <div className="my-2 h-px bg-[#61221f]/70" />

          <button
            type="button"
            className="flex w-full items-center gap-2.5 rounded-[11px] px-3 py-3 text-right text-xs font-bold text-white transition hover:bg-[#421014] hover:text-white"
          >
            <LogOut
              size={17}
              strokeWidth={1.45}
              className="text-[#e9a92f]/75"
            />

            <span>خروج از حساب</span>
          </button>
        </nav>
      </aside>

      {/* MOBILE FLOATING BOTTOM DOCK */}
      <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(12px,env(safe-area-inset-bottom))] lg:hidden">
        <motion.nav
          layout
          transition={{
            layout: { type: "spring", stiffness: 280, damping: 30, mass: 0.7 },
          }}
          className={`mx-auto flex items-center justify-center rounded-[20px] border border-[#6f2826] bg-[#25080b]/95 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.45),0_0_30px_rgba(0,0,0,0.2)] backdrop-blur-xl ${isDiscovering ? "w-full max-w-[520px] gap-0" : "w-fit max-w-full gap-1"}`}
          aria-label="ناوبری پروفایل"
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
                className={`relative flex h-[42px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] px-3 ${
                  isDiscovering ? "min-w-0 flex-1" : "w-fit"
                } ${
                  isActive
                    ? "text-[#e9a92f]"
                    : "text-[#debc6c] hover:text-white"
                }`}
              >
                {/* ACTIVE BACKGROUND */}
                {isActive && (
                  <motion.span
                    layoutId="profile-mobile-active"
                    transition={{
                      type: "spring",
                      stiffness: 430,
                      damping: 52,
                      mass: 0.9,
                    }}
                    className="absolute inset-0 rounded-[12px] bg-[#e9a92f]/10 shadow-[0_0_10px_rgba(233,169,47,0.2),0_0_22px_rgba(233,169,47,0.1)]"
                  />
                )}

                {/* ICON */}
                <span className="relative z-10 flex shrink-0 items-center justify-center">
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    className={isActive ? "text-[#e9a92f]" : "text-[#debc6c]"}
                  />
                </span>

                {/* LABEL */}
                <AnimatePresence initial={false} mode="popLayout">
                  {(isActive || isDiscovering) && (
                    <motion.span
                      initial={{
                        opacity: 0,
                        width: 0,
                        marginRight: 0,
                      }}
                      animate={{
                        opacity: 1,
                        width: "auto",
                        marginRight: 9,
                      }}
                      exit={{
                        opacity: 0,
                        width: 0,
                        marginRight: 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: "easeOut",
                      }}
                      className="relative z-10 min-w-0 shrink overflow-hidden whitespace-nowrap text-[13px] font-bold"
                    >
                      {item.mobileLabel || item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </motion.nav>
      </div>
    </>
  );
}
