import express from "express";
import settingController from "../controllers/settingController";
import userController from "../controllers/userController";
import roleController from "../controllers/roleController";
import { checkJwt } from "../middlewares/checkJwt";
const router = express.Router();

router.post("/login", userController.login);

router.get("/setting", [checkJwt], settingController.setting);

router.post("/users", [checkJwt], userController.getList);
router.post("/users/create", [checkJwt], userController.create);
router.get("/roles", [checkJwt], roleController.get);
export = router;
