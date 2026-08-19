import { Instagram, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import logo from "../assets/logo-placeholder.svg";
import { Link } from "react-router-dom";
export default function Footer() {
  const social = [
    {
      icon: Instagram,
      href: "https://instagram.com/your_page",
    },
    {
      icon: Send,
      href: "https://t.me/your_page",
    },
    {
      icon: MessageCircle,
      href: "https://wa.me/989121234567",
    },
  ];
  return (
    <footer
      id="contact"
      className="border-t border-white/10 bg-[#160405]"
    >
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-14 lg:grid-cols-[1.2fr_1fr_1fr_1fr] ">
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
            {social.map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-somak-gold/70 text-somak-gold transition hover:bg-somak-gold hover:text-somak-950"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-5 text-base text-white">نماد اعتماد</h3>
          <div className="flex h-32 w-28 items-center justify-center rounded-2xl border border-somak-gold/20 bg-white/[0.02] text-center text-xs text-somak-muted">
            نماد
            <br />
            اعتماد
          </div>
        </div>
        <div>
          <h3 className="mb-5 text-base text-white">اطلاعات تماس</h3>
          <ul className="space-y-5 text-sm text-somak-muted">
            <li className="flex items-center gap-3">
              <a
                href="tel:02112345678"
                className="flex items-center gap-3 transition hover:text-somak-gold"
              >
                <Phone
                  size={17}
                  className="text-somak-gold"
                />
                ۰۲۱-۱۲۳۴۵۶۷۸
              </a>
            </li>
            <li className="flex items-center gap-3">
              <a
                href="tel:02112345678"
                className="flex items-center gap-3 transition hover:text-somak-gold"
              >
                <Phone
                  size={17}
                  className="text-somak-gold"
                />
                ۰۹۱۲-۱۱۱۲۳۴۵۶
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin
                size={17}
                className="mt-1 shrink-0 text-somak-gold"
              />
              تهران، خیابان ولیعصر، پلاک ۱۲۳
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-5 text-base text-white">دسترسی سریع</h3>
          <ul className="space-y-4 text-sm text-somak-muted">
            <li>
              <Link
                to="/products"
                className="hover:text-somak-gold"
              >
                منو
              </Link>
            </li>
            <li>
              <a
                href="#corporate"
                className="hover:text-somak-gold"
              >
                سفارش سازمانی
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-somak-gold"
              >
                درباره ما
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-somak-gold"
              >
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
