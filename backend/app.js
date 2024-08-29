import express from "express";
import cors from "cors";
import cookieParser  from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}));

app.use(express.json({
    limit: "16kb"
}));
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));
app.use(express.static("public"));

app.use(cookieParser());

// import routes
import user_router from "./routes/user_routes.js";
import event_router from "./routes/event_routes.js";
import project_router from "./routes/project_routes.js";
import donar_router from "./routes/donar_routes.js"
// declare routes

app.use("/users", user_router);
app.use("/projects", project_router);
app.use("/events", event_router);
app.use("/donates",donar_router);

export { app };