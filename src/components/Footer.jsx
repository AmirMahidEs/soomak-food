import {
  Instagram,
  Send,
  MessageCircle,
  Facebook,
  Youtube,
  Linkedin,
  Music2,
  Globe,
  MapPin,
  Phone,
} from "lucide-react";

import { useEffect, useState } from "react";
import logo from "../assets/logo-placeholder.svg";
import { Link } from "react-router-dom";

import { getSiteContacts, getSocialLinks } from "../services/adminServices";

const socialIcons = {
  instagram: Instagram,
  telegram: Send,
  whatsapp: MessageCircle,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  tiktok: Music2,
  website: Globe,
};

export default function Footer() {
  const [contacts, setContacts] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const [contactsData, socialData] = await Promise.all([
          getSiteContacts(),
          getSocialLinks(),
        ]);

        setContacts([...contactsData].sort((a, b) => a.order - b.order));

        setSocialLinks([...socialData].sort((a, b) => a.order - b.order));
      } catch (error) {
        console.error("خطا در دریافت اطلاعات فوتر:", error);
      }
    };

    fetchFooterData();
  }, []);

  const getContactHref = (contact) => {
    if (contact.type === "mobile" || contact.type === "phone") {
      return `tel:${contact.value.replace(/\D/g, "")}`;
    }

    return null;
  };

  const formatContactValue = (contact) => {
    if (contact.type === "mobile" || contact.type === "phone") {
      return contact.value.replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
    }

    return contact.value;
  };

  return (
    <footer id="contact" className="border-t border-white/10 bg-[#160405]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 py-14 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        {/* معرفی سایت */}
        <div>
          <img
            src={logo}
            alt="سومک فود"
            className="mb-5 h-20 w-auto object-contain"
          />

          <p className="max-w-xs text-sm leading-8 text-somak-muted">
            ما در سومک فود، با عشق و از بهترین مواد اولیه، غذاهای اصیل ایرانی را
            برای شما آماده می‌کنیم.
          </p>

          <div className="mt-5 flex gap-3">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.platform];

              if (!Icon || !social.url) return null;

              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  title={social.platform}
                  className="grid h-10 w-10 place-items-center rounded-full border border-somak-gold/70 text-somak-gold transition hover:bg-somak-gold hover:text-somak-950"
                >
                  {Icon ? <Icon size={17} /> : <Globe size={17} />}
                </a>
              );
            })}
          </div>
        </div>

        {/* نماد اعتماد */}
        <div>
          <h3 className="mb-5 text-base text-white">نماد اعتماد</h3>

          <div className="flex h-32 w-28 items-center justify-center rounded-2xl border border-somak-gold/20 bg-white/[0.02] text-center text-xs text-somak-muted">
            نماد
            <br />
            اعتماد
          </div>
        </div>

        {/* اطلاعات تماس از بک‌اند */}
        <div>
          <h3 className="mb-5 text-base text-white">اطلاعات تماس</h3>

          <ul className="space-y-5 text-sm text-somak-muted">
            {contacts.map((contact) => {
              const href = getContactHref(contact);

              return (
                <li
                  key={contact.id}
                  className={`flex items-${contact.type === "address" ? "start" : "center"} gap-3`}
                >
                  {href ? (
                    <a
                      href={href}
                      dir="auto"
                      className="flex flex-row-reverse items-center gap-3 transition hover:text-somak-gold"
                    >
                      <Phone size={17} className="shrink-0 text-somak-gold" />
                      <span>{formatContactValue(contact)}</span>
                    </a>
                  ) : contact.type === "address" ? (
                    <>
                      <MapPin
                        size={17}
                        className="mt-1 shrink-0 text-somak-gold"
                      />
                      <span>{contact.value}</span>
                    </>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>

        {/* دسترسی سریع */}
        <div>
          <h3 className="mb-5 text-base text-white">دسترسی سریع</h3>

          <ul className="space-y-4 text-sm text-somak-muted">
            <li>
              <Link to="/products" className="hover:text-somak-gold">
                منو
              </Link>
            </li>
            <li>
              <a href="#corporate" className="hover:text-somak-gold">
                سفارش سازمانی
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-somak-gold">
                درباره ما
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-somak-gold">
                تماس با ما
              </a>
            </li>
            <li>سوالات متداول</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
