const {
  sendMessage,
  getAllMessages,
} = require("../controllers/messageController");

const routes = require("express").Router();

routes.post("/sendMessage", sendMessage);
routes.post("/getAllMessages", getAllMessages);

module.exports = routes;
