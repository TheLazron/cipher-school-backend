import { registerUser } from "../model/user.js";

const createuser = (req, res) => {
  const user = req.body;
  registerUser(user).then((data) => {
    console.log(data);
    res.json(data);
  });
  console.log(user);
};

export { createuser };
