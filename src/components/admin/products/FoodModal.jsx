import { useEffect, useState } from "react";

import AdminSelect from "../AdminSelect";

const emptyFormData = {
  FoodName: "",
  title: "",
  shortTitle: "",
  description: "",
  price: "",
  image: "",
  categoryId: "",
  takeTime: "",
  weight: "",
  servings: "",
  ingredients: "",
  about: "",
};

const FoodModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
  categoryOptions,
}) => {
  const [formData, setFormData] = useState(emptyFormData);

  useEffect(() => {
    if (initialData) {
      setFormData({
        FoodName: initialData.FoodName || "",
        title: initialData.title || "",
        shortTitle: initialData.shortTitle || "",
        description: initialData.description || "",
        price: initialData.price ?? "",
        image: initialData.image || "",
        categoryId:
          initialData.categoryId !== undefined &&
          initialData.categoryId !== null
            ? String(initialData.categoryId)
            : "",
        takeTime: initialData.takeTime ?? "",
        weight: initialData.weight ?? "",
        servings: initialData.servings ?? "",
        ingredients: Array.isArray(initialData.ingredients)
          ? initialData.ingredients.join(", ")
          : initialData.ingredients || "",
        about: initialData.about || "",
      });
    } else {
      setFormData(emptyFormData);
    }
  }, [initialData, categoryOptions]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const foodData = {
      ...formData,
      price: Number(formData.price),
      takeTime: Number(formData.takeTime),
      weight: Number(formData.weight),
      servings: Number(formData.servings),
      categoryId : Number(formData.categoryId),
      ingredients: formData.ingredients
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    onSubmit(foodData);
  };

  if (!open) return null;

  return (
    <div className="dialog-overlay fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <form
        className="dialog-content relative grid w-[600px] grid-cols-2 gap-4 rounded-[20px] bg-somak-800 p-6 shadow-lg"
        onSubmit={handleSubmit}
      >
        <input
          className="h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="text"
          name="FoodName"
          placeholder="نام محصول"
          value={formData.FoodName}
          onChange={handleChange}
        />

        <input
          className="h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="text"
          name="title"
          placeholder="عنوان محصول"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          className="h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="text"
          name="shortTitle"
          placeholder="عنوان کوتاه محصول"
          value={formData.shortTitle}
          onChange={handleChange}
        />

        <input
          className="h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="text"
          name="description"
          placeholder="توضیحات محصول"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          className="h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="number"
          name="price"
          placeholder="قیمت محصول"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          className="h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="text"
          name="image"
          placeholder="تصویر محصول"
          value={formData.image}
          onChange={handleChange}
        />

        <AdminSelect
          className="col-span-2"
          value={formData.categoryId}
          onChange={handleCategoryChange}
          options={categoryOptions}
          placeholder="انتخاب دسته‌بندی"
        />

        <input
          className="h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="number"
          name="takeTime"
          placeholder="زمان اماده سازی (دقیقه)"
          value={formData.takeTime}
          onChange={handleChange}
        />

        <input
          className="h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="number"
          name="weight"
          placeholder="وزن(گرم)"
          value={formData.weight}
          onChange={handleChange}
        />

        <input
          className="h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="number"
          name="servings"
          placeholder="تعداد نفر"
          value={formData.servings}
          onChange={handleChange}
        />

        <input
          className="h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="text"
          name="ingredients"
          placeholder="مواد اولیه(با , جدا کنید)"
          value={formData.ingredients}
          onChange={handleChange}
        />

        <textarea
          className="col-span-2 min-h-[100px] rounded-lg border border-somak-500 bg-somak-900 px-5 py-4 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          name="about"
          placeholder="درباره محصول"
          value={formData.about}
          onChange={handleChange}
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
