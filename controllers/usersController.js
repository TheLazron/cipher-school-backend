import { response } from "express";
import {
  fetchPaginatedFollowers,
  loginUser,
  registerUser,
  updatePassword,
  updateProfileDetails,
  updateUserInterests,
} from "../model/user.js";
import {
  getFollowersQuerySchema,
  getFollowersRequestSchema,
  loginUserSchema,
  registerUserSchema,
  updateInterestsSchema,
  updatePassSchema,
  updateUserSchema,
} from "../utils/joi-schemas.js";

const createuser = (req, res) => {
  const user = req.body;
  const { error } = registerUserSchema.validate(user);
  if (!error) {
    registerUser(user).then((data) => {
      console.log(data);
      res.json(data);
    });
    console.log(user);
  } else {
    res.json({ error: error.details });
  }
};

const login = (req, res) => {
  const userCreds = req.body;
  const { error } = loginUserSchema.validate(userCreds);
  if (!error) {
    loginUser(userCreds).then((data) => {
      console.log(userCreds);
      res.json(data);
    });
  } else {
    res.json({ error: error.details });
  }
};

const updateUser = (req, res) => {
  const body = req.body;
  const { error } = updateUserSchema.validate(body);
  if (!error) {
    const { email, ...userDetails } = body;
    //   const email = res.email;

    updateProfileDetails(email, userDetails).then((data) => {
      console.log(userDetails);
      res.json(data);
    });
  } else {
    res.json({ error: error.details });
  }
};

const changePassword = (req, res) => {
  const body = req.body;
  const { error } = updatePassSchema.validate(body);
  if (!error) {
    const { email, newPassword } = body;
    updatePassword(email, newPassword).then((data) => {
      res.json(data);
    });
  } else {
    res.json({ error: error.details });
  }
};

const updateIntersts = (req, res) => {
  const body = req.body;
  const { error } = updateInterestsSchema.validate(body);
  if (!error) {
    const { email, newInterests } = req.body;
    updateUserInterests(email, [newInterests]).then((data) => {
      res.json({ ...data });
    });
  } else {
    res.json({ error: error.details });
  }
};

const getFollowers = (req, res) => {
  const queries = req.query;
  {
    const { error } = getFollowersQuerySchema.validate(queries);
    if (error) {
      res.json({ error: error.details });
      return;
    }
  }
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const body = req.body;
  const { error } = getFollowersRequestSchema.validate(body);
  if (!error) {
    const email = body.email;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    fetchPaginatedFollowers(email, startIndex, endIndex, page, limit).then(
      (data) => {
        //   console.log("follower data", data);
        res.json(data);
      }
    );
  }
  if (error) {
    res.json({ error: error.details });
  }
};

export {
  createuser,
  login,
  updateUser,
  changePassword,
  updateIntersts,
  getFollowers,
};
