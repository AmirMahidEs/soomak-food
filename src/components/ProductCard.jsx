import { Heart, Plus, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
const formatPrice = (n) => n.toLocaleString("fa-IR");
export default function ProductCard({ product, compact = false }) {
  const dispatch = useDispatch();

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <motion.article
      whileHover={{ y: -7 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-2xl border border-[#7a2a25] bg-[#2a090c]/75 shadow-[0_15px_40px_rgba(0,0,0,.18)]"
    >
      <Link
        to={`/products/${product.id}`}
        className="block"
      >
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className={`${compact ? "h-44" : "h-40"} w-full object-cover transition duration-500 group-hover:scale-105`}
          />
          {!compact && (
            <button
              type="button"
              onClick={(e) => e.preventDefault()}
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-[#461014]/90 text-white"
            >
              <Heart
                size={16}
                strokeWidth={1.5}
              />
            </button>
          )}
        </div>
        <div className="p-4">
          <h3 className="truncate text-[16px] font-semibold text-white">
            {product.title}
          </h3>
          <p className="mt-2 min-h-10 text-xs leading-6 text-somak-muted">
            {product.short}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-somak-gold2">
              {formatPrice(product.price)} تومان
            </span>
            <button
              type="button"
              onClick={handleAddToCart}
              aria-label="افزودن به سبد خرید"
              className="grid h-9 w-9 place-items-center rounded-full bg-somak-gold text-somak-950 transition hover:brightness-105"
            >
              {compact ? <ShoppingCart size={17} /> : <Plus size={20} />}
            </button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
