import Joi from "joi";

const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  profileUrl: Joi.string().uri().required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const updateUserSchema = Joi.object({
  email: Joi.string().email().required(),
  profileUrl: Joi.string().uri(),
  name: Joi.string().min(6),
  bio: Joi.string(),
}).or("profileUrl", "name", "bio");

const updatePassSchema = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().min(6).required(),
});

const updateInterestsSchema = Joi.object({
  email: Joi.string().email().required(),
  newInterests: Joi.array().items(Joi.string()),
});

const getInterestsSchema = Joi.object({
  email: Joi.string().email().required(),
});

const getFollowersRequestSchema = Joi.object({
  email: Joi.string().email().required(),
});

const getFollowersQuerySchema = Joi.object({
  page: Joi.number().positive(),
  limit: Joi.number().positive(),
});

export {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
  updatePassSchema,
  updateInterestsSchema,
  getInterestsSchema,
  getFollowersRequestSchema,
  getFollowersQuerySchema,
};
