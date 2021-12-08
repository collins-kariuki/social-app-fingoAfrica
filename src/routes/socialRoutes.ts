import express from "express";
import controller from "../controllers/social";
const router = express.Router();

router.post("/social", controller.createUser);
router.get("/social", controller.getLoggedinUser);

export = router;
