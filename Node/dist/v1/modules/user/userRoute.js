"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
// Import only what we need from express
const express_1 = require("express");
const validate_1 = require("../../../validate");
const userController_1 = require("./userController");
const userMiddleware_1 = require("./userMiddleware");
const userModel_1 = require("./userModel");
const middleware_1 = require("../../../middleware");
const Web3 = require('web3');
// Assign router to the express.Router() instance
const router = express_1.Router();
const v = new validate_1.Validator();
const userController = new userController_1.UserController();
const userMiddleware = new userMiddleware_1.UserMiddleware();
const middleware = new middleware_1.Middleware();
router.get("/demo", (req, res) => {
    res.send("This is a test routing!");
});
router.get("/getusercount", userController.usercount);
router.get("/encrypt-records", userController.encryptUserData);
router.post('/adfslogin', userController.adfslogin);
router.post("/", v.validate(userModel_1.UserModel), userMiddleware.checkEmailExists, userMiddleware.checkMobileNumberExists, userMiddleware.isPasswordValid, userController.signup);
router.post("/login", userController.login);
router.get("/verify", userController.verify);
router.post("/reset-password", v.validate(userModel_1.ResetPasswordModel), userController.resetPassword);
router.post("/forgot-password", v.validate(userModel_1.ForgotPasswordModel), userMiddleware.isEmailRegistered, userController.forgotPassword);
router.post("/change-password", v.validate(userModel_1.ChangePasswordModel), middleware.getUserAuthorized, userMiddleware.verifyOldPassword, userMiddleware.isPasswordValid, userController.updatePassword);
router.post("/search", middleware.getUserAuthorized, userController.getAll);
router.post("/toggle-status", v.validate(userModel_1.UserStatusModel), middleware.getUserAuthorized, userController.toggleStatus);
router.post("/delete-many", v.validate(userModel_1.UserDeleteModel), middleware.getUserAuthorized, userController.deleteMany);
router.delete("/:id", middleware.getUserAuthorized, userMiddleware.IsValidId, userController.delete);
router.get("/:id", userMiddleware.IsValidId, userController.getOne);
router.put("/:id", middleware.getUserAuthorized, userMiddleware.IsValidId, userController.update);
router.post("/bulk-import", userController.bulkImport);
router.post("/get-import-data", userController.getDataFromImportTable);
router.post("/verify-otp", userController.verifyOtp);
router.post("/resend-otp", userController.resendOtp);
router.post("/get-import-data-adfs", userController.aduserimport);
router.post("/user-permission", userController.userpermission);
router.post("/user-details", userController.userdetails);
router.post("/kb_email_approver", userController.kb_email_approver);
router.put("/confirm-password", userController.confirm_password);
exports.UserRoute = router;
//# sourceMappingURL=userRoute.js.map