import { motion } from "framer-motion";
import {
  getPhoneNumber,
  updatePhoneNumber,
} from "../../services/adminServices";
import { useEffect, useState } from "react";

const AdminSettingPage = () => {
  const [phone, setPhone] = useState([]);
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const data = await getPhoneNumber();
        setPhone(data);
      } catch (error) {
        console.log("cant fetch phone number :", error);
      }
    };
    fetchPhone();
  }, []);

  const toPersianDigits = (value) => {
    return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
  };

  const handleSavePhone = async () => {
    if (newPhone.length === 0) {
      return;
    }
    {
      try {
        const data = await updatePhoneNumber(phone[0].id, newPhone);
        setPhone([data]);
      } catch (error) {
        console.log("cant update phone:", error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* SMS Service */}
      <section className="overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c]">
        <div>
          <p className="mx-5 border-b border-somak-600 py-7 text-white/60">
            شماره تلفن فعلی شما : {toPersianDigits(phone[0]?.phoneNumber)}
          </p>
          <div className="m-5 flex items-center gap-2">
            <label className="ml-2 shrink-0 text-white">شماره تلفن :</label>
            <input
              placeholder=" شماره تلفن پنل پیامکی خود را از این قسمت ویرایش کنید."
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              type="number"
              className="h-[50px] w-full rounded-lg border border-somak-500 bg-somak-900 px-5 outline-none transition placeholder:text-white/25 focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
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
        </div>
      </section>
    </motion.div>
  );
};

export default AdminSettingPage;
