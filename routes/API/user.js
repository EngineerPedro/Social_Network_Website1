const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/user");

//route POST api/User
//@desc Register a User
//@access Public
router.post(
  "/",
  [
    check("fname", "fname is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a 6 digit password").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fname, lname, email, password } = req.body;

    try {
      //See if the user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists " }] });
      }
      //Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg-13",
        d: "mm"
      });

      user = new User({
        fname,
        lname,
        email,
        avatar,
        password
      });
      //encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtsecret"),
        { expiresIn: 6000000000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      //res.send("User Registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Sever error");
    }
  }
);

module.exports = router;
