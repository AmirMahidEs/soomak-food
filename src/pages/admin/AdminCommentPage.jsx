import { useState } from "react";
import { X, Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminCommentPage = () => {
  const [replyOpen, setReplyOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      <section className="overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-right">
            <thead>
              <tr className="border-b border-[#61221f]/70 text-[15px] text-white/80">
                <th className="px-5 py-4 font-normal">نظر مشتری</th>

                <th className="px-5 py-4 font-normal">نام کاربری</th>

                <th className="px-5 py-4 font-normal">عملیات</th>
              </tr>
            </thead>

            <tbody>
              {/* Comment Row */}
              <tr className="border-b border-[#61221f]/40">
                <td className="px-5 py-4 text-[15px] font-medium text-white/60">
                  بسیار عالی بود
                </td>

                <td className="px-5 py-4">
                  <p className="text-[16px] text-white/60">امیرمهدی</p>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    {/* Accept */}
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-full text-white/35 transition hover:bg-green-400/10 hover:text-green-500"
                    >
                      <Check size={20} />
                    </button>

                    {/* Reject */}
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-full text-white/35 transition hover:bg-red-400/10 hover:text-red-500"
                    >
                      <X size={20} />
                    </button>

                    {/* Reply Collapse */}
                    <button
                      type="button"
                      onClick={() => setReplyOpen((prev) => !prev)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-white/35 transition hover:bg-white/5 hover:text-somak-gold2"
                    >
                      <motion.div
                        animate={{
                          rotate: replyOpen ? 180 : 0,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Reply Row */}
              <AnimatePresence initial={false}>
                {replyOpen && (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-[#61221f]/40"
                  >
                    <td colSpan={3} className="p-0">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="flex w-full items-center gap-3 p-5">
                          <label className="shrink-0 text-white">پاسخ</label>

                          <input
                            type="text"
                            placeholder="پاسخ خود را بنویسید..."
                            className="h-[50px] w-full rounded-lg border border-somak-500 bg-somak-900 px-5 text-white outline-none transition placeholder:text-white/25 focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
                          />
                        </div>
                      </motion.div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
};

export default AdminCommentPage;
