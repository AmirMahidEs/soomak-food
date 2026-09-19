import {
  Eye,
  Search,
  MessageCircle,
  ShoppingBag,
  UserRound,
  Phone,
} from "lucide-react";

import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";

import {
  selectOrderFilters,
  setOrderSearch,
  setOrderStatusFilter,
} from "../../features/admin/adminSlice";

import AdminSelect from "../../components/admin/AdminSelect";

import { getAllOrders, updateOrderStatus } from "../../services/adminServices";

import { useEffect, useState } from "react";

import AdminStatsChip from "../../components/admin/dashboard/AdminStatsChip";

import OrderModal from "../../components/admin/orders/OrderModal";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const data = await getAllOrders();

        setOrders(data);
      } catch (error) {
        console.error("خطا در دریافت سفارش‌ها:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const dispatch = useDispatch();

  const { search, status } = useSelector(selectOrderFilters);

  const statusOptions = [
    { value: "", label: "همه وضعیت‌ها" },
    { value: "New", label: "جدید" },
    { value: "Processing", label: "در حال آماده‌سازی" },
    { value: "Delivered", label: "تحویل داده شده" },
    { value: "Cancelled", label: "لغو شده" },
  ];

  const filteredOrders = orders.filter((order) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      !query ||
      order.id.toLowerCase().includes(query) ||
      order.userName.toLowerCase().includes(query) ||
      order.userphone.toLowerCase().includes(query) ||
      order.items.toLowerCase().includes(query);

    return matchesSearch && (!status || order.status === status);
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setOpenOrderModal(true);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, newStatus);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order,
        ),
      );
    } catch (error) {
      console.error("خطا در تغییر وضعیت سفارش:", error);
    }
  };

  const toPersianDigits = (value) => {
    return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* FILTER */}
      <section className="rounded-[16px] border border-[#6f2826] bg-[#27090c] p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={20}
              strokeWidth={1.4}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e9a92f]/70"
            />

            <input
              value={search}
              onChange={(event) =>
                dispatch(setOrderSearch(event.target.value))
              }
              placeholder="جستجوی شماره سفارش یا مشتری..."
              className="h-[42px] w-full rounded-[10px] border border-[#63221f] bg-[#25080b] pl-3 pr-10 text-[13px] text-white/70 outline-none transition placeholder:text-white/25 focus:border-[#e9a92f]/50"
            />
          </div>

          <AdminSelect
            value={status}
            onChange={(value) => dispatch(setOrderStatusFilter(value))}
            options={statusOptions}
            placeholder="همه وضعیت‌ها"
          />
        </div>
      </section>

      {/* ORDERS */}
      <section className="overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c]">
        {loading ? (
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-somak-gold" />

              <p className="text-sm text-white/45">
                در حال دریافت سفارش‌ها...
              </p>
            </div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="flex min-h-[250px] flex-col items-center justify-center gap-4 px-5 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-white/25">
              <MessageCircle size={26} />
            </div>

            <div>
              <p className="text-[15px] font-medium text-white/70">
                سفارشی برای نمایش وجود ندارد
              </p>

              <p className="mt-1 text-[13px] text-white/35">
                هیچ سفارشی مطابق فیلترهای انتخاب‌شده پیدا نشد.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* DESKTOP CARDS */}
            <div className="hidden space-y-3 p-4 md:block">
              {filteredOrders.map((order) => (
                <motion.article
                  key={order.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden rounded-[14px] border border-[#61221f]/70 bg-[#25080b] transition-colors hover:border-[#6f2826]"
                >
                  {/* HEADER */}
                  <div className="flex items-center justify-between gap-4 border-b border-[#61221f]/50 px-4 py-3.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#421014]">
                        <ShoppingBag
                          size={22}
                          strokeWidth={1.4}
                          className="text-[#e9a92f]/80"
                        />
                      </div>

                      <div className="min-w-0">
                        <span className="block text-[12px] text-white/30">
                          شماره سفارش
                        </span>

                        <p className="mt-1 text-[15px] font-medium text-white/80">
                          #{order.id}
                        </p>
                      </div>
                    </div>

                    <AdminStatsChip order={order} />
                  </div>

                  {/* MAIN INFO */}
                  <div className="grid grid-cols-[1fr_1fr_1.3fr_1fr] gap-3 p-4">
                    {/* CUSTOMER */}
                    <div className="rounded-[10px] bg-white/[0.025] p-3">
                      <div className="flex items-center gap-2">
                        <UserRound
                          size={16}
                          strokeWidth={1.4}
                          className="text-[#e9a92f]/80"
                        />

                        <span className="text-[12.5px] text-white/35">
                          مشتری
                        </span>
                      </div>

                      <p className="mt-2 truncate text-[16px] text-white/70">
                        {order.userName}
                      </p>
                    </div>

                    {/* PHONE */}
                    <div className="rounded-[10px] bg-white/[0.025] p-3">
                      <div className="flex items-center gap-2">
                        <Phone
                          size={16}
                          strokeWidth={1.4}
                          className="text-[#e9a92f]/80"
                        />

                        <span className="text-[12.5px] text-white/35">
                          شماره تماس
                        </span>
                      </div>

                      <p
                        dir="ltr"
                        className="mt-2 truncate text-right text-[16px] text-white/70"
                      >
                        {toPersianDigits(order.userphone)}
                      </p>
                    </div>

                    {/* ITEMS */}
                    <div className="rounded-[10px] bg-white/[0.025] p-3">
                      <div className="flex items-center gap-2">
                        <ShoppingBag
                          size={16}
                          strokeWidth={1.4}
                          className="text-[#e9a92f]/80"
                        />

                        <span className="text-[12.5px] text-white/35">
                          اقلام سفارش
                        </span>
                      </div>

                      <p className="mt-2 truncate text-[15px] leading-6 text-white/70">
                        {order.items}
                      </p>
                    </div>

                    {/* TOTAL */}
                    <div className="rounded-[10px] bg-[#e9a92f]/[0.06] p-3">
                      <span className="text-[12.5px] text-white/35">
                        مبلغ سفارش
                      </span>

                      <p className="mt-2 truncate text-[16px] font-bold text-[#e9a92f]">
                        {order.totalPrice.toLocaleString("fa-IR")} تومان
                      </p>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="flex items-center justify-between border-t border-[#61221f]/40 px-4 py-3">
                    <span className="text-[13px] text-white/30">
                      جزئیات سفارش
                    </span>

                    <button
                      type="button"
                      onClick={() => handleViewOrder(order)}
                      className="flex h-9 items-center gap-1.5 rounded-full border border-[#63221f] bg-[#27090c] px-3.5 text-[12px] text-white/50 transition hover:border-[#e9a92f]/40 hover:text-[#e9a92f]"
                    >
                      <Eye size={19} />
                      مشاهده سفارش
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* MOBILE CARDS */}
            <div className="space-y-3 p-3 md:hidden">
              {filteredOrders.map((order) => (
                <motion.article
                  key={order.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-[14px] border border-[#61221f]/70 bg-[#25080b] p-4"
                >
                  {/* HEADER */}
                  <div className="flex items-center justify-between gap-3 border-b border-[#61221f]/50 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] bg-[#421014]">
                        <ShoppingBag
                          size={22}
                          strokeWidth={1.4}
                          className="text-[#e9a92f]/80"
                        />
                      </div>

                      <div>
                        <span className="block text-[12px] text-white/35">
                          شماره سفارش
                        </span>

                        <p className="mt-0.5 text-[14px] font-medium text-white/80">
                          #{order.id}
                        </p>
                      </div>
                    </div>

                    <AdminStatsChip order={order} />
                  </div>

                  {/* CUSTOMER */}
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="rounded-[10px] bg-white/[0.025] p-3">
                      <div className="flex items-center gap-2">
                        <UserRound
                          size={16}
                          strokeWidth={1.4}
                          className="text-[#e9a92f]/80"
                        />

                        <span className="text-[12.5px] text-white/35">
                          مشتری
                        </span>
                      </div>

                      <p className="mt-2 text-[16px] text-white/70">
                        {order.userName}
                      </p>
                    </div>

                    <div className="rounded-[10px] bg-white/[0.025] p-3">
                      <div className="flex items-center gap-2">
                        <Phone
                          size={16}
                          strokeWidth={1.4}
                          className="text-[#e9a92f]/80"
                        />

                        <span className="text-[12.5px] text-white/35">
                          شماره تماس
                        </span>
                      </div>

                      <p
                        dir="ltr"
                        className="mt-2 text-right text-[16px] text-white/70"
                      >
                        {toPersianDigits(order.userphone)}
                      </p>
                    </div>
                  </div>

                  {/* ITEMS */}
                  <div className="mt-3 rounded-[10px] bg-white/[0.025] p-3">
                    <div className="flex items-center gap-2">
                      <ShoppingBag
                        size={16}
                        strokeWidth={1.4}
                        className="text-[#e9a92f]/80"
                      />

                      <span className="text-[12.5px] text-white/35">
                        اقلام سفارش
                      </span>
                    </div>

                    <p className="mt-2 text-[15px] leading-6 text-white/70">
                      {order.items}
                    </p>
                  </div>

                  {/* TOTAL */}
                  <div className="mt-3 flex items-center justify-between rounded-[10px] bg-[#e9a92f]/[0.06] px-3 py-3">
                    <span className="text-[13px] text-white/35">
                      مبلغ سفارش
                    </span>

                    <span className="text-[16px] font-bold text-[#e9a92f]">
                      {order.totalPrice.toLocaleString("fa-IR")} تومان
                    </span>
                  </div>

                  {/* DETAILS */}
                  <div className="mt-3 flex items-center justify-between border-t border-[#61221f]/40 pt-3">
                    <span className="text-[13px] text-white/35">
                      جزئیات سفارش
                    </span>

                    <button
                      type="button"
                      onClick={() => handleViewOrder(order)}
                      className="flex h-9 items-center gap-1.5 rounded-full border border-[#63221f] bg-[#27090c] px-3 text-[12px] text-white/50 transition hover:border-[#e9a92f]/40 hover:text-[#e9a92f]"
                    >
                      <Eye size={19} />
                      مشاهده
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </>
        )}
      </section>

      <OrderModal
        open={openOrderModal}
        onClose={() => {
          setOpenOrderModal(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
        onStatusChange={handleStatusChange}
      />
    </motion.div>
  );
}
