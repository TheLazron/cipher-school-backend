import {
  loginUser,
  registerUser,
  updatePassword,
  updateProfileDetails,
} from "../model/user.js";

const createuser = (req, res) => {
  const user = req.body;
  registerUser(user).then((data) => {
    console.log(data);
    res.json(data);
  });
  console.log(user);
};

const login = (req, res) => {
  const userCreds = req.body;

  loginUser(userCreds).then((data) => {
    console.log(userCreds);
    res.json(data);
  });
};

const updateUser = (req, res) => {
  const { email, ...userDetails } = req.body;
  //   const email = res.email;

  updateProfileDetails(email, userDetails).then((data) => {
    console.log(userDetails);
    res.json(data);
  });
};

const changePassword = (req, res) => {
  const { email, newPassword } = req.body;
  updatePassword(email, newPassword).then((data) => {
    res.json(data);
  });
};

export { createuser, login, updateUser, changePassword };
