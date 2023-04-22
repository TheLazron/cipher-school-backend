import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profileUrl: String,
});

const userModel = mongoose.model("User", userSchema);

const registerUser = async ({ name, email, password, profileUrl }) => {
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return { error: "User already exists" };
    }

    const newUser = new userModel({
      name,
      email,
      password,
      profileUrl,
    });

    await newUser.save();
    return { message: "User saved successfully" };
  } catch (err) {
    throw new Error(error.message);
  }
};

const loginUser = async (email, password) => {
  try {
    // Check if user with given email exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return { error: "No User Found" };
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return { error: "Invalid password" };
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { registerUser, loginUser };
