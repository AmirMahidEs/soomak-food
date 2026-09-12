import { motion, AnimatePresence } from "framer-motion";

import {
  getPhoneNumber,
  updatePhoneNumber,
  getPaymentInfo,
  updatePaymentInfo,
} from "../../services/adminServices";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

const AdminSettingPage = () => {
  // SMS Service
  const [phone, setPhone] = useState([]);
  const [newPhone, setNewPhone] = useState("");

  // Payment Info
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [newCardNumber, setNewCardNumber] = useState("");

  // Edit States
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingCard, setIsEditingCard] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [phoneData, paymentData] = await Promise.all([
          getPhoneNumber(),
          getPaymentInfo(),
        ]);

        setPhone(phoneData);
        setPaymentInfo(paymentData);
      } catch (error) {
        console.log("cant fetch settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const toPersianDigits = (value) => {
    return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
  };

  // =========================
  // SMS PHONE
  // =========================

  const handleSavePhone = async () => {
    if (newPhone.length === 0) {
      return;
    }

    try {
      const data = await updatePhoneNumber(phone[0].id, newPhone);

      setPhone([data]);
      setNewPhone("");
      setIsEditingPhone(false);
    } catch (error) {
      console.log("cant update phone:", error);
    }
  };

  // =========================
  // PAYMENT CARD
  // =========================

  const handleSaveCardNumber = async () => {
    const rawCardNumber = newCardNumber.replace(/\D/g, "");

    if (rawCardNumber.length !== 16) {
      return;
    }

    try {
      const data = await updatePaymentInfo(paymentInfo[0].id, newCardNumber);

      setPaymentInfo([data]);
      setNewCardNumber("");
      setIsEditingCard(false);
    } catch (error) {
      console.log("cant update card number:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* =========================
          SMS SERVICE
      ========================= */}

      <section className="overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c]">
        <div>
          <div className="border-b border-somak-600 px-5 py-6">
            <h2 className="text-[17px] font-medium text-white">
              تنظیمات پنل پیامکی
            </h2>

            <p className="mt-2 text-sm text-white/40">
              شماره تلفن پنل پیامکی را از این قسمت مدیریت کنید.
            </p>
          </div>

          <div className="mx-5 flex items-center gap-2 border-b border-somak-600 py-6">
            <p className="text-white/60">
              شماره تلفن فعلی شما :
              <span className="mr-2 text-somak-gold2">
                {toPersianDigits(phone[0]?.phoneNumber)}
              </span>
            </p>

            <button
              type="button"
              onClick={() => {
                setIsEditingPhone((prev) => !prev);
                setNewPhone(phone[0]?.phoneNumber);
              }}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                isEditingPhone
                  ? "bg-somak-gold/10 text-somak-gold2"
                  : "text-white/35 hover:bg-white/5 hover:text-somak-gold2"
              }`}
            >
              <motion.div transition={{ duration: 0.2 }}>
                <Pencil size={20} />
              </motion.div>
            </button>
          </div>

          <AnimatePresence initial={false}>
            {isEditingPhone && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="overflow-hidden"
              >
                <div className="m-5 flex items-center gap-2">
                  <label className="ml-2 shrink-0 text-white">
                    شماره تلفن :
                  </label>

                  <input
                    placeholder="شماره تلفن پنل پیامکی را وارد کنید"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    type="tel"
                    dir="ltr"
                    className="h-[50px] w-full rounded-lg border border-somak-500 bg-somak-900 px-5 text-white outline-none transition placeholder:text-white/25 focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
                  />
                </div>

                <div className="m-5 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSavePhone}
                    className="w-[200px] rounded bg-gold-gradient px-4 py-2 font-medium text-somak-900 shadow-[0_6px_18px_rgba(230,166,46,0.16)] transition hover:brightness-105"
                  >
                    ذخیره
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* =========================
          PAYMENT INFO
      ========================= */}

      <section className="overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c]">
        <div>
          <div className="border-b border-somak-600 px-5 py-6">
            <h2 className="text-[17px] font-medium text-white">
              تنظیمات پرداخت
            </h2>

            <p className="mt-2 text-sm text-white/40">
              شماره کارت مقصد برای پرداخت به روش کارت به کارت را مدیریت کنید.
            </p>
          </div>

          <div className="mx-5 flex items-center gap-2 border-b border-somak-600 py-6">
            <p className="text-white/60">
              شماره کارت فعلی :
              <span dir="ltr" className="mr-2 inline-block text-somak-gold2">
                {toPersianDigits(paymentInfo[0]?.ShomareKartBeKart)}
              </span>
            </p>

            <button
              type="button"
              onClick={() => {
                setIsEditingCard((prev) => !prev);
                setNewCardNumber(paymentInfo[0]?.ShomareKartBeKart);
              }}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                isEditingCard
                  ? "bg-somak-gold/10 text-somak-gold2"
                  : "text-white/35 hover:bg-white/5 hover:text-somak-gold2"
              }`}
            >
              <motion.div transition={{ duration: 0.2 }}>
                <Pencil size={20} />
              </motion.div>
            </button>
          </div>

          <AnimatePresence initial={false}>
            {isEditingCard && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="overflow-hidden"
              >
                <div className="m-5 flex items-center gap-2">
                  <label className="ml-2 shrink-0 text-white">
                    شماره کارت :
                  </label>

                  <input
                    placeholder="شماره کارت مقصد را وارد کنید"
                    value={newCardNumber}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 16)
                        .replace(/(\d{4})(?=\d)/g, "$1-");

                      setNewCardNumber(value);
                    }}
                    maxLength={19}
                    type="text"
                    inputMode="numeric"

                    dir="ltr"
                    className="h-[50px] w-full rounded-lg border border-somak-500 bg-somak-900 px-5 text-white outline-none transition placeholder:text-white/25 focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
                  />
                </div>

                <div className="m-5 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSaveCardNumber}
                    className="w-[200px] rounded bg-gold-gradient px-4 py-2 font-medium text-somak-900 shadow-[0_6px_18px_rgba(230,166,46,0.16)] transition hover:brightness-105"
                  >
                    ذخیره
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </motion.div>
  );
};

export default AdminSettingPage;
