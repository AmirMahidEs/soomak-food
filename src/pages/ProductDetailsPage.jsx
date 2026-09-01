import {
  CheckCircle2,
  Clock3,
  Heart,
  ShoppingCart,
  Users,
  Weight,
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

import { getFoodsById } from "../services/foodServices";
import { useEffect, useState } from "react";

const money = (n) => n.toLocaleString("fa-IR");
export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

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

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  // const product = products.find((x) => x.id === id) || products[1];
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity ?? 1;
  const related = products.filter((x) => x.id !== product.id).slice(0, 4);
  return (
    <PageMotion>
      <section className="mx-auto max-w-[1200px] px-6 py-8">
        {/* <p className="mb-7 text-xs text-somak-muted">
          صفحه اصلی <span className="mx-2">‹</span> محصولات{" "}
          <span className="mx-2">‹</span>
          {product.title}
        </p> */}
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
                      className={`overflow-hidden rounded-xl border ${i === 0 ? "border-somak-gold" : "border-[#6d2724]"}`}
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
                    value={product.prep}
                  />
                  <Meta
                    icon={Weight}
                    title="وزن هر پرس"
                    value={product.weight}
                  />
                  <Meta
                    icon={Users}
                    title="مناسب برای"
                    value={product.servings}
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
                    افزودن به سبد خرید <ShoppingCart size={20} />
                  </motion.button>
                  <button className="flex items-center justify-center gap-3 rounded-full border border-somak-gold/70 py-3 text-somak-gold2">
                    افزودن به علاقه‌مندی‌ها <Heart size={19} />
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
            <section className="mt-10 rounded-2xl border border-[#6d2724] bg-[#25080b]/60 p-7">
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
                  <Review
                    name="مریم احمدی"
                    text="واقعا طعم زرشک و زعفران عالی بود. مرغ هم خیلی خوب پخته و لذیذ بود."
                  />
                  <Review
                    name="علی رضایی"
                    text="یکی از بهترین غذاهایی بود که تا حالا خوردم."
                  />
                </div>
                <div className="border-r border-[#6d2724] pr-7 text-center">
                  <div className="text-5xl font-bold text-white">۴.۸</div>
                  <div className="my-2 text-somak-gold2">★★★★★</div>
                  <p className="text-sm text-somak-muted">(۱۲۶ نظر)</p>
                </div>
              </div>
            </section>
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
function Review({ name, text }) {
  return (
    <div className="mb-3 flex items-center justify-between rounded-xl border border-[#6d2724] px-4 py-3">
      <p className="text-xs leading-7 text-somak-muted">{text}</p>
      <div className="mr-5 shrink-0 text-xs text-white">
        {name}
        <div className="text-somak-gold2">★★★★★</div>
      </div>
    </div>
  );
}
