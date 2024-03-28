import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import homeRouter from "./routes/home.routes.js";
import taskRouter from "./routes/task.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes declaration
app.use("/", homeRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

export { app };
