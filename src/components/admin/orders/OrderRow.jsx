import OrderStatusChip from "./OrderStatusChip";

export default function OrderRow({ order }) {
  return (
    <tr className="cursor-pointer border-b border-[#61221f]/40 transition hover:bg-[#2c0b0e] last:border-0">
      <td className="px-5 py-4 text-[10px] font-medium text-white/75">
        {order.id}
      </td>

      <td className="px-4 py-4 text-[10px] text-white/55">
        {order.customer}
      </td>

      <td className="px-4 py-4 text-[10px] text-white/40">
        {order.items}
      </td>

      <td className="px-4 py-4 text-[10px] text-white/60">
        {order.price}
      </td>

      <td className="px-4 py-4 text-[9px] text-white/35">
        {order.time}
      </td>

      <td className="px-5 py-4">
        <OrderStatusChip status={order.status} />
      </td>
    </tr>
  );
}