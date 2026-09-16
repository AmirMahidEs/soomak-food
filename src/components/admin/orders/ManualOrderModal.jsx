import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, X } from "lucide-react";

import AdminSelect from "../AdminSelect";
import { getFoods } from "../../../services/foodServices";

const statusOptions = [
  { value: "New", label: "جدید" },
  { value: "Processing", label: "در حال آماده‌سازی" },
  { value: "Delivered", label: "تحویل داده شده" },
  { value: "Cancelled", label: "لغو شده" },
];

const ManualOrderModal = ({ open, onClose, user, onSubmit }) => {
  const [foods, setFoods] = useState([]);
  const [loadingFoods, setLoadingFoods] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);

  const [status, setStatus] = useState("New");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!open) return;

    const fetchFoods = async () => {
      try {
        setLoadingFoods(true);

        const data = await getFoods({
          take: 100,
          skip: 0,
        });

        setFoods(data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      } finally {
        setLoadingFoods(false);
      }
    };

    fetchFoods();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    setSelectedItems([]);
    setStatus("New");
    setAddress("");
  }, [open, user]);

  const addFood = (food) => {
    setSelectedItems((prev) => {
      const existingItem = prev.find((item) => item.foodId === food.id);

      if (existingItem) {
        return prev.map((item) =>
          item.foodId === food.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          foodId: food.id,
          title: food.title,
          price: Number(food.price) || 0,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (foodId) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.foodId === foodId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQuantity = (foodId) => {
    setSelectedItems((prev) =>
      prev
        .map((item) =>
          item.foodId === foodId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const totalPrice = useMemo(() => {
    return selectedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, [selectedItems]);

  const itemsText = useMemo(() => {
    return selectedItems
      .map((item) => `${toPersianDigits(item.quantity)} ${item.title}`)
      .join(" + ");
  }, [selectedItems]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user) return;
    if (selectedItems.length === 0) return;

    const orderData = {
      userId: user.id,
      userName: user.UserName,
      userphone: user.phoneNumber,
      totalPrice,
      orderDate: new Date().toISOString(),
      status,
      items: itemsText,
      orderItems: selectedItems,
      address: address.trim(),
      source: "manual",
    };

    onSubmit(orderData);
  };

  if (!open || !user) return null;

  return (
    <div className="dialog-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="dialog-content relative max-h-[90vh] w-[650px] max-w-full overflow-y-auto rounded-[20px] bg-somak-800 p-6 shadow-lg">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">ثبت سفارش دستی</h2>

            <p className="mt-1 text-xs text-white/40">
              ثبت سفارش برای {user.UserName}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-white/40 transition hover:text-white"
            aria-label="بستن"
          >
            <X size={22} />
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

              <p className="mt-1 text-sm text-white/70">{user.UserName}</p>
            </div>

            <div>
              <p className="text-xs text-white/30">شماره تماس</p>

              <p className="mt-1 text-sm text-white/70">
                {toPersianDigits(user.phoneNumber)}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Foods */}
          <div className="mb-4 rounded-[14px] border border-somak-500 bg-somak-900 p-4">
            <h3 className="mb-4 text-sm font-bold text-[#e9a92f]">
              انتخاب اقلام سفارش
            </h3>

            {loadingFoods ? (
              <div className="flex min-h-[100px] items-center justify-center">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-somak-gold" />

                  <span className="text-xs text-white/35">
                    در حال دریافت منو...
                  </span>
                </div>
              </div>
            ) : foods.length === 0 ? (
              <div className="rounded-lg border border-white/5 bg-white/[0.02] px-4 py-6 text-center">
                <p className="text-sm text-white/40">
                  غذایی برای انتخاب وجود ندارد.
                </p>
              </div>
            ) : (
              <div className="grid max-h-[240px] grid-cols-2 gap-2 overflow-y-auto">
                {foods.map((food) => {
                  const selectedItem = selectedItems.find(
                    (item) => item.foodId === food.id,
                  );

                  return (
                    <div
                      key={food.id}
                      className={`flex items-center justify-between rounded-lg border px-3 py-2.5 transition ${
                        selectedItem
                          ? "border-[#e9a92f]/40 bg-[#e9a92f]/5"
                          : "border-[#63221f] bg-[#27090c]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => addFood(food)}
                        className="min-w-0 flex-1 text-right"
                      >
                        <p className="truncate text-sm text-white/70 transition hover:text-[#e9a92f]">
                          {food.title}
                        </p>

                        <p className="mt-1 text-xs text-[#e9a92f]/65">
                          {toPersianDigits(
                            Number(food.price || 0).toLocaleString("en-US"),
                          )}{" "}
                          تومان
                        </p>
                      </button>

                      {selectedItem && (
                        <div className="mr-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(food.id)}
                            className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-white/45 transition hover:bg-white/10 hover:text-white"
                          >
                            <Minus size={13} />
                          </button>

                          <span className="min-w-[18px] text-center text-sm text-white/70">
                            {toPersianDigits(selectedItem.quantity)}
                          </span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(food.id)}
                            className="flex h-6 w-6 items-center justify-center rounded-md bg-[#e9a92f]/10 text-[#e9a92f] transition hover:bg-[#e9a92f]/20"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Selected Items Summary */}
            {selectedItems.length > 0 && (
              <div className="mt-4 border-t border-white/5 pt-4">
                <p className="mb-2 text-xs text-white/30">اقلام انتخاب‌شده</p>

                <p className="text-sm leading-6 text-white/65">{itemsText}</p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="mb-4 rounded-[14px] border border-somak-500 bg-somak-900 p-4">
            <h3 className="mb-4 text-sm font-bold text-[#e9a92f]">
              خلاصه سفارش
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/35">تعداد اقلام</span>

                <span className="text-sm text-white/65">
                  {toPersianDigits(
                    selectedItems.reduce(
                      (total, item) => total + item.quantity,
                      0,
                    ),
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-xs text-white/35">مبلغ کل</span>

                <span className="text-sm font-bold text-[#e9a92f]">
                  {toPersianDigits(totalPrice.toLocaleString("en-US"))} تومان
                </span>
              </div>
            </div>
          </div>

          {/* Address & Status */}
          <div className="mb-6 rounded-[14px] border border-somak-500 bg-somak-900 p-4">
            <h3 className="mb-4 text-sm font-bold text-[#e9a92f]">
              اطلاعات تکمیلی
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/35">آدرس</label>

                <textarea
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  rows={3}
                  placeholder="آدرس مشتری..."
                  className="mt-2 w-full resize-none rounded-lg border border-[#63221f] bg-[#27090c] px-3 py-2.5 text-sm leading-6 text-white/70 outline-none transition placeholder:text-white/20 focus:border-[#e9a92f]"
                />
              </div>

              <div>
                <label className="text-xs text-white/35">وضعیت سفارش</label>

                <div className="mt-2">
                  <AdminSelect
                    value={status}
                    onChange={setStatus}
                    options={statusOptions}
                    placeholder="انتخاب وضعیت"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={selectedItems.length === 0 || loadingFoods}
              className="flex-1 rounded bg-gold-gradient px-4 py-2.5 font-medium text-somak-900 shadow-[0_6px_18px_rgba(230,166,46,0.16)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ثبت سفارش
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#63221f] px-6 py-2.5 text-sm text-white/55 transition hover:border-[#7b2525] hover:text-white/80"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const toPersianDigits = (value) => {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
};

export default ManualOrderModal;
