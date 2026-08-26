import { motion } from "framer-motion";

export default function AdminStatCard({
  title,
  value,
  description,
  icon: Icon,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="rounded-[14px] border border-[#63221f] bg-[#25080b] p-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[15px] text-white/90">
            {title}
          </p>

          <p className="mt-2 text-xl font-medium text-[#e9a92f]">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#e9a92f]/10 text-[#e9a92f]">
          <Icon size={19} strokeWidth={1.35} />
        </div>
      </div>

      <p className="mt-3 text-[12.5px] text-white/60">
        {description}
      </p>
    </motion.div>
  );
}