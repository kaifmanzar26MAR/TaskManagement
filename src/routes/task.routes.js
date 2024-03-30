import { Router } from "express";
import { createTask, deleteTask, getAssignTask, updateTask } from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/createtask").post(verifyJWT,createTask);
router.route("/getassigntask").post(verifyJWT,getAssignTask);
router.route("/updatetask").post(verifyJWT, updateTask)
router.route("/deletetask").post(verifyJWT, deleteTask);

export default router;
