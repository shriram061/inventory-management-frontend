import axios from "axios";
const url = "http://localhost:9876";

class UserService {
  saveUser(user) {
    return axios.post(url + "/register", user);
  }
  // saveUser(user) {
  //   return fetch(url + "/register", {
  //     method: "POST",
  //     body: JSON.stringify(user),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // }
  
  getUserByName(username) {
    return axios.get(url + "/user/getusername?name=" + username);
  }


  // getUserByName(username) {
  //   return fetch(url + "/auth/user/getusername?name=" + username)
  //     .then(response => response.json());
  // }
  

  authenticateUser(user) {
    return axios.post(url + "/authenticate", user);
  }


  // authenticateUser(user) {
  //   return fetch(url + "/authenticate", {
  //     method: "POST",
  //     body: JSON.stringify(user),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // }
  
//return axios.post(url+"validate",user);
  validateUser(token) {
    

    return axios({
      method: "post", //you can set what request you want to be

      url: url + "/validate",

      headers: {
        Authorization: token,
      },
    });
  }
}


// validateUser(token) {
//   return fetch(url + "/validate", {
//     method: "POST",
//     headers: {
//       Authorization: token,
//     },
//   });
// }



// UserService.js




export default new UserService();
