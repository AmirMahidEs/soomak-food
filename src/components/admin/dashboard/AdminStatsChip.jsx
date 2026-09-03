const AdminStatsChip = ({ order }) => {
  const statusConfig = [
    {
      status: "New",
      className: "text-[#e9a92f] bg-[#e9a92f]/10",
      label: "جدید",
    },
    {
      status: "Processing",
      className: "text-blue-300 bg-blue-400/10",
      label: "در حال آماده سازی",
    },
    {
      status: "Delivered",
      className: "text-green-300 bg-green-400/10",
      label: "تحویل داده شده",
    },
    {
      status: "Cancelled",
      className: "text-[#f87171] bg-[#f87171]/10",
      label: "لغو شده",
    },
  ];

  const statsFind = statusConfig.find((s) => s.status === order.status);
  return (
    <div>
      <span
        className={`rounded-full px-2.5 py-1 text-[12px] ${statsFind?.className}`}
      >
        {statsFind?.label}
      </span>
    </div>
  );
};

export default AdminStatsChip;
