import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AuthField({
  label,
  icon: Icon,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  autoComplete,
  required = true,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-white/85">
        {label}
      </span>

      <div className="relative">
        <input
          dir="rtl"
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="h-[50px] w-full rounded-[11px] border border-[#71302c] bg-[#220709]/75 px-11 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/25 focus:border-[#e6a62e]/70 focus:bg-[#220709] focus:ring-2 focus:ring-[#e6a62e]/10"
        />

        {/* Right icon */}
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
            className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-[#e6a62e] transition hover:text-[#f2c55d]"
          >
            {showPassword ? (
              <EyeOff size={18} strokeWidth={1.45} />
            ) : (
              <Eye size={18} strokeWidth={1.45} />
            )}
          </button>
        ) : (
          <Icon
            size={18}
            strokeWidth={1.45}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#e6a62e]"
          />
        )}
      </div>
    </label>
  );
}
