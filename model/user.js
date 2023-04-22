import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { comparePasswords, hashPassword } from "../utils/bcrypt.js";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: {
    type: String,
    select: false,
  },
  profileUrl: String,
  interests: {
    type: [String],
    default: [],
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
});

const userModel = mongoose.model("User", userSchema);

const registerUser = async ({ name, email, password, profileUrl }) => {
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return { error: "User already exists" };
    }

    const hashedPass = await hashPassword(password);
    const newUser = new userModel({
      name,
      email,
      password: hashedPass,
      profileUrl,
      interests: [],
      followers: [],
    });

    await newUser.save();
    return { message: "User saved successfully" };
  } catch (err) {
    console.log("err", err);
    return { err: "An error occurred while processing your request" };
  }
};

const loginUser = async ({ email, password }) => {
  try {
    // Check if user with given email exists
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return { error: "No User Found" };
    }

    // Check if password is correct
    const isMatch = await comparePasswords(password, user.password);

    if (!isMatch) {
      return { error: "Invalid password" };
    }

    return { message: "logged In Successfully" };
  } catch (error) {
    console.log("err", error);
    return { err: "An error occurred while processing your request" };
  }
};

const updateProfileDetails = async (email, updatedFields) => {
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { ...updatedFields },
      { new: true }
    );

    if (!updatedUser) {
      return { error: "Please provide a valid email address" };
    }
    console.log(updatedUser);
    return { message: "Updates were made successfully" };
  } catch (err) {
    console.log("err", err);
    return { err: "An error occurred while processing your request" };
  }
};

const updatePassword = async (email, newPassword) => {
  try {
    console.log("newPass", newPassword);
    const hashedPass = await hashPassword(newPassword);

    const user = await userModel.findOneAndUpdate(
      { email },
      { password: hashedPass }
    );

    if (!user) {
      return { error: "Please provide a valid email address" };
    }

    return { message: "Password changed successfully" };
  } catch (err) {
    console.log("err", err);
    return { err: "An error occurred while processing your request" };
  }
};

const updateUserInterests = async (email, newInterests) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { email },
      { $set: { interests: newInterests } },
      { new: true }
    );

    if (!user) {
      return { error: "No user find" };
    }

    return { message: "Added a new interest", interests: user.interests };
  } catch (err) {
    console.log("err", err);
    return { err: "An error occurred while processing your request" };
  }
};
const fetchPaginatedFollowers = async (
  email,
  startIndex,
  endIndex,
  page,
  limit
) => {
  try {
    const response = {};
    const user = await userModel.findOne({ email });
    const count = user.followers.length;

    if (startIndex > 0) {
      response.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    if (endIndex <= count - 1) {
      console.log("inside");
      response.nextPage = {
        page: page + 1,
        limit: limit,
      };
    }

    const followers = await userModel
      .findOne({ email: email })
      .populate({
        path: "followers",
        select: "name profileUrl",
        options: {
          limit: limit,
          skip: startIndex,
        },
      })
      .select("followers");
    response.followers = followers.followers;
    return response;
  } catch (err) {
    console.log("err", err);
    return { err: "An error occurred while processing your request" };
  }
};

// const fetchPaginatedFollowers = async (
//   email,
//   startIndex,
//   endIndex,
//   page,
//   limit
// ) => {
//   const response = {};

//   userModel.countDocuments().then((count) => {
//     if (endIndex < count) {
//       response.nextPage = {
//         page: page + 1,
//         limit: limit,
//       };
//     }
//   });
//   if (startIndex > 0) {
//     response.previous = {
//       page: page - 1,
//       limit: limit,
//     };
//   }

//   try {
//     const followers = await userModel.findOne({ email: email }).populate({
//       path: "followers",
//       options: {
//         limit: limit,
//         skip: startIndex,
//       },
//     });

//     response.followers = followers.followers;

//     return response;
//   } catch (err) {
//     console.log("err", err);
//     return { err: "An error occurred while processing your request" };
//   }
// };

export {
  registerUser,
  loginUser,
  updateProfileDetails,
  updatePassword,
  updateUserInterests,
  fetchPaginatedFollowers,
};
