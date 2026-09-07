import { Eye, Search } from "lucide-react";
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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error("خطا در دریافت سفارش‌ها:", error);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* <div>
          <h1 className="text-xl font-medium text-white">سفارش‌ها</h1>

          <p className="mt-2 text-[10px] text-white/35">
            مشاهده و مدیریت سفارش‌های مشتریان
          </p>
        </div> */}

      {/* FILTER */}
      <section className="rounded-[16px] border border-[#6f2826] bg-[#27090c] p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e9a92f]/70"
            />

            <input
              value={search}
              onChange={(event) => dispatch(setOrderSearch(event.target.value))}
              placeholder="جستجوی شماره سفارش یا مشتری..."
              className="h-[42px] w-full rounded-[10px] border border-[#63221f] bg-[#25080b] pl-3 pr-10 text-[15px] text-white/70 outline-none placeholder:text-white/25 focus:border-[#e9a92f]/50"
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

      {/* TABLE */}
      <section className="overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-right">
            <thead>
              <tr className="border-b border-[#61221f]/70 text-[15px] text-white/80">
                <th className="px-5 py-4 font-normal">سفارش</th>
                <th className="py-4 font-normal">مشتری</th>
                <th className="py-4 font-normal">اقلام</th>
                <th className="py-4 font-normal">مبلغ</th>
                <th className="py-4 font-normal">وضعیت</th>
                <th className="px-5 py-4 font-normal">جزئیات</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-white/50">
                    هیچ سفارشی برای نمایش وجود ندارد.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#61221f]/40 last:border-0"
                  >
                    <td className="px-5 py-4 text-[15px] font-medium text-white/60">
                      {order.id}#
                    </td>

                    <td className="py-4">
                      <p className="text-[15px] text-white/60">
                        {order.userName}
                      </p>

                      <p className="mt-1 text-[12px] text-white/25">
                        {order.userphone}
                      </p>
                    </td>

                    <td className="py-4 text-[15px] text-white/40">
                      {order.items}
                    </td>

                    <td className="py-4 text-[15px] text-white/60">
                      {order.totalPrice.toLocaleString("fa-IR")} تومان
                    </td>

                    <td className="py-4">
                      <AdminStatsChip order={order} />
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => handleViewOrder(order)}
                        className="flex h-8 items-center gap-1.5 rounded-full border border-[#63221f] bg-[#25080b] px-3 text-[12px] text-white/50 transition hover:border-[#e9a92f]/40 hover:text-[#e9a92f]"
                      >
                        <Eye size={20} />
                        مشاهده
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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
