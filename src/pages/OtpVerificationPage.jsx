import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  RefreshCw,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import AuthLayout from "../components/auth/AuthLayout";
import { loginWithOtp, requestOtp } from "../services/authServices";
import { setCredentials } from "../features/auth/authSlice";

import handleApiError from "../utilities/handleApiError";
import handleApiSuccess from "../utilities/handleApiSuccess";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

const toPersianDigits = (value) =>
  String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

const normalizeDigits = (value) =>
  value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/\D/g, "");

export default function OtpVerificationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const phone = location.state?.phone;
  const purpose = location.state?.purpose ?? 1;

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [resending, setResending] = useState(false);

  const inputsRef = useRef([]);
  const timerRef = useRef(null);
  const redirectTimerRef = useRef(null);

  useEffect(() => {
    if (!phone) {
      navigate("/login", { replace: true });
    }
  }, [phone, navigate]);

  useEffect(() => {
    if (seconds <= 0) return;

    timerRef.current = setTimeout(() => {
      setSeconds((value) => value - 1);
    }, 1000);

    return () => clearTimeout(timerRef.current);
  }, [seconds]);

  useEffect(() => {
    inputsRef.current[0]?.focus();

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(redirectTimerRef.current);
    };
  }, []);

  const handleChange = (index, rawValue) => {
    const digits = normalizeDigits(rawValue);
    const digit = digits.slice(-1);

    setOtp((current) => {
      const next = [...current];
      next[index] = digit;
      return next;
    });

    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }

    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    const pasted = normalizeDigits(event.clipboardData.getData("text")).slice(
      0,
      OTP_LENGTH,
    );

    if (!pasted) return;

    event.preventDefault();

    const next = Array(OTP_LENGTH).fill("");

    pasted.split("").forEach((digit, index) => {
      next[index] = digit;
    });

    setOtp(next);
    setStatus("idle");
    setMessage("");

    inputsRef.current[Math.min(pasted.length, OTP_LENGTH) - 1]?.focus();
  };

  const handleVerify = async (event) => {
    event.preventDefault();

    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      setStatus("error");
      setMessage("لطفاً کد شش‌رقمی را کامل وارد کنید.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await loginWithOtp(phone, code);

      const result = handleApiSuccess(response, (data) =>
        Boolean(data?.tokenResult?.accessToken),
      );

      const tokens = result.tokenResult;

      dispatch(
        setCredentials({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          accessTokenExpiresAt: tokens.accessTokenExpiresAt,
          refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
        }),
      );

      setStatus("success");
      setMessage("کد تأیید شد؛ ورود شما موفقیت‌آمیز بود.");

      redirectTimerRef.current = setTimeout(() => {
        navigate("/", { replace: true });
      }, 900);
    } catch (error) {
      console.error("OTP verification failed:", error);

      const apiError = handleApiError(error);

      setStatus("error");
      setMessage(apiError.message);

      setOtp(Array(OTP_LENGTH).fill(""));

      inputsRef.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    if (seconds > 0 || resending) return;

    setResending(true);
    setMessage("");

    try {
      const response = await requestOtp(phone, purpose);

      // فقط Status Code تعیین می‌کند که درخواست موفق بوده است.
      handleApiSuccess(response);

      setSeconds(RESEND_SECONDS);
      setOtp(Array(OTP_LENGTH).fill(""));
      setStatus("idle");

      inputsRef.current[0]?.focus();

      setMessage("کد جدید ارسال شد.");
    } catch (error) {
      console.error("OTP resend failed:", error);

      const apiError = handleApiError(error);

      setStatus("error");
      setMessage(apiError.message);
    } finally {
      setResending(false);
    }
  };

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  if (!phone) return null;

  return (
    <AuthLayout title="تأیید شماره موبایل">
      <div className="otp-entrance space-y-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-[#e6a62e]/25 bg-[#e6a62e]/10 text-[#e6a62e] shadow-[0_0_40px_rgba(230,166,46,0.10)]">
          {isSuccess ? (
            <CheckCircle2 size={38} className="otp-success" />
          ) : isError ? (
            <XCircle size={38} className="text-red-400" />
          ) : (
            <ShieldCheck size={38} />
          )}
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-xl font-bold text-white">
            {isSuccess ? "با موفقیت تأیید شد!" : "کد یکبار مصرف را وارد کنید"}
          </h2>

          <p className="text-sm leading-7 text-white/55">
            کد تأیید برای شماره
            <span dir="ltr" className="mx-1 font-semibold text-[#e6a62e]">
              {toPersianDigits(phone)}
            </span>
            ارسال شده است.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-5">
          <div
            dir="ltr"
            onPaste={handlePaste}
            className={`flex justify-center gap-2 sm:gap-3 ${
              isError ? "otp-shake" : ""
            }`}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputsRef.current[index] = element;
                }}
                aria-label={`رقم ${toPersianDigits(index + 1)} کد تأیید`}
                autoComplete={index === 0 ? "one-time-code" : "off"}
                inputMode="numeric"
                pattern="[0-9۰-۹٠-٩]*"
                maxLength={1}
                value={toPersianDigits(digit)}
                disabled={isLoading || isSuccess}
                onChange={(event) => handleChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                className={`h-12 min-w-0 max-w-[52px] flex-1 rounded-xl border bg-[#19090b] text-center text-xl font-bold text-white outline-none transition-all duration-200 sm:h-14 sm:max-w-[58px] ${
                  isSuccess
                    ? "border-emerald-400 bg-emerald-400/10"
                    : isError
                      ? "border-red-400/80 bg-red-400/5"
                      : digit
                        ? "border-[#e6a62e]/70"
                        : "border-[#71302c] focus:border-[#e6a62e] focus:ring-2 focus:ring-[#e6a62e]/15"
                }`}
              />
            ))}
          </div>

          <div
            aria-live="polite"
            className={`min-h-6 text-center text-sm ${
              isSuccess
                ? "text-emerald-400"
                : isError
                  ? "text-red-400"
                  : "text-white/60"
            }`}
          >
            {message}
          </div>

          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="group flex h-[51px] w-full items-center justify-center gap-3 rounded-full bg-gold-gradient font-semibold text-[#120304] shadow-[0_8px_25px_rgba(217,147,30,0.16)] transition-all duration-200 hover:-translate-y-[1px] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <LoaderCircle size={19} className="animate-spin" />
                در حال بررسی کد...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 size={19} />
                تأیید شد
              </>
            ) : (
              <>
                <span>تأیید کد و ورود</span>
                <ArrowLeft
                  size={19}
                  className="transition-transform duration-200 group-hover:-translate-x-1"
                />
              </>
            )}
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 text-sm text-white/50">
          <Clock3 size={16} />

          {seconds > 0 ? (
            <span>
              ارسال مجدد تا{" "}
              <span dir="ltr" className="font-semibold text-[#e6a62e]">
                {toPersianDigits(
                  `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
                    seconds % 60,
                  ).padStart(2, "0")}`,
                )}
              </span>
            </span>
          ) : (
            <span>کدی دریافت نکرده‌اید؟</span>
          )}
        </div>

        <button
          type="button"
          onClick={handleResend}
          disabled={seconds > 0 || resending || isLoading || isSuccess}
          className="mx-auto flex items-center justify-center gap-2 text-sm text-[#e6a62e] transition hover:text-[#f2c55d] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {resending ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            <RefreshCw size={16} />
          )}
          ارسال مجدد کد
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mx-auto flex items-center justify-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          بازگشت به ورود
        </button>
      </div>
    </AuthLayout>
  );
}
