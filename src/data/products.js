import ghormeSabzi from "../assets/ghorme-sabzi.jpg";
import zereshkPolo from "../assets/zereshk-polo-card.jpg";
import cheloKabab from "../assets/chelo-kabab.jpg";
import baghaliPolo from "../assets/baghali-polo.jpg";
import cheloJojeh from "../assets/chelo-jojeh.jpg";
import fesenjan from "../assets/fesenjan.jpg";
import bademjan from "../assets/khoresht-bademjan.jpg";
import cheloCheen from "../assets/chelo-cheen.jpg";
import zereshkHero from "../assets/zereshk-polo.jpg";
export const products = [
  {
    id: "baghali-polo",
    title: "باقالی پلو با ماهیچه",
    short: "ماهیچه مخصوص با باقالی تازه",
    description:
      "ماهیچه مخصوص با باقالی تازه، برنج ایرانی و عطر زعفران؛ یک انتخاب اصیل و محبوب برای مهمانی‌ها.",
    price: 330000,
    image: baghaliPolo,
    category: "پلوها",
    prep: "۳۵ دقیقه",
    weight: "۴۵۰ گرم",
    servings: "۱ نفر",
    ingredients: [
      "برنج ایرانی",
      "باقالی تازه",
      "ماهیچه",
      "زعفران دم‌کرده",
      "روغن و ادویه‌های مخصوص",
    ],
  },
  {
    id: "zereshk-polo-morgh",
    title: "زرشک پلو با مرغ",
    short: "با مرغ تازه و زرشک اعلا",
    description:
      "مرغ زعفرانی سرو شده با برنج ایرانی و زرشک تازه؛ یک غذای اصیل و محبوب در مراسم و مهمانی‌ها.",
    price: 260000,
    image: zereshkHero,
    category: "پلوها",
    prep: "۴۵ دقیقه",
    weight: "۴۰۰ گرم",
    servings: "۱ نفر",
    ingredients: [
      "برنج ایرانی",
      "مرغ تازه",
      "زرشک",
      "زعفران",
      "روغن و ادویه‌های مخصوص",
    ],
  },
  {
    id: "chelo-kabab-koobideh",
    title: "چلو کباب کوبیده",
    short: "کوبیده تازه گوسفندی به همراه برنج ایرانی",
    description:
      "کباب کوبیده گوسفندی تازه با برنج ایرانی، گوجه کبابی و کره؛ طعمی آشنا و اصیل.",
    price: 290000,
    image: cheloKabab,
    category: "کباب‌ها",
    prep: "۳۰ دقیقه",
    weight: "۴۲۰ گرم",
    servings: "۱ نفر",
    ingredients: ["گوشت گوسفندی", "برنج ایرانی", "گوجه تازه", "کره", "زعفران"],
  },
  {
    id: "ghorme-sabzi",
    title: "قورمه سبزی",
    short: "با گوشت گوسفندی تازه و سبزیجات معطر",
    description:
      "قورمه سبزی جاافتاده با گوشت گوسفندی تازه، لوبیا و سبزی‌های معطر ایرانی.",
    price: 280000,
    image: ghormeSabzi,
    category: "خورشت‌ها",
    prep: "۵۰ دقیقه",
    weight: "۴۰۰ گرم",
    servings: "۱ نفر",
    ingredients: [
      "گوشت گوسفندی",
      "سبزی تازه",
      "لوبیا قرمز",
      "لیمو عمانی",
      "برنج ایرانی",
    ],
  },
  {
    id: "chelo-jojeh",
    title: "چلو جوجه کباب",
    short: "جوجه کباب زعفرانی با برنج ایرانی",
    description: "جوجه کباب زعفرانی نرم و آبدار با برنج ایرانی و گوجه تازه.",
    price: 280000,
    image: cheloJojeh,
    category: "کباب‌ها",
    prep: "۳۵ دقیقه",
    weight: "۴۲۰ گرم",
    servings: "۱ نفر",
    ingredients: ["سینه مرغ", "زعفران", "برنج ایرانی", "گوجه", "کره"],
  },
  {
    id: "fesenjan",
    title: "فسنجان با مرغ",
    short: "مرغ در سس فسنجان با گردو و رب انار",
    description: "فسنجان خوش‌عطر با مرغ، گردوی تازه و رب انار مخصوص سومک فود.",
    price: 270000,
    image: fesenjan,
    category: "خورشت‌ها",
    prep: "۶۰ دقیقه",
    weight: "۴۰۰ گرم",
    servings: "۱ نفر",
    ingredients: ["مرغ", "گردوی تازه", "رب انار", "زعفران", "ادویه"],
  },
  {
    id: "khoresht-bademjan",
    title: "خوراک بادمجان",
    short: "بادمجان کبابی با گوشت و سس مخصوص",
    description:
      "بادمجان کبابی با گوشت و سس مخصوص، همراه با گوجه و ادویه‌های معطر.",
    price: 240000,
    image: bademjan,
    category: "خورشت‌ها",
    prep: "۴۵ دقیقه",
    weight: "۴۰۰ گرم",
    servings: "۱ نفر",
    ingredients: ["بادمجان", "گوشت", "گوجه", "پیاز", "ادویه"],
  },
  {
    id: "chelo-cheen",
    title: "چلو جوجه کباب زعفرانی",
    short: "جوجه کباب زعفرانی با برنج",
    description: "جوجه کباب زعفرانی تازه، برنج ایرانی و چاشنی مخصوص سومک.",
    price: 280000,
    image: cheloCheen,
    category: "کباب‌ها",
    prep: "۳۵ دقیقه",
    weight: "۴۲۰ گرم",
    servings: "۱ نفر",
    ingredients: ["مرغ", "زعفران", "برنج ایرانی", "گوجه", "کره"],
  },
];
export const categories = [
  ["همه محصولات", 24],
  ["پلوها", 8],
  ["خورشت‌ها", 6],
  ["کباب‌ها", 5],
  ["خوراک‌ها", 3],
  ["سالاد و پیش‌غذا", 2],
];
