import { loginUser, registerUser } from "../model/user.js";

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

export { createuser, login };
