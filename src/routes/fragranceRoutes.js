const express = require("express");
const router = express.Router();
const fragranceController = require("../controllers/fragranceController.js");

router.post("/", fragranceController.createFragrance);

router.get("/", fragranceController.getAllFragrances);

router.get("/:id", fragranceController.getFragranceById);

router.put("/:id", fragranceController.updateFragrance);

router.delete("/:id", fragranceController.deleteFragrance);

module.exports = router;
