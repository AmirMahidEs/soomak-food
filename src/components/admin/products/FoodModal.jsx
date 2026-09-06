import { useState } from "react";
import AdminSelect from "../AdminSelect";

const FoodModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
  categoryOptions,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    initialData?.categoryId || "",
  );

  if (!open) return null;

  return (
    <div className="dialog-overlay fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <form
        className="dialog-content relative grid w-[600px] grid-cols-2 gap-4 rounded-[20px] bg-somak-800 p-6 shadow-lg"
        onSubmit={onSubmit}
      >
        <input
          className="h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="text"
          placeholder="نام محصول"
          defaultValue={initialData?.FoodName || ""}
        />
        <input
          className="h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="text"
          placeholder="عنوان محصول"
          defaultValue={initialData?.title || ""}
        />
        <input
          className="h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="text"
          placeholder="عنوان کوتاه محصول"
          defaultValue={initialData?.shortTitle || ""}
        />
        <input
          className="h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="text"
          placeholder="توضیحات محصول"
          defaultValue={initialData?.description || ""}
        />
        <input
          className="h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="number"
          placeholder="قیمت محصول"
          defaultValue={initialData?.price || ""}
        />
        <input
          className="h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="text"
          placeholder="تصویر محصول"
          defaultValue={initialData?.image || ""}
        />

        <AdminSelect
          className="col-span-2"
          value={selectedCategoryId}
          onChange={setSelectedCategoryId}
          options={categoryOptions}
          placeholder="انتخاب دسته‌بندی"
        />

        <input
          className="h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="number"
          placeholder="زمان اماده سازی (دقیقه)"
          defaultValue={initialData?.takeTime || ""}
        />
        <input
          className="h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="number"
          placeholder="وزن(گرم)"
          defaultValue={initialData?.weight || ""}
        />
        <input
          className="h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="number"
          placeholder="تعداد نفر"
          defaultValue={initialData?.servings || ""}
        />

        <input
          className="h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="text"
          placeholder="مواد اولیه(با ، جدا کنید)"
          defaultValue={initialData?.ingredients || ""}
        />

        <textarea
          className="col-span-2 min-h-[100px] rounded-lg border border-somak-500 bg-somak-900 px-5 py-4 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          placeholder="درباره محصول"
          defaultValue={initialData?.about || ""}
        />
        <div className="col-span-2 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded border border-somak-gold px-4 py-2 font-medium text-white transition hover:bg-somak-gold hover:text-somak-900"
          >
            لغو
          </button>
          <button
            type="submit"
            className="w-full rounded bg-gold-gradient px-4 py-2 font-medium text-somak-900 shadow-[0_6px_18px_rgba(230,166,46,0.16)] transition hover:brightness-105"
          >
            ذخیره
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodModal;
