import instance from "./instance.js";

function createPlanner(data, success, fail) {
  instance.post(`/planner`, JSON.stringify(data)).then(success).catch(fail);
}

function getPlanners(success, fail) {
  instance.get(`/planner`).then(success).catch(fail);
}

function getPlanner(id, success, fail) {
  instance.get(`/planner/${id}`).then(success).catch(fail);
}

function getPlannersByUserId(id, success, fail) {
  instance.get(`/planner/planners/${id}`).then(success).catch(fail);
}

function getPlannerRandom(success, fail) {
  instance.get(`/planner/random`).then(success).catch(fail);
}

export { createPlanner, getPlanners, getPlanner, getPlannersByUserId, getPlannerRandom };
