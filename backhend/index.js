const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./route/user.routes");
const{postRouter}=require("./route/post.routes")
const{auth}=require("./middleware/auth.middleware")
require("dotenv").config()
const cors=require("cors")

const app = express();

app.use(express.json());
app.use(cors())
app.use("/users", userRouter);

app.use(auth)

app.use("/posts",postRouter)


app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Not Connected to DB");
    console.log(error.message);
  }

  console.log(`Server is running at ${process.env.port}`);
});
