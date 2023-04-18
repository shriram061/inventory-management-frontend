function getToken() {
  return localStorage.getItem("token");
}

function setToken(token) {
  localStorage.setItem("token", `Bearer ${token}`);
}

function getId() {
  return localStorage.getItem("userId");
}

function setId(id) {
  localStorage.setItem("userId", id);
}

function removeId() {
  localStorage.removeItem("userId");
}

function removeToken() {
  localStorage.removeItem("token");
}

function getUserName() {
  return localStorage.getItem("user");
}

function setUserName(user) {
  console.log(user);

  localStorage.setItem("user", `${user}`);
}

function removeUserName() {
  localStorage.removeItem("user");
}

export const AuthFunctions = {
  getToken,
  setToken,
  removeToken,
  getUserName,
  setUserName,
  removeUserName,
  setId,
  getId,
  removeId,
};
