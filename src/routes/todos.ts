import { zValidator } from "@hono/zod-validator";
import { addUpdateTodoMiddleware } from "../middleware/todos";
import {
  addTodoRequestSchema,
  addTodoResponseSchema,
  FieldErrorSchema,
  TodoSchema,
} from "../schemas/todos";
import { createRoute, z } from "@hono/zod-openapi";

export const todosRoute_getTodos = createRoute({
  summary: "Get todos",
  tags: ["Todos"],
  description: "Get list of all todos",
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "success",
            }),
            data: TodoSchema.array(),
          }),
        },
      },
      description: "success",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "internal server error",
            }),
          }),
        },
      },
      description: "internal server error",
    },
  },
});

export const todosRoute_addTodo = createRoute({
  summary: "Add todo",
  tags: ["Todos"],
  description: "Adding new todo",
  method: "post",
  path: "/",
  middleware: addUpdateTodoMiddleware,
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: addTodoRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: addTodoResponseSchema,
        },
      },
      description: "success",
    },
    400: {
      content: {
        "application/json": {
          schema: FieldErrorSchema.array(),
        },
      },
      description: "bad request",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "internal server error",
            }),
          }),
        },
      },
      description: "internal server error",
    },
  },
});

export const todosRoute_getTodoById = createRoute({
  summary: "Get todo by id",
  tags: ["Todos"],
  method: "get",
  path: "/:id",
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "success",
            }),
            data: TodoSchema,
          }),
        },
      },
      description: "succcess",
    },
    404: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "not found",
            }),
          }),
        },
      },
      description: "not found",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "internal server error",
            }),
          }),
        },
      },
      description: "internal server error",
    },
  },
});

export const todosRoute_updateTodo = createRoute({
  summary: "Update todo",
  tags: ["Todos"],
  method: "patch",
  path: "/:id",
  middleware: addUpdateTodoMiddleware,
  request: {
    params: z.object({
      id: z.string(),
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            todo: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "success",
            }),
          }),
        },
      },
      description: "success",
    },
    400: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "bad request",
            }),
            errors: FieldErrorSchema.array(),
          }),
        },
      },
      description: "bad request",
    },
    404: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "not found",
            }),
          }),
        },
      },
      description: "not found",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "internal server error",
            }),
          }),
        },
      },
      description: "internal server error",
    },
  },
});

export const todosRoute_deleteTodo = createRoute({
  summary: "Delete todo",
  tags: ["Todos"],
  method: "delete",
  path: "/:id",
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "success",
            }),
          }),
        },
      },
      description: "success",
    },
    404: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "not found",
            }),
          }),
        },
      },
      description: "not found",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "internal server error",
            }),
          }),
        },
      },
      description: "internal server error",
    },
  },
});
