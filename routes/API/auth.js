const express = require("express");
const router = express.Router();

//route GET api/
//@desc Test route
//@access Public
router.get("/", (req, res) => res.send(" auths route "));

module.exports = router;
