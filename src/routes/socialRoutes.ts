import express from "express";
import controllers from "../middleware/contollers";
import { checkJwt } from "../middleware/checkJwt";
const router = express.Router();

router.post("/signup", controllers.signUp);
router.post("/login", controllers.login);
router.get("/getuser", [checkJwt], controllers.getUser);

export = router;
