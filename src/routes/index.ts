import express from "express";
import settingController from "../controllers/settingController";
import * as roleController from "../controllers/roleController";
import * as userController from "../controllers/userController";
import * as imageController from "../controllers/imageController";
// import * as userRoleController from "../controllers/userRoleController";
import * as authController from "../controllers/authController";
import * as canvaController from "../controllers/canvaController";
import { checkJwt } from "../middlewares/checkJwt";
const router = express.Router();

router.get("/setting", [checkJwt], settingController.setting);
router.get("/profile/me", [checkJwt], userController.getProfile);

router.post("/users/create", [checkJwt], userController.createUser);
router.post("/users", [checkJwt], userController.getList);
router.post("/users/delete", [checkJwt], userController.softDelete);
router.post("/login", userController.login);

router.post("/auth/login", authController.login);
router.get("/roles", [checkJwt], roleController.get);
// router.post("/roles/create", roleController.createRole);//hidden
// router.post("/user-role/create/:id", userRoleController.createUserRole);//hidden

router.get("/images", [checkJwt], imageController.getList);
router.post("/images", [checkJwt], imageController.createImage);
router.put("/images/:id/restore", [checkJwt], imageController.restore);
router.delete("/images/:id", [checkJwt], imageController.softDelete);

router.get("/images/:id/:tag", imageController.getImageByIdAndTag);
router.get("/images/:id", imageController.getImageById);
router.post("/images/:id/:tag", imageController.createImageByIdAndTag);

router.post("/publish/resources/get", canvaController.get);
router.post("/publish/resources/find", canvaController.find);
router.post("/publish/resources/upload", canvaController.upload);

export = router;
