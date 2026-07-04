import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//basic configuration

//read json data sent by the client
app.use(express.json({ limit: "16kb" }));

//for encoded url and decides how complex cobject can be
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//images part should be pucblicly viewable
app.use(express.static("public"));

app.use(cookieParser());

//cors configuration allows which frontend website are aloowed to talk to my backend
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true, //allow cookies/auth info
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);

// import the routes
import healthCheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import projectRouter from "./routes/projects.routes.js";
import taskRouter from "./routes/task.routes.js";
import noteRouter from "./routes/note.routes.js";

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/notes", noteRouter);

app.get("/", (req, res) => {
  res.send("Welcome to baseCamp");
});

export default app;
