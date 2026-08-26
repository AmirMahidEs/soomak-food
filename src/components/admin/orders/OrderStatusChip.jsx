const statusStyles = {
  جدید: "bg-[#e9a92f]/10 text-[#e9a92f]",
  "در حال آماده‌سازی": "bg-blue-400/10 text-blue-300",
  "ارسال شده": "bg-purple-400/10 text-purple-300",
  "تکمیل شده": "bg-green-400/10 text-green-300",
  "لغو شده": "bg-red-400/10 text-red-300",
};

export default function OrderStatusChip({ status }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[8px] ${
        statusStyles[status] ||
        "bg-white/5 text-white/50"
      }`}
    >
      {status}
    </span>
  );
}