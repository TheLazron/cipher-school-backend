import { response } from "express";
import {
  fetchPaginatedFollowers,
  loginUser,
  registerUser,
  updatePassword,
  updateProfileDetails,
  updateUserInterests,
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

const updateIntersts = (req, res) => {
  const { email, newInterests } = req.body;
  updateUserInterests(email, [newInterests]).then((data) => {
    res.json({ ...data });
  });
};

const getFollowers = (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const email = req.body.email;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  fetchPaginatedFollowers(email, startIndex, endIndex, page, limit).then(
    (data) => {
      //   console.log("follower data", data);
      res.json(data);
    }
  );
};

export {
  createuser,
  login,
  updateUser,
  changePassword,
  updateIntersts,
  getFollowers,
};
