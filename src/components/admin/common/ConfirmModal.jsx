import { AlertTriangle, X } from "lucide-react";

const ConfirmModal = ({
  open,
  title = "تأیید عملیات",
  message = "آیا از انجام این عملیات مطمئن هستید؟",
  confirmText = "تأیید",
  cancelText = "لغو",
  onClose,
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-[2px]">
      <div className="relative w-full max-w-[420px] rounded-[20px] border border-[#6f2826] bg-somak-800 p-6 text-right shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-somak-muted transition hover:bg-somak-700 hover:text-white"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="mb-5 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-red-500/30 bg-red-300/10">
            <AlertTriangle size={28} className="text-red-600" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-[20px] font-bold text-white">{title}</h2>

          <p className="mt-3 text-base leading-7 text-somak-muted">{message}</p>
        </div>

        {/* Actions */}
        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-somak-gold px-4 py-2.5 font-medium text-white transition hover:bg-somak-gold hover:text-somak-900"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white shadow-[0_6px_18px_rgba(220,38,38,0.18)] transition hover:bg-red-500"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
