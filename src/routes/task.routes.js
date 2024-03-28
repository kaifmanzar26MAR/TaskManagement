import { Router } from "express";
import { createTask } from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/createtask").post(verifyJWT,createTask);

export default router;
