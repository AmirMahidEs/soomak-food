import { Heart, Home, LogOut, MapPin, Package, UserRound } from "lucide-react";

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
              className={`group flex w-full items-center justify-between rounded-[11px] px-3 py-3 text-right text-[11px] transition ${
                isActive
                  ? "bg-[#e9a92f]/10 text-[#e9a92f]"
                  : "text-white/55 hover:bg-somak-700 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Icon
                  size={17}
                  strokeWidth={1.45}
                  className={
                    isActive ? "text-somak-gold2" : "text-somak-gold/75"
                  }
                />

                <span>{item.label}</span>
              </span>
            </button>
          );
        })}

        <div className="my-2 h-px bg-[#63221f]/70" />

        <button
          type="button"
          className="flex w-full items-center gap-2.5 rounded-[11px] px-3 py-3 text-right text-[11px] text-white/55 transition hover:bg-[#2a0d0f] hover:text-white"
        >
          <LogOut size={17} strokeWidth={1.45} className="text-somak-gold/75" />

          <span>خروج از حساب</span>
        </button>
      </nav>
    </aside>
  );
}
