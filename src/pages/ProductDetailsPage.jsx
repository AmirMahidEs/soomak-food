import {
  CheckCircle2,
  Clock3,
  Heart,
  ShoppingCart,
  Users,
  Weight,
  Star,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  selectCartItems,
} from "../features/cart/cartSlice";
import PageMotion from "../components/PageMotion";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import {
  getFoodsById,
  getFoodsComments,
  createFoodComment,
} from "../services/foodServices";
import { useEffect, useState } from "react";

const money = (n) => n.toLocaleString("fa-IR");

export default function ProductDetailsPage() {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState(false);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [commentText, setCommentText] = useState("");

  const [commentSuccess, setCommentSuccess] = useState(false);

  useEffect(() => {
    const fetchFoodsById = async () => {
      try {
        const data = await getFoodsById(id);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching foods:", error);
      }
    };

    fetchFoodsById();
  }, [id]);

  useEffect(() => {
    const fetchFoodsComments = async () => {
      try {
        const data = await getFoodsComments(id);
        setComments(data);
        setCommentsLoading(false);
      } catch (error) {
        setCommentsLoading(false);
        setCommentsError(true);
        console.error("Error fetching foods comments:", error);
      }
    };

    fetchFoodsComments();
  }, [id]);

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity ?? 1;

  const related = products.filter((x) => x.id !== product.id).slice(0, 4);

  const averageRating =
    comments.length > 0
      ? comments.reduce((sum, comment) => sum + comment.rating, 0) /
        comments.length
      : 0;

  const getStarFill = (index) => {
    const fill = averageRating - index;

    return Math.min(Math.max(fill, 0), 1);
  };

  const displayRating = hoverRating !== 0 ? hoverRating : rating;

  const handleSubmit = async () => {
    try {
      const commentData = {
        foodId: id,
        user: "امیرمهدی",
        comment: commentText,
        rating: rating,
        createdAt: new Date().toISOString(),
        status: "Pending",
        reply: "",
      };
      await createFoodComment(commentData);
      setCommentSuccess(true);
      setCommentText("");
    } catch (error) {
      console.log("cant post comment:", error);
    }
  };

  return (
    <PageMotion>
      <section className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="flex">
          <Link
            to={"/"}
            className="mb-7 text-xs text-somak-muted hover:text-somak-gold2"
          >
            صفحه اصلی
          </Link>

          <span className="mx-2">›</span>

          <Link
            to={"/products"}
            className="mb-7 text-xs text-somak-muted hover:text-somak-gold2"
          >
            محصولات
          </Link>

          <span className="mx-2">›</span>

          <p className="mb-7 text-xs text-somak-muted">{product.title}</p>
        </div>

        {loading ? (
          <div className="flex h-[400px] items-center justify-center">
            <p className="text-lg text-somak-muted">در حال بارگذاری...</p>
          </div>
        ) : (
          <div>
            <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
              <div>
                <motion.div
                  layoutId={`image-${product.id}`}
                  className="overflow-hidden rounded-2xl border border-[#6d2724] bg-[#25080b]"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="aspect-[1.25] w-full object-cover"
                  />
                </motion.div>

                <div className="mt-5 grid grid-cols-4 gap-4">
                  {[
                    product.image,
                    ...related.slice(0, 3).map((p) => p.image),
                  ].map((src, i) => (
                    <button
                      key={i}
                      className={`overflow-hidden rounded-xl border ${
                        i === 0 ? "border-somak-gold" : "border-[#6d2724]"
                      }`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="aspect-square w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-right">
                <p className="text-sm text-somak-muted">غذای اصلی</p>

                <h1 className="mt-1 text-4xl font-bold text-white">
                  {product.title}
                </h1>

                <p className="mt-5 text-sm leading-8 text-somak-muted">
                  {product.description}
                </p>

                <div className="my-7 grid grid-cols-3 border-b border-[#6d2724] pb-7">
                  <Meta
                    icon={Clock3}
                    title="زمان آماده‌سازی"
                    value={`${product.takeTime.toLocaleString("fa-IR")} دقیقه`}
                  />

                  <Meta
                    icon={Weight}
                    title="وزن هر پرس"
                    value={`${product.weight.toLocaleString("fa-IR")} گرم`}
                  />

                  <Meta
                    icon={Users}
                    title="مناسب برای"
                    value={`${product.servings.toLocaleString("fa-IR")} نفر`}
                  />
                </div>

                <div className="text-2xl font-bold text-somak-gold2">
                  {money(product.price)} تومان
                </div>

                <div className="my-5 flex items-center justify-end gap-5">
                  <div className="grid h-11 w-40 grid-cols-3 items-center rounded-full border border-somak-gold/60 text-white">
                    <button
                      type="button"
                      onClick={() =>
                        cartItem
                          ? dispatch(increaseQuantity(product.id))
                          : dispatch(addToCart(product))
                      }
                      className="h-full text-lg text-somak-gold2 transition hover:text-white"
                      aria-label="افزایش تعداد"
                    >
                      +
                    </button>

                    <span className="text-center">
                      {quantity.toLocaleString("fa-IR")}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        cartItem && dispatch(decreaseQuantity(product.id))
                      }
                      className="h-full text-lg text-somak-gold2 transition hover:text-white"
                      aria-label="کاهش تعداد"
                    >
                      −
                    </button>
                  </div>
                </div>

                <div className="grid gap-3">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => dispatch(addToCart(product))}
                    className="flex items-center justify-center gap-4 rounded-full bg-gradient-to-r from-[#f5d26b] to-[#d9931e] py-4 font-semibold text-somak-950"
                  >
                    افزودن به سبد خرید
                    <ShoppingCart size={20} />
                  </motion.button>

                  <button className="flex items-center justify-center gap-3 rounded-full border border-somak-gold/70 py-3 text-somak-gold2">
                    افزودن به علاقه‌مندی‌ها
                    <Heart size={19} />
                  </button>
                </div>
              </div>
            </div>

            <section className="mt-10 grid gap-8 rounded-2xl border border-[#6d2724] bg-[#25080b]/60 p-8 md:grid-cols-3">
              <InfoColumn title="درباره این غذا">
                <p className="text-sm leading-8 text-somak-muted">
                  {product.description} این غذا با دقت و مواد اولیه تازه آماده
                  می‌شود.
                </p>
              </InfoColumn>

              <InfoColumn title="مواد تشکیل‌دهنده">
                <ul className="space-y-3 text-sm text-somak-muted">
                  {product.ingredients.map((x) => (
                    <li key={x} className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-somak-gold" />
                      {x}
                    </li>
                  ))}
                </ul>
              </InfoColumn>

              <InfoColumn title="ویژگی‌ها">
                <ul className="space-y-3 text-sm text-somak-muted">
                  {[
                    "تهیه روزانه و تازه",
                    "بدون مواد نگهدارنده",
                    "استفاده از مواد اولیه درجه یک",
                    "پخت با دستور اصیل ایرانی",
                  ].map((x) => (
                    <li key={x} className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-somak-gold" />
                      {x}
                    </li>
                  ))}
                </ul>
              </InfoColumn>
            </section>

            {commentsLoading ? (
              <div className="mt-10 flex h-[400px] items-center justify-center rounded-2xl border border-[#6d2724] bg-[#25080b]/60">
                <p className="text-lg text-somak-muted">در حال بارگذاری...</p>
              </div>
            ) : (
              <section className="mt-10 rounded-2xl border border-[#6d2724] bg-[#25080b]/60 p-7">
                {commentsError ? (
                  <div className="flex h-[400px] items-center justify-center">
                    <p className="text-lg text-somak-muted">
                      خطا در بارگذاری نظرات. لطفاً دوباره تلاش کنید.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="grid gap-7 lg:grid-cols-[1fr_220px]">
                      <div>
                        <div className="mb-4 flex items-center justify-between">
                          <h2 className="text-xl font-semibold text-somak-gold2">
                            نظرات مشتریان
                          </h2>

                          <span className="text-xs text-somak-muted">
                            مشاهده همه نظرات
                          </span>
                        </div>

                        {comments.length === 0 ? (
                          <div className="flex min-h-[160px] items-center justify-center rounded-xl border border-[#6d2724]/70 bg-[#27090c]/50">
                            <p className="text-sm text-somak-muted">
                              هنوز نظری برای این غذا ثبت نشده است.
                            </p>
                          </div>
                        ) : (
                          comments.map((comment) => (
                            <Review
                              key={comment.id}
                              name={comment.user}
                              text={comment.comment}
                              rating={comment.rating}
                              reply={comment.reply}
                            />
                          ))
                        )}
                      </div>

                      <div className="flex flex-col items-center justify-center gap-3 border-r border-[#6d2724] pr-7 text-center">
                        <div className="text-5xl font-bold text-white">
                          {averageRating.toLocaleString("fa-IR", {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                          })}
                        </div>

                        <div className="my-2 flex gap-0.5 text-4xl">
                          {[0, 1, 2, 3, 4].map((index) => {
                            const fill = getStarFill(index);

                            return (
                              <div key={index} className="relative">
                                <span className="text-somak-gold/80">☆</span>

                                {fill > 0 && (
                                  <span
                                    className="absolute inset-y-0 right-0 overflow-hidden text-somak-gold2"
                                    style={{
                                      width: `${fill * 100}%`,
                                    }}
                                  >
                                    ★
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <p className="text-sm text-somak-muted">
                          ({comments.length.toLocaleString("fa-IR")} نظر)
                        </p>
                      </div>
                    </div>
                    {/* Comment Form UI */}
                    <div className="mt-8 border-t border-[#6d2724] pt-8">
                      {commentSuccess ? (
                        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-somak-gold/20 bg-somak-gold/[0.03] px-6 text-center">
                          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-somak-gold/10">
                            <CheckCircle2
                              size={30}
                              className="text-somak-gold"
                              strokeWidth={1.7}
                            />
                          </div>
                          <h3 className="text-lg font-semibold text-white">
                            نظر شما با موفقیت ثبت شد
                          </h3>
                          <p className="mt-2 max-w-md text-sm leading-7 text-somak-muted">
                            نظر شما پس از بررسی و تأیید منتشر خواهد شد.
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="mb-6">
                            <h3 className="text-xl font-semibold text-white">
                              نظر شما درباره این غذا چیست؟
                            </h3>
                          </div>
                          <div className="grid gap-6 lg:grid-cols-[180px_1fr]">
                            <div className="flex flex-col items-center justify-center rounded-xl border border-[#6d2724] bg-[#27090c]/60">
                              <span className="mb-3 text-lg text-somak-muted">
                                امتیاز شما
                              </span>
                              <div
                                className="flex flex-row-reverse gap-1"
                                dir="ltr"
                              >
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    onMouseEnter={() => setHoverRating(star)}
                                    onClick={() => setRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    key={star}
                                    type="button"
                                    className={`text-3xl transition hover:scale-110 ${star <= displayRating ? "text-somak-gold hover:text-somak-gold2" : "text-somak-gold/50 hover:text-somak-gold2"}`}
                                    aria-label={`امتیاز ${star} از ۵`}
                                  >
                                    ★
                                  </button>
                                ))}
                              </div>
                              <span className="mt-3 text-lg text-white/30">
                                انتخاب امتیاز
                              </span>
                            </div>
                            <div>
                              <label
                                htmlFor="comment"
                                className="mb-2 block text-lg text-white/70"
                              >
                                متن نظر
                              </label>
                              <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                id="comment"
                                rows={5}
                                placeholder="تجربه شما از این غذا چطور بود؟"
                                className="w-full resize-none rounded-xl border border-somak-500 bg-somak-900 px-5 py-4 text-[15px] leading-7 text-white outline-none transition placeholder:text-white/25 focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
                              />
                              <div className="mt-4 flex items-center justify-between gap-4">
                                <p className="text-base leading-6 text-white/30">
                                  نظر شما پس از بررسی منتشر خواهد شد.
                                </p>
                                <motion.button
                                  type="button"
                                  whileTap={{ scale: 0.98 }}
                                  onClick={handleSubmit}
                                  className="shrink-0 rounded-full bg-gold-gradient px-7 py-3 text-sm font-bold text-somak-900 shadow-[0_6px_18px_rgba(230,166,46,0.16)] transition hover:brightness-105"
                                >
                                  ثبت نظر
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </section>
            )}

            <section className="py-12">
              <h2 className="mb-7 text-center text-2xl font-semibold text-white">
                محصولات مرتبط
              </h2>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} compact />
                ))}
              </div>
            </section>
          </div>
        )}
      </section>
    </PageMotion>
  );
}

function Meta({ icon: Icon, title, value }) {
  return (
    <div className="flex items-center justify-center gap-3 text-center">
      <Icon size={28} className="text-somak-gold" strokeWidth={1.4} />

      <div>
        <p className="text-xs text-somak-muted">{title}</p>

        <p className="mt-1 text-sm text-white">{value}</p>
      </div>
    </div>
  );
}

function InfoColumn({ title, children }) {
  return (
    <div>
      <h2 className="mb-5 text-lg font-semibold text-somak-gold2">{title}</h2>

      {children}
    </div>
  );
}

function Review({ name, text, rating, reply }) {
  return (
    <div className="mb-3 rounded-xl border border-[#6d2724] bg-[#27090c]/40 px-4 py-4">
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0 flex-1">
          <p className="text-base leading-7 text-somak-muted">{text}</p>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <p className="text-sm text-white/70">{name}</p>

          <div className="flex text-xl">
            {[1, 2, 3, 4, 5].map((current) => (
              <span
                key={current}
                className={
                  current <= rating ? "text-somak-gold2" : "text-somak-gold/30"
                }
              >
                {current <= rating ? "★" : "☆"}
              </span>
            ))}
          </div>
        </div>
      </div>

      {reply && (
        <div className="mr-2 mt-4 border-r-2 border-somak-gold/30 pr-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-somak-gold/10">
              <MessageCircle size={14} className="text-somak-gold2" />
            </div>

            <span className="text-sm font-medium text-somak-gold2">
              پاسخ مجموعه سومک
            </span>
          </div>

          <p className="text-sm leading-7 text-white/50">{reply}</p>
        </div>
      )}
    </div>
  );
}
