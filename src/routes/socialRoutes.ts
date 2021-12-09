import express from "express";
import controller from "../controllers/social";
import { checkJwt } from "../middleware/checkJwt";
const router = express.Router();

router.post("/signup", controller.createUser);
router.post("/login", controller.login);
router.get("/getuser", [checkJwt], controller.getLoggedinUser);

export = router;
