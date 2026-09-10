import { motion } from "framer-motion";

const AdminSettingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* SMS Service */}
      <section className="overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c]">
        <div className="w-ful m-5 flex items-center gap-2">
          <label className="ml-2 shrink-0">شماره تلفن</label>
          <input
            type="number"
            className="h-[50px] w-full rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          />
        </div>
      </section>
      {/* Comment Section */}
      <section className="overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c]">
        <div className="w-ful m-5 flex items-center gap-2"></div>
      </section>
    </motion.div>
  );
};

export default AdminSettingPage;
