import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router()

const sendForgotPasswordController = new SendForgotPasswordMailController()

passwordRoutes.post("/forgot", sendForgotPasswordController.handle)

export {passwordRoutes}