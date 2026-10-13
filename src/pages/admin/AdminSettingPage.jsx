import { motion, AnimatePresence } from "framer-motion";
import {
  getPhoneNumber,
  createPhoneNumber,
  updatePhoneNumber,
  getPaymentInfo,
  createPaymentInfo,
  updatePaymentInfo,
  getSiteContacts,
  createSiteContact,
  updateSiteContact,
  deleteSiteContact,
  getSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "../../services/adminServices";

import { useEffect, useState } from "react";
import {
  Pencil,
  Plus,
  Trash2,
  X,
  Save,
  Phone,
  Smartphone,
  MapPin,
  Instagram,
  Send,
  MessageCircle,
  Facebook,
  Youtube,
  Linkedin,
  Globe,
  Music2,
  ExternalLink,
} from "lucide-react";

import AdminSelect from "../../components/admin/AdminSelect";
import ConfirmModal from "../../components/admin/common/ConfirmModal";

const CONTACT_TYPES = [
  { value: "mobile", label: "شماره موبایل", Icon: Smartphone },
  { value: "phone", label: "شماره تلفن ثابت", Icon: Phone },
  { value: "address", label: "آدرس", Icon: MapPin },
];

const SOCIAL_PLATFORMS = [
  { value: "instagram", label: "اینستاگرام", Icon: Instagram },
  { value: "telegram", label: "تلگرام", Icon: Send },
  { value: "whatsapp", label: "واتساپ", Icon: MessageCircle },
  { value: "facebook", label: "فیسبوک", Icon: Facebook },
  { value: "youtube", label: "یوتیوب", Icon: Youtube },
  { value: "linkedin", label: "لینکدین", Icon: Linkedin },
  { value: "tiktok", label: "تیک‌تاک", Icon: Music2 },
  { value: "website", label: "وب‌سایت", Icon: Globe },
];

function getNextOrder(items) {
  return (
    items.reduce((max, item) => Math.max(max, Number(item.order) || 0), 0) + 1
  );
}

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function sortByOrder(items) {
  return [...items].sort(
    (a, b) => (Number(a.order) || 0) - (Number(b.order) || 0),
  );
}

const AdminSettingPage = () => {
  // SMS Service — منطق و استایل بخش قبلی حفظ شده است.
  const [phone, setPhone] = useState([]);
  const [newPhone, setNewPhone] = useState("");

  // Payment Info — منطق و استایل بخش قبلی حفظ شده است.
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [newCardNumber, setNewCardNumber] = useState("");

  // Edit States قبلی
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingCard, setIsEditingCard] = useState(false);

  // Footer contact settings
  const [siteContacts, setSiteContacts] = useState([]);
  const [contactForm, setContactForm] = useState({
    type: "mobile",
    value: "",
  });
  const [editingContactId, setEditingContactId] = useState(null);

  // Footer social links
  const [socialLinks, setSocialLinks] = useState([]);
  const [socialForm, setSocialForm] = useState({
    platform: "instagram",
    url: "",
  });
  const [editingSocialId, setEditingSocialId] = useState(null);

  // Loading و وضعیت عملیات
  const [loading, setLoading] = useState(true);
  const [footerSaving, setFooterSaving] = useState(false);

  // Confirmation modal
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    type: null,
    id: null,
  });

  useEffect(() => {
    // منطق قبلی دریافت تنظیمات پیامک و پرداخت بدون تغییر
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
      } finally {
        // loading بخش‌های قبلی فقط به درخواست‌های قبلی وابسته است.
        setLoading(false);
      }
    };

    // دریافت تنظیمات فوتر جداست و روی رفتار بخش‌های قبلی اثر نمی‌گذارد.
    const fetchFooterSettings = async () => {
      try {
        const [contactsData, socialsData] = await Promise.all([
          getSiteContacts(),
          getSocialLinks(),
        ]);

        setSiteContacts(
          sortByOrder(Array.isArray(contactsData) ? contactsData : []),
        );
        setSocialLinks(
          sortByOrder(Array.isArray(socialsData) ? socialsData : []),
        );
      } catch (error) {
        console.log("cant fetch footer settings:", error);
      }
    };

    fetchSettings();
    fetchFooterSettings();
  }, []);

  const toPersianDigits = (value) => {
    return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
  };

  const formatPhoneNumber = (value) => {
    const digits = String(value ?? "")
      .replace(/\D/g, "")
      .slice(0, 11);

    return digits
      .replace(/^(\d{4})(\d)/, "$1-$2")
      .replace(/^(\d{4}-\d{3})(\d)/, "$1-$2");
  };

  // =========================
  // SMS PHONE — منطق اولیه بدون تغییر
  // =========================
  const handleSavePhone = async () => {
    const rawPhone = newPhone.replace(/\D/g, "");

    if (rawPhone.length !== 11) {
      return;
    }

    try {
      if (phone.length === 0) {
        const data = await createPhoneNumber(rawPhone);
        setPhone([data]);
      } else {
        const data = await updatePhoneNumber(phone[0].id, rawPhone);
        setPhone([data]);
      }

      setNewPhone("");
      setIsEditingPhone(false);
    } catch (error) {
      console.log("cant save phone:", error);
    }
  };

  // =========================
  // PAYMENT CARD — منطق اولیه بدون تغییر
  // =========================
  const handleSaveCardNumber = async () => {
    const rawCardNumber = newCardNumber.replace(/\D/g, "");

    if (rawCardNumber.length !== 16) {
      return;
    }

    try {
      if (paymentInfo.length === 0) {
        const data = await createPaymentInfo(newCardNumber);
        setPaymentInfo([data]);
      } else {
        const data = await updatePaymentInfo(paymentInfo[0].id, newCardNumber);
        setPaymentInfo([data]);
      }

      setNewCardNumber("");
      setIsEditingCard(false);
    } catch (error) {
      console.log("cant save card number:", error);
    }
  };

  // =========================
  // FOOTER CONTACTS
  // =========================
  const resetContactForm = () => {
    setContactForm({ type: "mobile", value: "" });
    setEditingContactId(null);
  };

  const startEditContact = (contact) => {
    setContactForm({
      type: contact.type,
      value: contact.value ?? "",
    });
    setEditingContactId(contact.id);
  };

  const handleSaveContact = async (event) => {
    event.preventDefault();
    const value = contactForm.value.trim();

    if (!value) {
      return;
    }

    setFooterSaving(true);

    try {
      if (editingContactId) {
        const existingContact = siteContacts.find(
          (item) => String(item.id) === String(editingContactId),
        );

        if (!existingContact) {
          throw new Error("اطلاعات تماس موردنظر پیدا نشد.");
        }

        await updateSiteContact(editingContactId, {
          ...existingContact,
          type: contactForm.type,
          value,
        });
      } else {
        await createSiteContact({
          type: contactForm.type,
          value,
          order: getNextOrder(siteContacts),
        });
      }

      resetContactForm();
      const updatedContacts = await getSiteContacts();
      setSiteContacts(
        sortByOrder(Array.isArray(updatedContacts) ? updatedContacts : []),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setFooterSaving(false);
    }
  };

  const handleDeleteContact = async (id) => {
    if (footerSaving) return;

    setFooterSaving(true);

    try {
      await deleteSiteContact(id);
      setSiteContacts((current) =>
        current.filter((item) => String(item.id) !== String(id)),
      );

      if (String(editingContactId) === String(id)) {
        resetContactForm();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFooterSaving(false);
    }
  };

  // =========================
  // FOOTER SOCIAL LINKS
  // =========================
  const resetSocialForm = () => {
    setSocialForm({ platform: "instagram", url: "" });
    setEditingSocialId(null);
  };

  const startEditSocial = (social) => {
    setSocialForm({
      platform: social.platform,
      url: social.url ?? "",
    });
    setEditingSocialId(social.id);
  };

  const handleSaveSocial = async (event) => {
    event.preventDefault();
    const url = socialForm.url.trim();

    if (!url) {
      return;
    }

    if (!isValidUrl(url)) {
      return;
    }

    setFooterSaving(true);

    try {
      if (editingSocialId) {
        const existingSocial = socialLinks.find(
          (item) => String(item.id) === String(editingSocialId),
        );

        if (!existingSocial) {
          throw new Error("شبکه اجتماعی موردنظر پیدا نشد.");
        }

        await updateSocialLink(editingSocialId, {
          ...existingSocial,
          platform: socialForm.platform,
          url,
        });
      } else {
        await createSocialLink({
          platform: socialForm.platform,
          url,
          order: getNextOrder(socialLinks),
        });
      }

      resetSocialForm();
      const updatedSocials = await getSocialLinks();
      setSocialLinks(
        sortByOrder(Array.isArray(updatedSocials) ? updatedSocials : []),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setFooterSaving(false);
    }
  };

  const handleDeleteSocial = async (id) => {
    if (footerSaving) return;

    setFooterSaving(true);

    try {
      await deleteSocialLink(id);
      setSocialLinks((current) =>
        current.filter((item) => String(item.id) !== String(id)),
      );

      if (String(editingSocialId) === String(id)) {
        resetSocialForm();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFooterSaving(false);
    }
  };

  const openDeleteModal = (type, id) => {
    setConfirmModal({ open: true, type, id });
  };

  const closeDeleteModal = () => {
    if (footerSaving) return;
    setConfirmModal({ open: false, type: null, id: null });
  };

  const handleConfirmDelete = async () => {
    if (footerSaving || confirmModal.id == null || !confirmModal.type) return;

    const { type, id } = confirmModal;
    setConfirmModal({ open: false, type: null, id: null });

    if (type === "contact") {
      await handleDeleteContact(id);
    } else if (type === "social") {
      await handleDeleteSocial(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* =========================
          SMS SERVICE — استایل اصلی حفظ شده
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

          {loading ? (
            <div className="px-5 py-8 text-sm text-white/40">
              در حال دریافت اطلاعات...
            </div>
          ) : phone.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
              <p className="text-sm text-white/60">
                هنوز شماره تلفن پنل پیامکی ثبت نشده است.
              </p>
              <button
                type="button"
                onClick={() => {
                  setNewPhone("");
                  setIsEditingPhone(true);
                }}
                className="mt-5 rounded-lg bg-gold-gradient px-6 py-2.5 font-medium text-somak-900 shadow-[0_6px_18px_rgba(230,166,46,0.16)] transition hover:brightness-105"
              >
                ثبت شماره تلفن
              </button>
            </div>
          ) : (
            <>
              <div className="mx-5 flex items-center gap-2 border-b border-somak-600 py-6">
                <p className="text-white/60">
                  شماره تلفن فعلی شما :
                  <span
                    className="mr-2 inline-block text-somak-gold2"
                    dir="ltr"
                  >
                    {toPersianDigits(formatPhoneNumber(phone[0]?.phoneNumber))}
                  </span>
                </p>

                <button
                  type="button"
                  onClick={() => {
                    if (!isEditingPhone) {
                      setNewPhone(
                        formatPhoneNumber(phone[0]?.phoneNumber || ""),
                      );
                    }
                    setIsEditingPhone((prev) => !prev);
                  }}
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                    isEditingPhone
                      ? "bg-somak-gold/10 text-somak-gold2"
                      : "text-white/35 hover:bg-white/5 hover:text-somak-gold2"
                  }`}
                >
                  <motion.div
                    animate={{ rotate: isEditingPhone ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Pencil size={20} />
                  </motion.div>
                </button>
              </div>

              <AnimatePresence initial={false}>
                {isEditingPhone && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="m-5 flex items-center gap-2">
                      <label className="ml-2 shrink-0 text-white">
                        شماره تلفن :
                      </label>
                      <input
                        placeholder="شماره تلفن پنل پیامکی را وارد کنید"
                        value={newPhone}
                        onChange={(e) => {
                          const value = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 11);
                          setNewPhone(formatPhoneNumber(value));
                        }}
                        maxLength={13}
                        type="tel"
                        inputMode="numeric"
                        dir="ltr"
                        className="h-[50px] w-full rounded-lg border border-somak-500 bg-somak-900 px-5 text-white outline-none transition placeholder:text-white/25 focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
                      />
                    </div>
                    <div className="m-5 flex justify-end">
                      <button
                        type="button"
                        onClick={handleSavePhone}
                        className="w-full rounded bg-gold-gradient px-4 py-2 font-medium text-somak-900 shadow-[0_6px_18px_rgba(230,166,46,0.16)] transition hover:brightness-105 sm:w-[200px]"
                      >
                        ذخیره
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {/* Empty State Form */}
          <AnimatePresence initial={false}>
            {!loading && phone.length === 0 && isEditingPhone && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="m-5 flex items-center gap-2">
                  <label className="ml-2 shrink-0 text-white">
                    شماره تلفن :
                  </label>
                  <input
                    placeholder="شماره تلفن پنل پیامکی را وارد کنید"
                    value={newPhone}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 11);
                      setNewPhone(formatPhoneNumber(value));
                    }}
                    maxLength={13}
                    type="tel"
                    inputMode="numeric"
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
          PAYMENT INFO — استایل اصلی حفظ شده
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

          {loading ? (
            <div className="px-5 py-8 text-sm text-white/40">
              در حال دریافت اطلاعات...
            </div>
          ) : paymentInfo.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
              <p className="text-sm text-white/60">
                هنوز شماره کارت مقصد ثبت نشده است.
              </p>
              <button
                type="button"
                onClick={() => {
                  setNewCardNumber("");
                  setIsEditingCard(true);
                }}
                className="mt-5 rounded-lg bg-gold-gradient px-6 py-2.5 font-medium text-somak-900 shadow-[0_6px_18px_rgba(230,166,46,0.16)] transition hover:brightness-105"
              >
                ثبت شماره کارت
              </button>
            </div>
          ) : (
            <>
              <div className="mx-5 flex items-center gap-2 border-b border-somak-600 py-6">
                <p className="text-white/60">
                  شماره کارت فعلی :
                  <span
                    dir="ltr"
                    className="mr-2 inline-block text-somak-gold2"
                  >
                    {toPersianDigits(paymentInfo[0]?.ShomareKartBeKart)}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (!isEditingCard) {
                      setNewCardNumber(paymentInfo[0]?.ShomareKartBeKart || "");
                    }
                    setIsEditingCard((prev) => !prev);
                  }}
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                    isEditingCard
                      ? "bg-somak-gold/10 text-somak-gold2"
                      : "text-white/35 hover:bg-white/5 hover:text-somak-gold2"
                  }`}
                >
                  <motion.div
                    animate={{ rotate: isEditingCard ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Pencil size={20} />
                  </motion.div>
                </button>
              </div>

              <AnimatePresence initial={false}>
                {isEditingCard && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
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
                        className="w-full rounded bg-gold-gradient px-4 py-2 font-medium text-somak-900 shadow-[0_6px_18px_rgba(230,166,46,0.16)] transition hover:brightness-105 sm:w-[200px]"
                      >
                        ذخیره
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {/* Empty State Form */}
          <AnimatePresence initial={false}>
            {!loading && paymentInfo.length === 0 && isEditingCard && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
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

      {/* =========================
          FOOTER SETTINGS — بخش جدید
      ========================= */}

      {/* اطلاعات تماس فوتر */}
      <section className="overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c] p-5 sm:p-6">
        <h2 className="text-[17px] font-medium text-white">اطلاعات تماس</h2>
        <p className="mb-6 mt-2 text-sm text-white/40">
          شماره موبایل، تلفن ثابت و آدرس فوتر سایت خود را مدیریت کنید.
        </p>

        <form onSubmit={handleSaveContact} className="space-y-4">
          <div className="grid-cols- grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-white/60">
                نوع اطلاعات تماس
              </label>
              <AdminSelect
                value={contactForm.type}
                onChange={(value) =>
                  setContactForm((current) => ({ ...current, type: value }))
                }
                options={CONTACT_TYPES.map(({ value, label }) => ({
                  value,
                  label,
                }))}
                placeholder="نوع اطلاعات تماس"
                className="w-full"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/60">مقدار</label>
              <input
                type={contactForm.type === "address" ? "text" : "number"}
                inputMode={
                  contactForm.type === "address" ? undefined : "numeric"
                }
                dir="rtl"
                value={contactForm.value}
                onChange={(event) =>
                  setContactForm((current) => ({
                    ...current,
                    value: event.target.value,
                  }))
                }
                placeholder={
                  contactForm.type === "address"
                    ? "آدرس را وارد کنید"
                    : "شماره تماس را وارد کنید"
                }
                className="h-[42px] w-full rounded-lg border border-somak-500 bg-somak-900 px-5 text-white outline-none transition placeholder:text-white/25 focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            {editingContactId && (
              <button
                type="button"
                onClick={resetContactForm}
                disabled={footerSaving}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/75 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={16} />
                لغو ویرایش
              </button>
            )}
            <button
              type="submit"
              disabled={footerSaving}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gold-gradient px-4 py-2.5 text-sm font-medium text-somak-900 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {editingContactId ? <Save size={16} /> : <Plus size={16} />}
              {editingContactId ? "ذخیره تغییرات" : "افزودن اطلاعات تماس"}
            </button>
          </div>
        </form>

        <div className="mt-6 space-y-3">
          {siteContacts.length === 0 ? (
            <div className="rounded-lg border border-somak-500/60 px-4 py-6 text-center text-sm text-white/40">
              هنوز اطلاعات تماسی ثبت نشده است.
            </div>
          ) : (
            siteContacts.map((contact) => {
              const contactType = CONTACT_TYPES.find(
                (item) => item.value === contact.type,
              );
              const Icon = contactType?.Icon ?? Phone;

              return (
                <div
                  key={contact.id}
                  className="flex flex-col gap-3 rounded-xl border border-somak-gold2/30 bg-somak-900/30 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-somak-gold/30 bg-white/5 text-somak-gold">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-white/85">
                        {contactType?.label ?? contact.type}
                      </p>
                      <p className="mt-1 break-words text-sm text-[#e9a92f] transition hover:text-[#f5bb4c]">
                        {contact.value}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => startEditContact(contact)}
                      disabled={footerSaving}
                      className="sm:w-auto w-full inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/75 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Pencil size={15} />
                      ویرایش
                    </button>
                    <button
                      type="button"
                      onClick={() => openDeleteModal("contact", contact.id)}
                      disabled={footerSaving}
                      className="sm:w-auto w-full inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2 text-sm text-red-100 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 size={15} className="text-red-600" />
                      حذف
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* شبکه‌های اجتماعی فوتر */}
      <section className="relative z-20 overflow-hidden rounded-[16px] border border-[#6f2826] bg-[#27090c] p-5 sm:p-6">
        <h2 className="text-[17px] font-medium text-white">شبکه‌های اجتماعی</h2>
        <p className="mb-6 mt-2 text-sm text-white/40">
          لینک صفحات اجتماعی را برای نمایش در فوتر مدیریت کنید.
        </p>

        <form onSubmit={handleSaveSocial} className="relative z-20 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-white/60">پلتفرم</label>
              <AdminSelect
                value={socialForm.platform}
                onChange={(value) =>
                  setSocialForm((current) => ({
                    ...current,
                    platform: value,
                  }))
                }
                options={SOCIAL_PLATFORMS.map(({ value, label }) => ({
                  value,
                  label,
                }))}
                placeholder="انتخاب شبکه اجتماعی"
                className="w-full"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/60">
                لینک صفحه
              </label>
              <input
                type="url"
                value={socialForm.url}
                onChange={(event) =>
                  setSocialForm((current) => ({
                    ...current,
                    url: event.target.value,
                  }))
                }
                placeholder="https://..."
                className="h-[42px] w-full rounded-lg border border-somak-500 bg-somak-900 px-5 text-white outline-none transition placeholder:text-white/25 focus:border-somak-gold focus:ring-1 focus:ring-somak-gold/30"
                dir="ltr"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            {editingSocialId && (
              <button
                type="button"
                onClick={resetSocialForm}
                disabled={footerSaving}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/75 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={16} />
                لغو ویرایش
              </button>
            )}
            <button
              type="submit"
              disabled={footerSaving}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gold-gradient px-4 py-2.5 text-sm font-medium text-somak-900 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {editingSocialId ? <Save size={16} /> : <Plus size={16} />}
              {editingSocialId ? "ذخیره تغییرات" : "افزودن شبکه اجتماعی"}
            </button>
          </div>
        </form>

        <div className="mt-6 space-y-3">
          {socialLinks.length === 0 ? (
            <div className="rounded-lg border border-somak-500/60 px-4 py-6 text-center text-sm text-white/40">
              هنوز لینک شبکه اجتماعی ثبت نشده است.
            </div>
          ) : (
            socialLinks.map((social) => {
              const platform = SOCIAL_PLATFORMS.find(
                (item) => item.value === social.platform,
              );
              const Icon = platform?.Icon ?? Globe;

              return (
                <div
                  key={social.id}
                  className="flex flex-col gap-3 rounded-xl border border-somak-gold2/30 bg-somak-900/30 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-somak-gold/30 bg-white/5 text-somak-gold">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-white/85">
                        {platform?.label ?? social.platform}
                      </p>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-flex max-w-full items-center gap-1 break-all text-xs text-[#e9a92f] transition hover:text-[#f5bb4c]"
                        dir="ltr"
                      >
                        <span >{social.url}</span>
                        <ExternalLink size={13} className="shrink-0" />
                      </a>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => startEditSocial(social)}
                      disabled={footerSaving}
                      className="sm:w-auto w-full inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/75 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Pencil size={15} />
                      ویرایش
                    </button>
                    <button
                      type="button"
                      onClick={() => openDeleteModal("social", social.id)}
                      disabled={footerSaving}
                      className="sm:w-auto w-full inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2 text-sm text-red-100 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 size={15} className="text-red-600" />
                      حذف
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      <ConfirmModal
        open={confirmModal.open}
        title={
          confirmModal.type === "contact"
            ? "حذف اطلاعات تماس"
            : "حذف شبکه اجتماعی"
        }
        message={
          confirmModal.type === "contact"
            ? "آیا از حذف این اطلاعات تماس مطمئن هستید؟ این عملیات قابل بازگشت نیست."
            : "آیا از حذف این لینک شبکه اجتماعی مطمئن هستید؟ این عملیات قابل بازگشت نیست."
        }
        confirmText="بله، حذف شود"
        cancelText="انصراف"
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </motion.div>
  );
};

export default AdminSettingPage;
