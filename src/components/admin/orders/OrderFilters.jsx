import { Search } from "lucide-react";

export default function OrderFilters() {
  return (
    <section className="rounded-[16px] border border-[#6f2826] bg-[#27090c] p-4">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#e9a92f]/70"
          />

          <input
            type="text"
            placeholder="جستجوی شماره سفارش یا مشتری..."
            className="h-[42px] w-full rounded-[10px] border border-[#63221f] bg-[#25080b] pl-4 pr-11 text-[10px] text-white outline-none placeholder:text-white/25 focus:border-[#e9a92f]/50"
          />
        </div>

        <select className="h-[42px] rounded-[10px] border border-[#63221f] bg-[#25080b] px-4 text-[10px] text-white/55 outline-none">
          <option>همه وضعیت‌ها</option>
          <option>جدید</option>
          <option>در حال آماده‌سازی</option>
          <option>ارسال شده</option>
          <option>تکمیل شده</option>
          <option>لغو شده</option>
        </select>
      </div>
    </section>
  );
}