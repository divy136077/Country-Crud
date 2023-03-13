// Import only what we need from express
import { Router } from "express";
import { Validator } from "../../../validate";
import { UserController } from "./userController";
import { UserMiddleware } from "./userMiddleware";

import {
    UserModel, LoginModel,
    ForgotPasswordModel, ResetPasswordModel, ChangePasswordModel, UserStatusModel, UserDeleteModel

} from "./userModel";
import { Middleware } from "../../../middleware";
const Web3 = require('web3');
// Assign router to the express.Router() instance
const router: Router = Router();
const v: Validator = new Validator();
const userController = new UserController();
const userMiddleware = new UserMiddleware();
const middleware = new Middleware();

router.get("/demo", (req,res) => {   
    res.send("This is a test routing!");
});
router.get("/getusercount",userController.usercount);
router.get("/encrypt-records", userController.encryptUserData);
router.post('/adfslogin' ,userController.adfslogin); 
router.post("/", v.validate(UserModel), userMiddleware.checkEmailExists, userMiddleware.checkMobileNumberExists, userMiddleware.isPasswordValid, userController.signup);
router.post("/login", userController.login);
router.get("/verify", userController.verify);
router.post("/reset-password", v.validate(ResetPasswordModel), userController.resetPassword);
router.post("/forgot-password", v.validate(ForgotPasswordModel), userMiddleware.isEmailRegistered, userController.forgotPassword)
router.post("/change-password", v.validate(ChangePasswordModel), middleware.getUserAuthorized, userMiddleware.verifyOldPassword, userMiddleware.isPasswordValid, userController.updatePassword)
router.post("/search", middleware.getUserAuthorized, userController.getAll);
router.post("/toggle-status",  v.validate(UserStatusModel), middleware.getUserAuthorized, userController.toggleStatus);
router.post("/delete-many", v.validate(UserDeleteModel), middleware.getUserAuthorized, userController.deleteMany);
router.delete("/:id", middleware.getUserAuthorized, userMiddleware.IsValidId, userController.delete);
router.get("/:id", userMiddleware.IsValidId, userController.getOne);
router.put("/:id", middleware.getUserAuthorized, userMiddleware.IsValidId, userController.update);
router.post("/bulk-import", userController.bulkImport);
router.post("/get-import-data", userController.getDataFromImportTable);
router.post("/verify-otp", userController.verifyOtp);
router.post("/resend-otp", userController.resendOtp);
router.post("/get-import-data-adfs", userController.aduserimport);
router.post("/user-permission",userController.userpermission);
router.post("/user-details",userController.userdetails);


export const UserRoute: Router = router;