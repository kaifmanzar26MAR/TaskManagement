import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    assign_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // assign_to: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    assign_by_name:{
      type:String,
      required:true,
    },
    task_title: {
      type: String,
      required: true,
    },
    task_description: {
      type: String,
      required: true,
    },
    task_team:{
      type:String,
      required:true,
    },
    task_priroty: {
      type: String,
      required: true,
    },
    task_status:{
        type:String,
        required:true,
        default:"Assign"
    }
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);
