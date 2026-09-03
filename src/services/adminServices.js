import api from "./api";

//GET ADMIN STATS
export async function getAdminStats() {
  const response = await api.get("/adminStats");

  return response.data;
}
