const express = require("express");
const router = express.Router();
const Auth = require("../models/auth");
const authLogic = require("../business-logic/auth-logic.js");
const jwt = require("jsonwebtoken");
const jwtLogic = require("../helpers/jwt");

// POST // http://localhost:3000/api/auth/check-user
router.post("/check-user", async (request, response) => {
    const info = request.body;
    const id = info._id
    const userName = info.username_email
    try {
      const getUser = await authLogic.checkUser(id, userName);
      console.log(JSON.stringify(getUser));

      response.json(getUser);
    } catch (error) {
      response.status(500).send(error.message);
    }
  });

  // POST http://localhost:3000/api/auth/register

router.post("/register", async (request, response) => {
  const auth = new Auth(request.body);

  try {
    /// --------------------

    auth.role = "Customer";
    auth.visitCounter = 0;
    const newUser = await authLogic.addUser(auth);
    //save jwt token
    const jwtToken = jwt.sign({ auth: newUser }, "secretkey");
    newUser.password = null;
    // delete newUser.password
    console.log(newUser);
    response.json({ auth: newUser, jwtToken });
  } catch (error) {
    response.status(500).send(error);
  }
});

// POST http://localhost:3000/api/auth/login
router.post("/login", async (request, response) => {
  const info = request.body;
  try {
    const getUser = await authLogic.login(info);
    console.log(JSON.stringify(getUser));
    getUser[0].password = null;
    const user = getUser[0];
    const jwtToken = jwt.sign({ user }, "secretkey");
    response.json({ user, jwtToken });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

module.exports = router;
