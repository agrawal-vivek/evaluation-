const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//registration
userRouter.post("/register", async (req, res) => {
  const { email, pass, location, age } = req.body;

  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      const user = new UserModel({ email, pass: hash, location, age });
      await user.save();
      res.status(200).send({ msg: "Registration has been done" });
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//login
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if(user){
        bcrypt.compare(pass,user.pass,(err,result)=>{
            if(result){
                res.status(200).send({"msg":"login successful","token":jwt.sign({"userID":user._id},masai)})
            }else{
                res.status(400).send({"msg":"Wrong Credential"})
            }
        })
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

userRouter.get("/details", async (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, "shhhhh", function (err, decoded) {
    // console.log(decoded.foo) // bar
    decoded
      ? res.status(200).send("User Details")
      : res
          .status(400)
          .send({ msg: "Login Required, cannot access the registered route" });
  });
});

userRouter.get("/movieData", async (req, res) => {
  const { token } = req.query;
  jwt.verify(token, "shhhhh", function (err, decoded) {
    // console.log(decoded.foo) // bar
    decoded
      ? res.status(200).send("Movie Data")
      : res
          .status(400)
          .send({ msg: "Login Required, cannot access the registered route" });
  });
});

module.exports = {
  userRouter,
};
