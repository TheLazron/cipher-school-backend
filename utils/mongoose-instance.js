import mongoose from "mongoose";

const connectMongoose = (url) => {
  return mongoose.connect(url);
};

export { connectMongoose };
