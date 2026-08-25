import { Mail, Phone, UserRound } from "lucide-react";

const userInfo = {
  firstName: "امیر محمدی",
  phone: "0912 123 4567",
  email: "ali.rezai@email.com",
};

function ProfileField({ label, value, icon: Icon, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs text-white/65">
        {label}
      </span>

      <div className="relative">
        <Icon
          size={16}
          strokeWidth={1.35}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#e9a92f]"
        />

        <input
          type={type}
          value={value}
          readOnly
          className="h-[48px] w-full rounded-[10px] border border-[#63221f] bg-[#25080b] pl-4 pr-11 text-xs text-white/80 outline-none transition focus:border-[#e9a92f]/60 focus:ring-1 focus:ring-[#e9a92f]/20"
        />
      </div>
    </label>
  );
}

export default function ProfileInfo() {
  return (
    <section className="flex-1 rounded-[16px] border border-[#6f2826] bg-[#27090c] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.18)] sm:p-7">
      {/* HEADER */}

      <div>
        <h1 className="text-xl font-medium text-white">
          اطلاعات شخصی
        </h1>

        <p className="mt-2 text-xs text-white/45">
          اطلاعات خود را به‌روز رسانی کنید.
        </p>
      </div>

      {/* FORM */}

      <div className="mt-8 space-y-5">
        <ProfileField
          label="نام و نام خانوادگی"
          value={userInfo.firstName}
          icon={UserRound}
        />

        <ProfileField
          label="شماره موبایل"
          value={userInfo.phone}
          icon={Phone}
          type="tel"
        />

        <ProfileField
          label="ایمیل"
          value={userInfo.email}
          icon={Mail}
          type="email"
        />
      </div>

      {/* SAVE */}

      <button
        type="button"
        className="mt-7 flex h-[48px] w-full items-center justify-center rounded-full bg-gold-gradient text-sm font-medium text-somak-950 shadow-[0_7px_20px_rgba(230,166,46,0.14)] transition hover:brightness-105 sm:w-[220px]"
      >
        ذخیره تغییرات
      </button>
    </section>
  );
}