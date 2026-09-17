import { motion } from "framer-motion";
import { MapPin, Phone, Plus } from "lucide-react";
import { useSelector } from "react-redux";

import { selectProfileAddresses } from "../../features/profile/profileSlice";

export default function ProfileAddresses() {
  const addresses = useSelector(selectProfileAddresses);

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
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-medium text-white">آدرس‌های من</h1>

          <p className="mt-2 text-[13px] text-white/45">
            آدرس‌های ذخیره شده برای ارسال سفارش.
          </p>
        </div>

        <button
          type="button"
          className="flex h-9 w-full items-center justify-center gap-2 rounded-full border border-[#e9a92f]/30 bg-[#e9a92f]/10 px-4 text-[13px] text-[#e9a92f] transition hover:bg-[#e9a92f]/15 sm:w-auto"
        >
          <Plus size={20} strokeWidth={1.5} />
          افزودن آدرس
        </button>
      </div>

      {/* ADDRESSES */}
      <div className="mt-7 space-y-3">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="rounded-[13px] border border-[#63221f] bg-[#25080b] p-4"
          >
            {/* HEADER */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[9px] bg-[#e9a92f]/10 text-[#e9a92f]">
                  <MapPin size={25} strokeWidth={1.35} />
                </div>

                <div>
                  <h2 className="text-lg font-medium text-white">
                    {address.title}
                  </h2>

                  {address.isDefault && (
                    <span className="mt-1 inline-block text-[14px] text-[#e9a92f]">
                      آدرس پیش‌فرض
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                className="text-[13px] text-white/40 transition hover:text-[#e9a92f]"
              >
                ویرایش
              </button>
            </div>

            {/* ADDRESS */}
            <p className="mt-4 text-[15px] leading-6 text-white/55">
              {address.address}
            </p>

            {/* INFO */}
            <div className="mt-4 flex flex-col gap-2 border-t border-[#61221f]/60 pt-4 sm:flex-row sm:items-center sm:gap-5">
              <span className="flex items-center gap-2 text-[13px] text-white/40">
                <Phone
                  size={14}
                  strokeWidth={1.35}
                  className="text-[#e9a92f]/70"
                />

                {address.phone}
              </span>

              <span className="text-[14px] text-white/35">
                کد پستی: {address.postalCode}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
