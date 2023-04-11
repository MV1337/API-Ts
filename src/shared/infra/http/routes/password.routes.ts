import { ResetPassowordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPassowordUserController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router()

const sendForgotPasswordController = new SendForgotPasswordMailController()
const resetPassowordUserController = new ResetPassowordUserController()

passwordRoutes.post("/forgot", sendForgotPasswordController.handle)
passwordRoutes.post("/reset", resetPassowordUserController.handle)

export {passwordRoutes}