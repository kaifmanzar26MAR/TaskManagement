import { Router } from "express";
import { createTask, getAssignTask } from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/createtask").post(verifyJWT,createTask);
router.route("/getassigntask").get(verifyJWT,getAssignTask);

export default router;
