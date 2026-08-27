import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function AdminSelect({
  value,
  onChange,
  options = [],
  placeholder = "انتخاب کنید",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-[42px] w-full min-w-[170px] items-center justify-between gap-3 rounded-[10px] border border-[#63221f] bg-[#25080b] px-4 text-[15px] outline-none transition ${
          open
            ? "border-[#e9a92f]/50 ring-1 ring-[#e9a92f]/15"
            : "hover:border-[#7d2c28]"
        } `}
      >
        <span className={selectedOption ? "text-white/65" : "text-white/30"}>
          {selectedOption?.label || placeholder}
        </span>

        <ChevronDown
          size={18}
          strokeWidth={1.5}
          className={`shrink-0 text-[#e9a92f]/70 transition-transform duration-200 ${open ? "rotate-180" : ""} `}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-[calc(100%+6px)] z-50 w-full min-w-[170px] overflow-hidden rounded-[11px] border border-[#6f2826] bg-[#27090c] p-1 shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
          >
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-[8px] px-3 py-2.5 text-right text-[14px] transition ${
                    isSelected
                      ? "bg-[#421014] text-[#e9a92f]"
                      : "text-white/55 hover:bg-[#3a0e12] hover:text-white/85"
                  } `}
                >
                  <span>{option.label}</span>

                  {isSelected && (
                    <Check
                      size={16}
                      strokeWidth={1.8}
                      className="text-[#e9a92f]"
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
