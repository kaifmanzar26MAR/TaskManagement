import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";

const createTask = asyncHandler(async (req, res) => {
  const { task_title, task_description, task_team, task_priroty } =
    req.body;
  const user = req.user;

  if (
    [ task_title, task_description, task_team, task_priroty].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new ApiError(500, "All Fields are required");
  }

  

  const taskInstance = await Task.create({
    assign_by: user._id,
    assign_by_name: user.fullName,
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

const getAssignTask = asyncHandler(async (req, res) => {
  const {task_status} = req.body;
  const AssignTask = await Task.find({ task_status });

  if (!AssignTask) {
    throw new ApiError(500, "Error in Finding Assign Tasks!!!");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, AssignTask, "Got Assign Task Successfully"));
});



const updateTask = asyncHandler(async (req, res) => {
  const {assign_by, task_id, task_priroty, task_status}=req.body;
  const user=req.user;

  if([assign_by, task_id, task_priroty, task_status].some(field=>field.trim()==='')){
    throw new ApiError(500, "Couldn't get data properly!!");
  }

  if(assign_by != user._id){
    throw new ApiError(500, "You are not allow tho edit this task!!");
  }

  const task= await Task.findOne({_id:task_id});

  if(!task){
    throw new ApiError(500, "Couldn't get Task!!");
  }

  task.task_priroty=task_priroty;
  task.task_status= task_status;

  await task.save();

  return res.status(201).json(new ApiResponse(200, task, "Task Updated Successfully"))
});


const deleteTask= asyncHandler(async(req,res)=>{
  const {task_id,assign_by} = req.body;
  const user = req.user;

  if([task_id].some(field=>field.trim()==='')) throw new ApiError(500, "Not Getting Task Id");

  const task= await Task.findOne({_id:task_id});

  if(!task) throw new ApiError(500, "Couldn't find task!!")

  if(assign_by != user._id){
    throw new ApiError(500, "You are not allow to Delete this Task!!")
  }

  const deleteResponse= await Task.deleteOne({_id:task_id});

  if(!deleteResponse){
    throw new ApiError(500, "Something Went worng in deleteing task!!!")
  }

  return res.status(201).json(new ApiResponse(200, deleteResponse, "Task deleted successfully!!"));

})

export { createTask, getAssignTask, updateTask, deleteTask };
