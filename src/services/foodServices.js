import api from "./api";

// GET popular foods
export async function getPopularFoods() {
  const response = await api.get("/popularFoods");
  return response.data;
}

// GET all foods
export async function getFoods() {
  const response = await api.get("/foods");
  return response.data;
}

// GET food by ID
export async function getFoodsById(id) {
  const response = await api.get(`/foods/${id}`);
  return response.data;
}

// POST create food
export async function createFood(foodData) {
  const response = await api.post("/foods", foodData);
  return response.data;
}

// PUT update food
export async function updateFood(foodId, foodData) {
  const response = await api.put(`/foods/${foodId}`, foodData);
  return response.data;
}

// DELETE food
export async function deleteFood(foodId) {
  const response = await api.delete(`/foods/${foodId}`);
  return response.data;
}

// GET categories
export async function getCategories() {
  const response = await api.get("/categories");
  return response.data;
}

// PUT UPDATE CATEGORIES
export async function updateCategories(categoryId, categoryData) {
  const response = await api.put(`/categories/${categoryId}`, categoryData);
  return response.data;
}

// POST CREATE CATEGORY
export async function createCategory(categoryData) {
  const response = await api.post("/categories", categoryData);
  return response.data;
}

// DELETE DELETE CATEGORY
export async function deleteCategory(categoryId) {
  const response = await api.delete(`/categories/${categoryId}`);
  return response.data;
}

// GET food comments
export async function getFoodsComments(id) {
  const response = await api.get(`/comments?foodId=${encodeURIComponent(id)}`);
  return response.data;
}
