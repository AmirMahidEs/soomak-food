import { useEffect, useState } from "react";

import {
  X,
  Check,
  ChevronDown,
  MessageCircle,
  Send,
  UserRound,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import {
  getAllComments,
  updateCommentStatus,
  updateCommentReply,
} from "../../services/adminServices";

import CommentStatsChip from "../../components/admin/comments/CommentStatsChip";

import { formatJalaliDate } from "../../utilities/dateFormatter";

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
      console.error("خطا در رد نظر:", error);
    }
  };

  const handleReplyOpen = (commentId) => {
    const comment = comments.find((comment) => comment.id === commentId);

    setReplyOpen((prev) => (prev === commentId ? null : commentId));

    setReplyText(comment?.reply || "");
  };

  const isCreate = () => {
    const comment = comments.find((comment) => comment.id === replyOpen);

    return !comment?.reply;
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;

    try {
      const comment = comments.find((comment) => comment.id === replyOpen);

      const replyData = {
        commentId: replyOpen,
        reply: replyText,
        replyCreatedAt: isCreate()
          ? new Date().toISOString()
          : comment.replyCreatedAt,
        replyUpdatedAt: isCreate() ? null : new Date().toISOString(),
      };

      await updateCommentReply(
        replyData.commentId,
        replyData.reply,
        replyData.replyCreatedAt,
        replyData.replyUpdatedAt,
      );

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

              <p className="text-[13px] text-white/45">
                در حال دریافت نظرات...
              </p>
            </div>
          </div>
        ) : comments.length === 0 ? (
          <div className="flex min-h-[250px] flex-col items-center justify-center gap-4 px-5 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-white/25">
              <MessageCircle size={26} />
            </div>

            <div>
              <p className="text-[15px] font-medium text-white/70">
                نظری برای نمایش وجود ندارد
              </p>

              <p className="mt-1 text-[13px] text-white/35">
                در حال حاضر هیچ نظری از مشتریان ثبت نشده است.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 p-3 sm:p-4">
            {comments.map((comment) => {
              const isReplyOpen = replyOpen === comment.id;

              return (
                <motion.article
                  key={comment.id}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    y: { duration: 0.2 },
                    layout: {
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    },
                  }}
                  className="overflow-hidden rounded-[14px] border border-[#61221f]/70 bg-[#25080b] transition-colors hover:border-[#6f2826]"
                >
                  {/* =========================
                      MAIN COMMENT CARD
                  ========================== */}
                  <div className="p-4 lg:p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                      {/* USER */}
                      <div className="flex min-w-0 items-center gap-3 lg:w-[190px] lg:shrink-0">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] bg-[#e9a92f]/10 text-[#e9a92f]">
                          <UserRound size={22} strokeWidth={1.7} />
                        </div>

                        <div className="min-w-0">
                          <span className="block text-[12px] text-white/35">
                            نام کاربری
                          </span>

                          <p className="mt-0.5 truncate text-[14px] font-medium text-white/80">
                            {comment.user}
                          </p>
                        </div>
                      </div>

                      {/* COMMENT */}
                      <div className="min-w-0 flex-1 rounded-[10px] bg-white/[0.025] p-3">
                        <div className="flex items-center gap-2">
                          <MessageCircle
                            size={16}
                            strokeWidth={1.7}
                            className="shrink-0 text-[#e9a92f]/70"
                          />

                          <span className="text-[12.5px] text-white/35">
                            نظر مشتری
                          </span>
                        </div>

                        <p className="mt-2 line-clamp-3 text-[15px] leading-7 text-white/70">
                          {comment.comment}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                          <p className="text-[13px] text-white/25">
                            ثبت شده در{" "}
                            {formatJalaliDate(comment.createdAt)}
                          </p>

                          {comment.reply && (
                            <div className="flex items-center gap-1.5 text-[13px] text-somak-gold2">
                              <MessageCircle size={13} />
                              پاسخ داده شده
                            </div>
                          )}
                        </div>
                      </div>

                      {/* STATUS */}
                      <div className="flex items-center justify-between gap-3 lg:w-[125px] lg:shrink-0 lg:justify-center">
                        <span className="text-[12.5px] text-white/30 lg:hidden">
                          وضعیت
                        </span>

                        <CommentStatsChip comment={comment} />
                      </div>

                      {/* ACTIONS */}
                      <div className="flex items-center justify-between border-t border-[#61221f]/40 pt-3 lg:w-[145px] lg:shrink-0 lg:justify-end lg:border-t-0 lg:border-r lg:pt-0 lg:pr-4">
                        <span className="text-[13px] text-white/30 lg:hidden">
                          عملیات
                        </span>

                        <div className="flex items-center gap-2">
                          {/* APPROVE */}
                          <button
                            type="button"
                            onClick={() => handleApprove(comment.id)}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#63221f] bg-[#27090c] text-white/40 transition hover:border-green-400/30 hover:bg-green-400/10 hover:text-green-500"
                            aria-label="تأیید نظر"
                          >
                            <Check size={21} />
                          </button>

                          {/* REJECT */}
                          <button
                            type="button"
                            onClick={() => handleReject(comment.id)}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#63221f] bg-[#27090c] text-white/40 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-500"
                            aria-label="رد نظر"
                          >
                            <X size={21} />
                          </button>

                          {/* REPLY */}
                          <button
                            type="button"
                            onClick={() => handleReplyOpen(comment.id)}
                            className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                              isReplyOpen
                                ? "border-[#e9a92f]/40 bg-somak-gold/10 text-somak-gold2"
                                : "border-[#63221f] bg-[#27090c] text-white/40 hover:bg-white/5 hover:text-somak-gold2"
                            }`}
                            aria-label={
                              comment.reply
                                ? "ویرایش پاسخ"
                                : "پاسخ به نظر"
                            }
                          >
                            <motion.div
                              animate={{
                                rotate: isReplyOpen ? 180 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown size={21} />
                            </motion.div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* =========================
                      REPLY SECTION
                  ========================== */}
                  <AnimatePresence initial={false}>
                    {isReplyOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          height: {
                            duration: 0.28,
                            ease: "easeInOut",
                          },
                          opacity: {
                            duration: 0.18,
                          },
                        }}
                        className="overflow-hidden border-t border-[#61221f]/40"
                      >
                        <div className="bg-[#22070a]/60 p-4 lg:p-5">
                          {/* REPLY HEADER */}
                          <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-somak-gold/10">
                              <MessageCircle
                                size={16}
                                className="text-somak-gold2"
                              />
                            </div>

                            <div className="min-w-0">
                              <p className="text-[15px] font-medium text-white/80">
                                {comment.reply
                                  ? "ویرایش پاسخ"
                                  : "پاسخ به نظر مشتری"}
                              </p>

                              <p className="mt-0.5 text-[13px] text-white/30">
                                {comment.reply
                                  ? "پاسخ فعلی را ویرایش کنید."
                                  : "پاسخ شما برای مشتری نمایش داده خواهد شد."}
                              </p>
                            </div>
                          </div>

                          {/* REPLY INPUT */}
                          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                            <div className="flex min-h-[50px] flex-1 items-center rounded-xl border border-somak-500 bg-somak-900 px-4 transition focus-within:border-somak-gold focus-within:ring-1 focus-within:ring-somak-gold/20">
                              <input
                                type="text"
                                value={replyText}
                                onChange={(e) =>
                                  setReplyText(e.target.value)
                                }
                                placeholder={
                                  comment.reply
                                    ? "پاسخ خود را ویرایش کنید..."
                                    : "پاسخ خود را بنویسید..."
                                }
                                className="w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/25"
                              />
                            </div>

                            <motion.button
                              type="button"
                              onClick={handleReply}
                              whileTap={{ scale: 0.97 }}
                              className="flex h-[50px] shrink-0 items-center justify-center gap-2 rounded-xl bg-gold-gradient px-6 text-[14px] font-semibold text-somak-900 shadow-[0_6px_18px_rgba(230,166,46,0.12)] transition hover:brightness-105 lg:w-auto"
                            >
                              {comment.reply
                                ? "ذخیره تغییرات"
                                : "ارسال پاسخ"}

                              <Send size={17} />
                            </motion.button>
                          </div>

                          {/* EXISTING REPLY */}
                          {comment.reply && (
                            <motion.div
                              initial={{
                                opacity: 0,
                                y: 4,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              transition={{
                                duration: 0.2,
                                delay: 0.05,
                              }}
                              className="mt-4 rounded-xl border border-somak-gold/15 bg-somak-gold/[0.03] p-4"
                            >
                              <div className="mb-2 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-somak-gold" />

                                <span className="text-[15px] text-somak-gold2">
                                  پاسخ ثبت‌شده
                                </span>
                              </div>

                              <p className="text-[14px] leading-7 text-white/55">
                                {comment.reply}
                              </p>

                              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                                {comment.replyCreatedAt && (
                                  <p className="text-[13px] text-white/25">
                                    پاسخ داده شده در{" "}
                                    {formatJalaliDate(
                                      comment.replyCreatedAt,
                                    )}
                                  </p>
                                )}

                                {comment.replyUpdatedAt && (
                                  <p className="text-[13px] text-white/20">
                                    ویرایش شده در{" "}
                                    {formatJalaliDate(
                                      comment.replyUpdatedAt,
                                    )}
                                  </p>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>
    </motion.div>
  );
};

export default AdminCommentPage;
