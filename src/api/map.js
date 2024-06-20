import instance from "./instance.js";

function search(data, success, fail) {
  instance.post(`/attraction`, JSON.stringify(data)).then(success).catch(fail);
}

function selectAttraction(id, success, fail) {
  instance.get(`/attraction/${id}`).then(success).catch(fail);
}

function getReview(id, success, fail) {
  instance.get(`/attraction/reviews/${id}`).then(success).catch(fail);
}

function createReview(data, success, fail) {
  instance.post(`/attraction/reviews`, JSON.stringify(data)).then(success).catch(fail);
}

function deleteReview(data, success, fail) {
  instance.delete(`/attraction/reviews/${data}`).then(success).catch(fail);
}

function getReviews(success, fail) {
  instance.get(`/attraction/reviews`).then(success).catch(fail);
}

function getReviewByUserId(id, success, fail) {
  instance.get(`/attraction/myReview/${id}`).then(success).catch(fail);
}

function getHotLocal(success, fail) {
  instance.get(`/attraction/hotLocal`).then(success).catch(fail);
}

export { search, selectAttraction, getReview, createReview, deleteReview, getReviews, getReviewByUserId, getHotLocal };
