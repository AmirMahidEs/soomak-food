import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",

  initialState: {
    activeTab: "profile",

    info: {
      id: 1,
      firstName: "امیر محمدی",
      phone: "0912 123 4567",
      email: "ali.rezai@email.com",
    },

    orders: [
      {
        id: 1001,
        orderDate: "2026-09-01T11:30:00",
        status: "Processing",
        statusLabel: "در حال آماده‌سازی",
        items: [
          {
            foodId: "zereshk-polo-morgh",
            title: "زرشک پلو با مرغ",
            quantity: 2,
            price: 260000,
          },
          {
            foodId: "ghorme-sabzi",
            title: "قورمه سبزی",
            quantity: 1,
            price: 280000,
          },
        ],
        totalPrice: 800000,
        address: "تهران، خیابان ولیعصر، کوچه سوم، پلاک ۱۲",
      },

      {
        id: 1002,
        orderDate: "2026-08-27T14:20:00",
        status: "Delivered",
        statusLabel: "تحویل داده شده",
        items: [
          {
            foodId: "chelo-kabab-koobideh",
            title: "چلو کباب کوبیده",
            quantity: 2,
            price: 320000,
          },
        ],
        totalPrice: 640000,
        address: "تهران، خیابان ولیعصر، کوچه سوم، پلاک ۱۲",
      },

      {
        id: 1003,
        orderDate: "2026-08-20T18:45:00",
        status: "Delivered",
        statusLabel: "تحویل داده شده",
        items: [
          {
            foodId: "fesanjan",
            title: "فسنجان",
            quantity: 1,
            price: 310000,
          },
          {
            foodId: "baghali-polo",
            title: "باقالی پلو",
            quantity: 1,
            price: 290000,
          },
        ],
        totalPrice: 600000,
        address: "تهران، خیابان ولیعصر، کوچه سوم، پلاک ۱۲",
      },
    ],

    addresses: [
      {
        id: 1,
        title: "آدرس منزل",
        receiver: "امیر محمدی",
        phone: "0912 123 4567",
        address: "تهران، خیابان ولیعصر، بالاتر از میدان ونک، کوچه سوم، پلاک ۱۲",
        postalCode: "1234567890",
        isDefault: true,
      },

      {
        id: 2,
        title: "آدرس محل کار",
        receiver: "امیر محمدی",
        phone: "0912 123 4567",
        address: "تهران، خیابان مطهری، خیابان سهروردی، پلاک ۴۵",
        postalCode: "9876543210",
        isDefault: false,
      },
    ],

    favorites: [
      {
        id: "zereshk-polo-morgh",
        title: "زرشک پلو با مرغ",
        description: "برنج ایرانی، مرغ زعفرانی و زرشک",
        price: 260000,
        image: "/images/foods/zereshk-polo-morgh.jpg",
      },

      {
        id: "ghorme-sabzi",
        title: "قورمه سبزی",
        description: "خورشت قورمه سبزی با گوشت گوسفندی",
        price: 280000,
        image: "/images/foods/ghorme-sabzi.jpg",
      },

      {
        id: "fesanjan",
        title: "فسنجان",
        description: "خورشت فسنجان با گردو و رب انار",
        price: 310000,
        image: "/images/foods/fesanjan.jpg",
      },
    ],
  },

  reducers: {
    setProfileTab: (state, action) => {
      state.activeTab = action.payload;
    },

    updateProfile: (state, action) => {
      state.info = {
        ...state.info,
        ...action.payload,
      };
    },
  },
});

export const { setProfileTab, updateProfile } = profileSlice.actions;

export const selectProfileTab = (state) => state.profile.activeTab;

export const selectProfileInfo = (state) => state.profile.info;

export const selectProfileOrders = (state) => state.profile.orders;

export const selectProfileAddresses = (state) => state.profile.addresses;

export const selectProfileFavorites = (state) => state.profile.favorites;

export default profileSlice.reducer;
