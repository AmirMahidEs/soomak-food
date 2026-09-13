const CommentStatsChip = ({ comment }) => {
  const statusConfig = [
    {
      status: "Pending",
      className: "text-[#e9a92f] bg-[#e9a92f]/10",
      label: "در انتظار بررسی",
    },
    {
      status: "Approved",
      className: "text-green-400 bg-green-400/10",
      label: "تأیید شده",
    },
    {
      status: "Rejected",
      className: "text-[#f87171] bg-[#f87171]/10",
      label: "رد شده",
    },
  ];

  const statsFind = statusConfig.find((s) => s.status === comment.status);

  return (
    <div>
      <span
        className={`rounded-full px-2.5 py-1 text-[13.5px] ${statsFind?.className}`}
      >
        {statsFind?.label}
      </span>
    </div>
  );
};

export default CommentStatsChip;
