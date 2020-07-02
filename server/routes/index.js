const express = require("express");
const router = express.Router();
const RoomController = require("../controllers/RoomController")

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.get("/rooms", RoomController.findAll)
router.post("/rooms", RoomController.insertOne)
router.get("/rooms/:id", RoomController.findOneById)
router.put("/rooms/:id", RoomController.updateOneById)
router.delete("/rooms/:id", RoomController.deleteOneById)

module.exports = router;