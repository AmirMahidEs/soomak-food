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
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [canScrollUp, setCanScrollUp] = useState(false);

  const ref = useRef(null);
  const listRef = useRef(null);

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

  useEffect(() => {
    if (!open) return;

    const list = listRef.current;
    if (!list) return;

    const updateScrollState = () => {
      setCanScrollUp(list.scrollTop > 0);
      setCanScrollDown(
        list.scrollTop + list.clientHeight < list.scrollHeight - 1,
      );
    };

    updateScrollState();

    list.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      list.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [open, options]);

  const selectedOption = options.find(
    (option) => option.value === value,
  );

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
        }`}
      >
        <span className={selectedOption ? "text-white/65" : "text-white/30"}>
          {selectedOption?.label || placeholder}
        </span>

        <ChevronDown
          size={18}
          strokeWidth={1.5}
          className={`shrink-0 text-[#e9a92f]/70 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-[calc(100%+6px)] z-50 w-full min-w-[170px] overflow-hidden rounded-[15px] border border-[#6f2826] bg-[#27090c] shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
          >
            <div
              ref={listRef}
              className="max-h-60 space-y-2 overflow-y-auto overflow-x-hidden p-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                    className={`flex w-full items-center justify-between rounded-[10px] px-3 py-2.5 text-right text-[14px] transition ${
                      isSelected
                        ? "bg-[#421014] text-[#e9a92f]"
                        : "text-white/55 hover:bg-[#3a0e12] hover:text-white/85"
                    }`}
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
            </div>

            {/* راهنمای اسکرول به پایین */}
            {canScrollDown && (
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex h-9 items-end justify-center bg-gradient-to-t from-[#27090c] via-[#27090c]/80 to-transparent pb-1">
                <ChevronDown
                  size={16}
                  className="animate-bounce text-[#e9a92f]/80"
                />
              </div>
            )}

            {/* راهنمای اسکرول به بالا */}
            {canScrollUp && (
              <div className="pointer-events-none absolute left-0 right-0 top-0 flex h-7 items-start justify-center bg-gradient-to-b from-[#27090c] to-transparent pt-1">
                <ChevronDown
                  size={14}
                  className="rotate-180 text-[#e9a92f]/70"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}