import api from "./api";

//GET ADMIN STATS
export async function getAdminStats() {
  const response = await api.get("/adminStats");

  return response.data;
}

//GET LAST ORDERS
export async function getLastOrders() {
  const response = await api.get("/lastOrders");

  return response.data;
}

// GET ADMIN FOODS
export async function getAdminFoods() {
  const response = await api.get("/adminFoods");

  return response.data;
}
