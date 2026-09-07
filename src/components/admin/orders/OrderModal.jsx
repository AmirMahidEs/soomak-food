import { useEffect, useState } from "react";
import AdminSelect from "../AdminSelect";

const statusOptions = [
  { value: "New", label: "جدید" },
  { value: "Processing", label: "در حال آماده‌سازی" },
  { value: "Delivered", label: "تحویل داده شده" },
  { value: "Cancelled", label: "لغو شده" },
];

const OrderModal = ({ open, onClose, order, onStatusChange }) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (order) {
      setStatus(order.status || "");
    }
  }, [order]);

  if (!open || !order) return null;

  const handleStatusChange = (value) => {
    setStatus(value);
    onStatusChange(order.id, value);
  };

  return (
    <div className="dialog-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="dialog-content relative w-[600px] max-w-full rounded-[20px] bg-somak-800 p-6 shadow-lg">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">جزئیات سفارش</h2>

            <p className="mt-1 text-xs text-white/40">سفارش #{order.id}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-white/40 transition hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Customer Info */}
        <div className="mb-4 rounded-[14px] border border-somak-500 bg-somak-900 p-4">
          <h3 className="mb-4 text-sm font-bold text-[#e9a92f]">
            اطلاعات مشتری
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-white/30">نام مشتری</p>

              <p className="mt-1 text-sm text-white/70">{order.userName}</p>
            </div>

            <div>
              <p className="text-xs text-white/30">شماره تماس</p>

              <p className="mt-1 text-sm text-white/70">{order.userphone}</p>
            </div>

            <div className="col-span-2">
              <p className="text-xs text-white/30">آدرس</p>

              <p className="mt-1 text-sm leading-6 text-white/70">
                {order.address || "آدرسی ثبت نشده است"}
              </p>
            </div>
          </div>
        </div>

        {/* Order Info */}
        <div className="mb-4 rounded-[14px] border border-somak-500 bg-somak-900 p-4">
          <h3 className="mb-4 text-sm font-bold text-[#e9a92f]">
            اطلاعات سفارش
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/35">اقلام سفارش</span>

              <span className="text-sm text-white/70">{order.items}</span>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-3">
              <span className="text-xs text-white/35">مبلغ کل</span>

              <span className="text-sm font-bold text-[#e9a92f]">
                {order.totalPrice?.toLocaleString("fa-IR")} تومان
              </span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mb-6 rounded-[14px] border border-somak-500 bg-somak-900 p-4">
          <h3 className="mb-3 text-sm font-bold text-[#e9a92f]">وضعیت سفارش</h3>

          <AdminSelect
            value={status}
            onChange={handleStatusChange}
            options={statusOptions}
            placeholder="انتخاب وضعیت"
          />
        </div>

        {/* Footer */}
        <button
          type="button"
          onClick={onClose}
            className="w-full rounded bg-gold-gradient px-4 py-2 font-medium text-somak-900 shadow-[0_6px_18px_rgba(230,166,46,0.16)] transition hover:brightness-105"
        >
          بستن
        </button>
      </div>
    </div>
  );
};

export default OrderModal;
