import api from "./api";

//GET  popularFoods
export async function getPopularFoods() {
  const response = await api.get("/popularFoods");

  return response.data;
}
