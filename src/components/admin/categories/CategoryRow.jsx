import { Edit3, Trash2 } from "lucide-react";

export default function CategoryRow({ category }) {
  return (
    <tr className="border-b border-[#61221f]/40 last:border-0">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#e9a92f]/10 text-[#e9a92f]">
            #
          </div>

          <span className="text-[10px] text-white/75">{category.name}</span>
        </div>
      </td>

      <td className="px-4 py-4 text-[10px] text-white/45">
        {category.count} غذا
      </td>

      <td className="px-4 py-4">
        <span className="rounded-full bg-green-400/10 px-2.5 py-1 text-[8px] text-green-300">
          فعال
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#63221f] text-white/40 transition hover:border-[#e9a92f]/40 hover:text-[#e9a92f]"
          >
            <Edit3 size={14} />
          </button>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#63221f] text-white/40 transition hover:border-red-400/40 hover:text-red-300"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}
