import { useEffect, useState } from "react";
import { X, Check, ChevronDown, MessageCircle, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getAllComments,
  updateCommentStatus,
  updateCommentReply,
} from "../../services/adminServices";
import CommentStatsChip from "../../components/admin/comments/CommentStatsChip";
import React from "react";

const AdminCommentPage = () => {
  const [replyOpen, setReplyOpen] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // فقط برای UI پاسخ
  const [replyText, setReplyText] = useState("");

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

  const handleReject = async (commentId) => {
    try {
      await updateCommentStatus(commentId, "Rejected");

      const updatedComments = await getAllComments();
      setComments(updatedComments);
    } catch (error) {
      console.error("cant to reject comments", error);
    }
  };

  const handleReplyOpen = (commentId) => {
    setReplyOpen((prev) => (prev === commentId ? null : commentId));
    setReplyText("");
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;

    try {
      const replyData = {
        commentId: replyOpen,
        reply: replyText,
      };

      await updateCommentReply(replyData.commentId, replyData.reply);

      const updatedComments = await getAllComments();

      setComments(updatedComments);
      setReplyText("");
      setReplyOpen(null);
    } catch (error) {
      console.error("خطا در ثبت پاسخ:", error);
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
                    <tr className="border-b border-[#61221f]/40 transition hover:bg-white/[0.015]">
                      <td className="px-5 py-4">
                        <div className="max-w-[420px]">
                          <p className="text-[15px] font-medium leading-7 text-white/60">
                            {comment.comment}
                          </p>

                          {comment.reply && (
                            <div className="mt-2 flex items-center gap-2 text-xs text-somak-gold2">
                              <MessageCircle size={13} />
                              پاسخ داده شده
                            </div>
                          )}
                        </div>
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
                          <button
                            type="button"
                            onClick={() => handleApprove(comment.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-full text-white/35 transition hover:bg-green-400/10 hover:text-green-500"
                            aria-label="تأیید نظر"
                          >
                            <Check size={20} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleReject(comment.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-full text-white/35 transition hover:bg-red-400/10 hover:text-red-500"
                            aria-label="رد نظر"
                          >
                            <X size={20} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleReplyOpen(comment.id)}
                            className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                              replyOpen === comment.id
                                ? "bg-somak-gold/10 text-somak-gold2"
                                : "text-white/35 hover:bg-white/5 hover:text-somak-gold2"
                            }`}
                            aria-label="پاسخ به نظر"
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
                              <div className="bg-[#22070a]/60 px-5 py-5">
                                <div className="mb-4 flex items-center gap-2">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-somak-gold/10">
                                    <MessageCircle
                                      size={16}
                                      className="text-somak-gold2"
                                    />
                                  </div>

                                  <div>
                                    <p className="text-[15px] font-medium text-white/80">
                                      پاسخ به نظر مشتری
                                    </p>

                                    <p className="mt-0.5 text-[14px] text-white/30">
                                      پاسخ شما برای مشتری نمایش داده خواهد شد.
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <div className="flex min-h-[50px] flex-1 items-center rounded-xl border border-somak-500 bg-somak-900 px-4 transition focus-within:border-somak-gold focus-within:ring-1 focus-within:ring-somak-gold/20">
                                    <input
                                      type="text"
                                      value={replyText}
                                      onChange={(e) =>
                                        setReplyText(e.target.value)
                                      }
                                      placeholder="پاسخ خود را بنویسید..."
                                      className="w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/25"
                                    />
                                  </div>

                                  <motion.button
                                    type="button"
                                    onClick={handleReply}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex h-[50px] shrink-0 items-center justify-center gap-2 rounded-xl bg-gold-gradient px-6 text-sm font-semibold text-somak-900 shadow-[0_6px_18px_rgba(230,166,46,0.12)] transition hover:brightness-105"
                                  >
                                    ارسال پاسخ
                                    <Send size={17} />
                                  </motion.button>
                                </div>

                                {comment.reply && (
                                  <div className="mt-4 rounded-xl border border-somak-gold/15 bg-somak-gold/[0.03] p-4">
                                    <div className="mb-2 flex items-center gap-2">
                                      <span className="h-1.5 w-1.5 rounded-full bg-somak-gold" />

                                      <span className="text-xs text-somak-gold2">
                                        پاسخ ثبت‌شده
                                      </span>
                                    </div>

                                    <p className="text-sm leading-7 text-white/55">
                                      {comment.reply}
                                    </p>
                                  </div>
                                )}
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
