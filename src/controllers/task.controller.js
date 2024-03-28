import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";

const createTask = asyncHandler(async (req, res) => {
  const { assign_to, task_title, task_description, task_team, task_priroty } =
    req.body;
  const user = req.user;

console.log(user);
console.log(assign_to, task_title, task_description, task_team, task_priroty)
  if (
    [assign_to, task_title, task_description, task_team, task_priroty].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new ApiError(500, "All Fields are required");
  }

  const assign_to_user = await User.findOne({ _id: assign_to });

  if (!assign_to_user) {
    throw new ApiError(500, "Assigned user not Found!!");
  }

  const taskInstance = await Task.create({
    assign_by: user._id,
    assign_to,
    assign_to_name: assign_to_user.fullName,
    task_title,
    task_team,
    task_description,
    task_priroty,
  });

  if (!taskInstance) {
    throw new ApiError(500, "Something went wrong in creating of task!!!");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, taskInstance, "Task Created Successfully!!"));
});

export { createTask };
