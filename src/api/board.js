import instance from './instance.js';

function getBoards(success, fail) {
  instance.get(`/service`).then(success).catch(fail);
}

function getBoard(id, success, fail) {
  instance.get(`/service/${id}`).then(success).catch(fail);
}

function createBoard(data, success, fail) {
  instance.post(`/service`, JSON.stringify(data)).then(success).catch(fail);
}

function deleteBoard(id, success, fail) {
  instance.delete(`/service/${id}`).then(success).catch(fail);
}

function updateBoard(id, data, success, fail) {
  instance.patch(`/service/${id}`, JSON.stringify(data)).then(success).catch(fail);
}

export { getBoards, getBoard, deleteBoard, createBoard, updateBoard };
