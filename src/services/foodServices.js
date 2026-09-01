import api from "./api";

//GET  popularFoods
export async function getPopularFoods() {
  const response = await api.get("/popularFoods");

  return response.data;
}

//GET foods
export async function getFoods() {
  const response = await api.get("/foods");

  return response.data;
}

//GET categories
export async function getCategories() {
  const response = await api.get("/categories");

  return response.data;
}

//GET foods by Id
export async function getFoodsById(id) {
  const response = await api.get(`/foods/${id}`);

  return response.data;
}
