import { apiReference } from "@scalar/hono-api-reference";
import todosController from "./controllers/todos";
import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono().basePath("/api");

app.route("/todos", todosController);

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Todos API Docs",
  },
});

app.get(
  "/docs",
  apiReference({
    spec: {
      url: "/api/doc",
    },
  })
);

export default app;
