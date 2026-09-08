import { useEffect, useState } from "react";

import AdminSelect from "../AdminSelect";

const emptyFormData = {
  id: "",
  Name: "",
  Description: "",
  status: "Active",
};

const statusOptions = [
  {
    value: "Active",
    label: "فعال",
  },
  {
    value: "Deactive",
    label: "غیرفعال",
  },
];

const CategoryModal = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(emptyFormData);

  useEffect(() => {
    if (initialData) {
      setFormData({
        Name: initialData.Name || "",
        Description: initialData.Description || "",
        status: initialData.status || "Active",
      });
    } else {
      setFormData(emptyFormData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoryData = {
      ...formData,
    };

    onSubmit(categoryData);
  };

  if (!open) return null;

  return (
    <div className="dialog-overlay fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <form
        className="dialog-content relative grid w-[600px] grid-cols-2 gap-4 rounded-[20px] bg-somak-800 p-6 shadow-lg"
        onSubmit={handleSubmit}
      >
        {/* CATEGORY NAME */}
        <input
          className="col-span-2 h-[50px] rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          type="text"
          name="Name"
          placeholder="نام دسته‌بندی"
          value={formData.Name}
          onChange={handleChange}
        />

        {/* DESCRIPTION */}
        <textarea
          className="col-span-2 min-h-[120px] rounded-lg border border-somak-500 bg-somak-900 px-5 py-4 outline-none transition focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
          name="Description"
          placeholder="توضیحات دسته‌بندی"
          value={formData.Description}
          onChange={handleChange}
        />

        {/* STATUS */}
        <AdminSelect
          className="col-span-2"
          value={formData.status}
          onChange={handleStatusChange}
          options={statusOptions}
          placeholder="انتخاب وضعیت"
        />

        {/* ACTIONS */}
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

export default CategoryModal;
