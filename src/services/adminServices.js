import api from "./api";

// GET ADMIN STATS
export async function getAdminStats() {
  const response = await api.get("/adminStats");
  return response.data;
}

// GET LAST ORDERS
export async function getLastOrders() {
  const response = await api.get("/lastOrders");
  return response.data;
}

// GET ALL ORDERS
export async function getAllOrders() {
  const response = await api.get("/orders");
  return response.data;
}

// PATCH UPDATE ORDER
export const updateOrderStatus = async (orderId, status) => {
  const response = await api.patch(`/orders/${orderId}`, {
    status,
  });

  return response.data;
};

// GET ALL USERS
export async function getAllUsers() {
  const response = await api.get("/users");
  return response.data;
}

// GET NOTIF PHONE NUMBER
export async function getPhoneNumber() {
  const response = await api.get("/notifications");
  return response.data;
}

// PATCH NOTIF PHONE NUMBER
export async function updatePhoneNumber(notifId, newPhone) {
  const response = await api.patch(`/notifications/${notifId}`, {
    phoneNumber: newPhone,
  });

  return response.data;
}

// GET PAYMENT INFO
export async function getPaymentInfo() {
  const response = await api.get("/paymentInfo");
  return response.data;
}

// PATCH PAYMENT INFO
export async function updatePaymentInfo(paymentId, newCardNumber) {
  const response = await api.patch(`/paymentInfo/${paymentId}`, {
    ShomareKartBeKart: newCardNumber,
  });

  return response.data;
}
