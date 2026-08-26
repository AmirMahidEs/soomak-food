import { Search, SlidersHorizontal } from "lucide-react";

export default function ProductFilters() {
  return (
    <section className="rounded-[16px] border border-[#6f2826] bg-[#27090c] p-4">
      <div className="flex flex-col gap-3 md:flex-row">
        {/* SEARCH */}
        <div className="relative flex-1">
          <Search
            size={15}
            strokeWidth={1.4}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#e9a92f]/70"
          />

          <input
            type="text"
            placeholder="جستجوی غذا..."
            className="h-[42px] w-full rounded-[10px] border border-[#63221f] bg-[#25080b] pl-4 pr-11 text-[10px] text-white outline-none placeholder:text-white/25 focus:border-[#e9a92f]/50"
          />
        </div>

        {/* CATEGORY */}
        <select className="h-[42px] rounded-[10px] border border-[#63221f] bg-[#25080b] px-4 text-[10px] text-white/55 outline-none focus:border-[#e9a92f]/50">
          <option>همه دسته‌بندی‌ها</option>
          <option>برگر</option>
          <option>پیتزا</option>
          <option>پاستا</option>
          <option>نوشیدنی</option>
        </select>

        {/* STATUS */}
        <button
          type="button"
          className="flex h-[42px] items-center justify-center gap-2 rounded-[10px] border border-[#63221f] bg-[#25080b] px-4 text-[10px] text-white/55 transition hover:border-[#e9a92f]/40 hover:text-white"
        >
          <SlidersHorizontal size={14} />

          فیلتر
        </button>
      </div>
    </section>
  );
}