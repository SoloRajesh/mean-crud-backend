const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userModel = require("../src/customer/userModel");
const customerModel = require("../src/customer/customerModel");
const auth = require("../middleware/auth");

//register for login
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedpassword = await bcrypt.hash(password, 8);
    const user = new userModel({ username, password: hashedpassword });
    await user.save();
    res.status(201).send({
      status: true,
      message: "User created....",
    });
    // if(user.username == user){
    //     res.status(400).send({
    //         message: 'User Already Exist....'
    //     })
    // }
    // return token;
  } catch (error) {
    res.status(400).send(error);
  }
});

//login
router.post("/login", async (req, res) => {
  const { username } = req.body;
  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found...");
    }
    const psd = await bcrypt.compare(req.body.password, user.password);
    if (!psd) {
      return res.status(400).send("Password Invalid...");
    }
    const token = jwt.sign( user.username , "rajesh");
    const {  password, ...userDetails } = user._doc 
    res.status(201).json({
      status: true,
      message: "User successfully login....",
      data: { ...userDetails, token },
    });
  } catch (error) {
    console.log(error, 'error')
   return res.status(400).send(error);
  }
});

// POST method
router.post("/customer/create", async (req, res) => {
  const customer = new customerModel(req.body);
  try {
    await customer.save();
    res.status(201).send({
      status: true,
      message: "Customer created....",
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET method
router.get("/customers", async (req, res) => {
  try {
    const customers = await customerModel.find({});
    if (!customers) {
      return res.status(400).send(error);
    }
    return res.status(201).send(customers);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET method find
router.get("/customers/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const customers = await customerModel.findById(_id);

    res.status(201).send({
      status: true,
      message: "Customer finded....",
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Patch method
router.put("/customers/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const body = req.body;
    const customerUpdate = await customerModel.findByIdAndUpdate(_id, body, {
      new: true,
    });

    if (!customerUpdate) {
      return res.status(400).send(error);
    }
    return res.status(201).send({
      status: true,
      message: "Customer updated....",
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete method
router.delete("/customers/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const customerDelete = await customerModel.findByIdAndDelete(_id);

    if (!customerDelete) {
      return res.status(400).send(error);
    }
    return res.status(201).send({
      status: true,
      message: "Customer Deleted....",
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
