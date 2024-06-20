import instance from './instance.js';

function signUp(data, success, fail) {
  instance.post('/user/signup', JSON.stringify(data)).then(success).catch(fail);
}

function login(data, success, fail) {
  instance.post('/user/login', JSON.stringify(data)).then(success).catch(fail);
}

function update(data, success, fail) {
  instance
    .patch('/user/update', JSON.stringify(data))
    .then(success)
    .catch(fail);
}

export { signUp, login, update };
