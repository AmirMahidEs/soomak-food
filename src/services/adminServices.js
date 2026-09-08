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

//GET ALL OREDER
export async function getAllOrders() {
  const response = await api.get("/orders");
  return response.data;
}

//PATCH UPDATE ORDER
export const updateOrderStatus = async (orderId, status) => {
  const response = await api.patch(`/orders/${orderId}`, {
    status,
  });

  return response.data;
};

//GET ALL USERS
export async function getAllUsers() {
  const response = await api.get("/users");
  return response.data;
}
