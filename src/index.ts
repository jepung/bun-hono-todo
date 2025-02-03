import { Hono } from "hono";
import todosRoute from "./routes/todos";

const app = new Hono().basePath("/api");

app.route("/todos", todosRoute);

export default app;
