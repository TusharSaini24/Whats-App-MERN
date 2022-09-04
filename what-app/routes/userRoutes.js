const router = require("express").Router();

const {
  login,
  getAllUsers,
  //   getSearchContact,
} = require("../controllers/usersController");

router.post("/login", login);
router.get("/allusers/:id", getAllUsers);
// router.post("/getSearchContact", getSearchContact);

module.exports = router;
