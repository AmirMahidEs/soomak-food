import { useEffect, useState } from "react";

import { X, Check, ChevronDown, MessageCircle } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import {
  getAllComments,
  updateCommentStatus,
} from "../../services/adminServices";

import CommentStatsChip from "../../components/admin/comments/CommentStatsChip";

import React from "react";

const AdminCommentPage = () => {
  const [replyOpen, setReplyOpen] = useState(null);

  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        setLoading(true);

        const data = await getAllComments();

        setComments(data);
      } catch (error) {
        console.log("cant fetch comments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllComments();
  }, []);

  const handleApprove = async (commentId) => {
    try {
      await updateCommentStatus(commentId, "Approved");

      const updatedComments = await getAllComments();

      setComments(updatedComments);
    } catch (error) {
      console.error("خطا در تأیید نظر:", error);
    }
  };

  const handleReject = async (commentid) => {
    try {
      await updateCommentStatus(commentid, "Rejected");

      const updatedComments = await getAllComments();

      setComments(updatedComments);
    } catch (error) {
      console.error("cant to reject comments", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      <section className="overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c]">
        {loading ? (
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-somak-gold" />

              <p className="text-sm text-white/45">در حال دریافت نظرات...</p>
            </div>
          </div>
        ) : comments.length === 0 ? (
          <div className="flex min-h-[250px] flex-col items-center justify-center gap-4 px-5 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-white/25">
              <MessageCircle size={26} />
            </div>

            <div>
              <p className="text-[16px] font-medium text-white/70">
                نظری برای نمایش وجود ندارد
              </p>

              <p className="mt-1 text-sm text-white/35">
                در حال حاضر هیچ نظری از مشتریان ثبت نشده است.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-right">
              <thead>
                <tr className="border-b border-[#61221f]/70 text-[15px] text-white/80">
                  <th className="px-5 py-4 font-normal">نظر مشتری</th>

                  <th className="px-5 py-4 font-normal">نام کاربری</th>

                  <th className="px-5 py-4 font-normal">وضعیت</th>

                  <th className="px-5 py-4 font-normal">عملیات</th>
                </tr>
              </thead>

              <tbody>
                {comments.map((comment) => (
                  <React.Fragment key={comment.id}>
                    <tr className="border-b border-[#61221f]/40">
                      <td className="px-5 py-4 text-[15px] font-medium text-white/60">
                        {comment.comment}
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-[16px] text-white/60">
                          {comment.user}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <CommentStatsChip comment={comment} />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {/* Accept */}
                          <button
                            type="button"
                            onClick={() => handleApprove(comment.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-full text-white/35 transition hover:bg-green-400/10 hover:text-green-500"
                          >
                            <Check size={20} />
                          </button>

                          {/* Reject */}
                          <button
                            type="button"
                            onClick={() => handleReject(comment.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-full text-white/35 transition hover:bg-red-400/10 hover:text-red-500"
                          >
                            <X size={20} />
                          </button>

                          {/* Reply Collapse */}
                          <button
                            type="button"
                            onClick={() =>
                              setReplyOpen((prev) =>
                                prev === comment.id ? null : comment.id,
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full text-white/35 transition hover:bg-white/5 hover:text-somak-gold2"
                          >
                            <motion.div
                              animate={{
                                rotate: replyOpen === comment.id ? 180 : 0,
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
                      {replyOpen === comment.id && (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="border-b border-[#61221f]/40"
                        >
                          <td colSpan={4} className="p-0">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="flex w-full items-center gap-3 p-5">
                                <label className="shrink-0 text-white">
                                  پاسخ
                                </label>

                                <input
                                  type="text"
                                  placeholder="پاسخ خود را بنویسید..."
                                  className="h-[50px] w-full rounded-lg border border-somak-500 bg-somak-900 px-5 text-white outline-none transition placeholder:text-white/25 focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
                                />

                                <button
                                  type="button"
                                  className="w-[200px] rounded bg-gold-gradient px-4 py-2 font-medium text-somak-900 shadow-[0_6px_18px_rgba(230,166,46,0.16)] transition hover:brightness-105"
                                >
                                  ارسال پاسخ
                                </button>
                              </div>
                            </motion.div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </motion.div>
  );
};

export default AdminCommentPage;
