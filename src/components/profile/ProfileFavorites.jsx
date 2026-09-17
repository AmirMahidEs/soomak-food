import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";

import { selectProfileFavorites } from "../../features/profile/profileSlice";

function formatPrice(price) {
  return `${price.toLocaleString("fa-IR")} تومان`;
}

export default function ProfileFavorites() {
  const favorites = useSelector(selectProfileFavorites);

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
      <div>
        <h1 className="text-xl font-medium text-white">علاقه‌مندی‌ها</h1>
      </div>

      {/* FAVORITES */}
      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {favorites.length > 0 ? (
          favorites.map((food) => (
            <div
              key={food.id}
              className="group overflow-hidden rounded-[13px] border border-[#63221f] bg-[#25080b]"
            >
              {/* IMAGE */}
              <div className="relative h-[145px] overflow-hidden bg-[#3a1012]">
                {food.image ? (
                  <img
                    src={food.image}
                    alt={food.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-white/20">
                    تصویر غذا
                  </div>
                )}

                <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#e9a92f]/20 bg-[#25080b]/80 text-[#e9a92f] backdrop-blur-sm">
                  <Heart size={15} fill="currentColor" strokeWidth={1.3} />
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h2 className="text-lg font-medium text-white">{food.title}</h2>

                <p className="mt-1.5 line-clamp-2 text-[13px] leading-5 text-white/40">
                  {food.description}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-lg font-bold text-[#e9a92f]">
                    {formatPrice(food.price)}
                  </span>

                  <button
                    type="button"
                    className="flex h-8 items-center gap-1.5 rounded-full border border-[#e9a92f]/20 bg-[#e9a92f]/10 px-3 text-[13px] text-[#e9a92f] transition hover:bg-[#e9a92f]/15"
                  >
                    <ShoppingBag size={20} strokeWidth={1.4} />
                    افزودن
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex min-h-[300px] flex-col items-center justify-center rounded-[13px] border border-[#63221f] bg-[#25080b]">
            <Heart size={28} strokeWidth={1.25} className="text-[#e9a92f]/50" />

            <p className="mt-4 text-sm text-white/50">
              هنوز غذایی به علاقه‌مندی‌ها اضافه نکرده‌اید.
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
}
