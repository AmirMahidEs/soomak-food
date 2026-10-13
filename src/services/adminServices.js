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

// POST CREATE NOTIF PHONE NUMBER
export async function createPhoneNumber(phoneNumber) {
  const response = await api.post("/notifications", {
    phoneNumber,
  });

  return response.data;
}

// POST CREATE PAYMENT INFO
export async function createPaymentInfo(cardNumber) {
  const response = await api.post("/paymentInfo", {
    ShomareKartBeKart: cardNumber,
  });

  return response.data;
}

//GET ALL COMMENTS
export async function getAllComments() {
  const response = await api.get("/comments");
  return response.data;
}

//PATCH COMMENT STATUS
export async function updateCommentStatus(commentId, newCommentStatus) {
  const response = await api.patch(`/comments/${commentId}`, {
    status: newCommentStatus,
  });
  return response.data;
}

//PATCH COMMENT REPLY
export async function updateCommentReply(
  commentId,
  newCommentReply,
  createReplyTime,
  updateReplyTime,
) {
  const response = await api.patch(`/comments/${commentId}`, {
    reply: newCommentReply,
    replyCreatedAt: createReplyTime,
    replyUpdatedAt: updateReplyTime,
  });
  return response.data;
}

//POST CREATE ORDER
export async function createOrder(orderData) {
  const response = await api.post("/orders", orderData);
  return response.data;
}

// =========================
// SITE CONTACTS
// =========================

// GET SITE CONTACTS
export async function getSiteContacts() {
  const response = await api.get("/siteContacts");
  return response.data;
}

// POST SITE CONTACT
export async function createSiteContact(siteContactData) {
  const response = await api.post("/siteContacts", siteContactData);
  return response.data;
}

// PATCH SITE CONTACT VALUE
export async function updateSiteContactValue(id, newContactValue) {
  const response = await api.patch(`/siteContacts/${id}`, {
    value: newContactValue,
  });
  return response.data;
}

// PUT SITE CONTACT
export async function updateSiteContact(id, newContactData) {
  const response = await api.put(`/siteContacts/${id}`, newContactData);
  return response.data;
}

// DELETE SITE CONTACT
export async function deleteSiteContact(id) {
  const response = await api.delete(`/siteContacts/${id}`);
  return response.data;
}

// =========================
// SOCIAL LINKS
// =========================

// GET SOCIAL LINKS
export async function getSocialLinks() {
  const response = await api.get("/socialLinks");
  return response.data;
}

// POST SOCIAL LINK
export async function createSocialLink(socialLinkData) {
  const response = await api.post("/socialLinks", socialLinkData);
  return response.data;
}

// PATCH SOCIAL LINK
export async function updateSocialLinkValue(id, newSocialLinkData) {
  const response = await api.patch(`/socialLinks/${id}`, newSocialLinkData);
  return response.data;
}

// PUT SOCIAL LINK
export async function updateSocialLink(id, newSocialLinkData) {
  const response = await api.put(`/socialLinks/${id}`, newSocialLinkData);
  return response.data;
}

// DELETE SOCIAL LINK
export async function deleteSocialLink(id) {
  const response = await api.delete(`/socialLinks/${id}`);
  return response.data;
}
