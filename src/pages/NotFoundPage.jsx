import { Link } from "react-router-dom";
import PageMotion from "../components/PageMotion";
export default function NotFoundPage() {
  return (
    <PageMotion>
      <div className="mx-auto flex min-h-[55vh] max-w-[1200px] flex-col items-center justify-center px-6 text-center">
        <div className="text-7xl font-bold text-somak-gold2">۴۰۴</div>
        <h1 className="mt-5 text-2xl font-bold text-white">صفحه پیدا نشد</h1>
        <Link
          to="/"
          className="mt-7 rounded-full bg-gradient-to-r from-[#f5d26b] to-[#d9931e] px-7 py-3 font-semibold text-somak-950"
        >
          بازگشت به خانه
        </Link>
      </div>
    </PageMotion>
  );
}
