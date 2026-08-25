import { motion } from "framer-motion";

import { Heart, MapPin, Package } from "lucide-react";

import { useState } from "react";

import ProfileInfo from "../components/profile/ProfileInfo";

import ProfileSidebar from "../components/profile/ProfileSidebar";

function PlaceholderContent({ title, description, icon: Icon }) {
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

function DashboardContent() {
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
      className="flex-1 rounded-[16px] border border-[#6f2826] bg-[#27090c] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.18)] sm:p-7"
    >
      <h1 className="text-xl font-medium text-white">پیشخوان</h1>

      <p className="mt-2 text-xs text-white/45">
        خلاصه‌ای از حساب کاربری و سفارش‌های شما.
      </p>

      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-[12px] border border-[#63221f] bg-[#25080b] p-4">
          <span className="text-[10px] text-white/40">سفارش‌های من</span>

          <p className="mt-2 text-xl font-medium text-[#e9a92f]">۳</p>
        </div>

        <div className="rounded-[12px] border border-[#63221f] bg-[#25080b] p-4">
          <span className="text-[10px] text-white/40">
            سفارش‌های تکمیل شده
          </span>

          <p className="mt-2 text-xl font-medium text-[#e9a92f]">۲</p>
        </div>

        <div className="rounded-[12px] border border-[#63221f] bg-[#25080b] p-4">
          <span className="text-[10px] text-white/40">علاقه‌مندی‌ها</span>

          <p className="mt-2 text-xl font-medium text-[#e9a92f]">۵</p>
        </div>
      </div>
    </motion.section>
  );
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;

      case "profile":
        return <ProfileInfo />;

      case "orders":
        return (
          <PlaceholderContent
            title="سفارش‌های من"
            description="لیست سفارش‌های شما در این بخش نمایش داده می‌شود."
            icon={Package}
          />
        );

      case "addresses":
        return (
          <PlaceholderContent
            title="آدرس‌های من"
            description="آدرس‌های ذخیره شده شما در این بخش نمایش داده می‌شوند."
            icon={MapPin}
          />
        );

      case "favorites":
        return (
          <PlaceholderContent
            title="علاقه‌مندی‌ها"
            description="غذاهای مورد علاقه شما در این بخش نمایش داده می‌شوند."
            icon={Heart}
          />
        );

      default:
        return <ProfileInfo />;
    }
  };

  return (
    <main
      dir="rtl"
      className="min-h-[calc(100vh-74px)] bg-somak-950 px-4 pb-20 pt-10 sm:px-6 sm:pt-14"
    >
      {/* PAGE TITLE */}

      <div className="mx-auto mb-8 max-w-[900px]">
        <h1 className="text-center text-2xl font-medium text-white sm:text-[27px]">
          پروفایل
        </h1>
      </div>

      {/* PROFILE */}

      <div className="mx-auto flex w-full max-w-[900px] flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
        {/* SIDEBAR */}

        <ProfileSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* CONTENT */}

        {renderContent()}
      </div>
    </main>
  );
}