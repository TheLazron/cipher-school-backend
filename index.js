import express from "express";
import cors from "cors";
import { connectMongoose } from "./utils/mongoose-instance.js";
const app = express();
import userRouter from "./routes/userRoutes.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send({ msg: "hello" });
});

app.use(userRouter);

connectMongoose(
  "mongodb+srv://admin:admin@cluster0.szu6rmx.mongodb.net/cipherschools"
).then(() => {
  app.listen(8080, () => {
    console.log("server started on port 3000");
  });
});
