const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

//signup
router
  .route("/signup")
  .get(userController.usersignup)
  .post(wrapAsync(userController.userpost));

//login
router
  .route("/login")
  .get(userController.userlogin)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.postlogin
  );

//logout
router.get("/logout", userController.userLogout);

module.exports = router;
