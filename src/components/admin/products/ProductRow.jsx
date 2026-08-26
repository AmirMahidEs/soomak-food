import { Edit3, Trash2 } from "lucide-react";

export default function ProductRow({ product }) {
  return (
    <tr className="border-b border-[#61221f]/40 last:border-0">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="h-11 w-11 rounded-[9px] object-cover"
          />

          <div>
            <p className="text-[10px] font-medium text-white/80">
              {product.name}
            </p>

            <p className="mt-1 text-[8px] text-white/30">
              شناسه #{product.id}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-4 text-[10px] text-white/45">
        {product.category}
      </td>

      <td className="px-4 py-4 text-[10px] text-white/60">
        {product.price} تومان
      </td>

      <td className="px-4 py-4">
        <span
          className={`rounded-full px-2.5 py-1 text-[8px] ${
            product.stock
              ? "bg-green-400/10 text-green-300"
              : "bg-red-400/10 text-red-300"
          }`}
        >
          {product.stock ? "موجود" : "ناموجود"}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#63221f] text-white/40 transition hover:border-[#e9a92f]/40 hover:text-[#e9a92f]"
          >
            <Edit3 size={14} strokeWidth={1.4} />
          </button>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#63221f] text-white/40 transition hover:border-red-400/40 hover:text-red-300"
          >
            <Trash2 size={14} strokeWidth={1.4} />
          </button>
        </div>
      </td>
    </tr>
  );
}