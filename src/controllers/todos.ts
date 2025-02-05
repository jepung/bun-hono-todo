import { OpenAPIHono } from "@hono/zod-openapi";
import {
  todosRoute_addTodo,
  todosRoute_deleteTodo,
  todosRoute_getTodoById,
  todosRoute_getTodos,
  todosRoute_updateTodo,
} from "../routes/todos";
import DUMMY_TODO from "../models/todos";

const app = new OpenAPIHono()
  .openapi(todosRoute_getTodos, (c) => {
    try {
      return c.json(
        {
          message: "success",
          data: DUMMY_TODO,
          length: DUMMY_TODO.length,
        },
        200
      );
    } catch (e) {
      return c.json(
        {
          message: "internal server error",
        },
        500
      );
    }
  })
  .openapi(todosRoute_addTodo, (c) => {
    try {
      const body = c.req.valid("json");
      const newData = {
        id: crypto.randomUUID().toString(),
        todo: body.todo,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      DUMMY_TODO.push(newData);
      return c.json(
        {
          message: "success",
          data: newData,
        },
        200
      );
    } catch (e) {
      return c.json(
        {
          message: "internal server error",
        },
        500
      );
    }
  })
  .openapi(todosRoute_getTodoById, (c) => {
    try {
      const todo = DUMMY_TODO.find((t) => t.id === c.req.param("id"));
      if (!todo) {
        return c.json(
          {
            message: "not found",
          },
          404
        );
      }
      return c.json(
        {
          message: "success",
          data: todo,
        },
        200
      );
    } catch (e) {
      return c.json(
        {
          message: "internal server error",
        },
        500
      );
    }
  })
  .openapi(todosRoute_updateTodo, (c) => {
    try {
      const id = c.req.param("id");
      const body = c.req.valid("json");
      const todoIndex = DUMMY_TODO.findIndex((t) => t.id === id);
      if (todoIndex < 0) {
        return c.json(
          {
            message: "not found",
          },
          404
        );
      }
      DUMMY_TODO[todoIndex] = {
        ...DUMMY_TODO[todoIndex],
        todo: body.todo,
        updatedAt: new Date().toISOString(),
      };
      return c.json(
        {
          message: "success",
        },
        200
      );
    } catch (e) {
      return c.json(
        {
          message: "internal server error",
        },
        500
      );
    }
  })
  .openapi(todosRoute_deleteTodo, (c) => {
    try {
      const id = c.req.param("id");
      const todoIndex = DUMMY_TODO.findIndex((t) => t.id === id);
      if (todoIndex < 0) {
        return c.json(
          {
            message: "not found",
          },
          404
        );
      }
      DUMMY_TODO.splice(todoIndex, 1);
      return c.json(
        {
          message: "success",
        },
        200
      );
    } catch (e) {
      return c.json(
        {
          message: "internal server error",
        },
        500
      );
    }
  });

// const app = new Hono()
//   .get("/", (c) => {
//     try {
//       return ResponseSuccess(c, HTTP_STATUS_CODE.OK, "success", DUMMY_TODO);
//     } catch (e) {
//       const err = e as HTTPException;
//       return ResponseError(c, err);
//     }
//   })
//   .get("/:id", (c) => {
//     try {
//       const todo = DUMMY_TODO.find((t) => t.id === c.req.param("id"));
//       if (!todo) {
//         throw new HTTPException(
//           HTTP_STATUS_CODE.NOT_FOUND as ContentfulStatusCode,
//           { message: "not found" }
//         );
//       }
//       return ResponseSuccess(c, HTTP_STATUS_CODE.OK, "success", todo);
//     } catch (e) {
//       const err = e as HTTPException;
//       return ResponseError(c, err);
//     }
//   })
//   .post("/", addUpdateTodoSchema, async (c) => {
//     try {
//       const body = c.req.valid("json");
//       const newData = {
//         id: crypto.randomUUID().toString(),
//         todo: body.todo,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       };
//       DUMMY_TODO.push(newData);
//       return ResponseSuccess(c, HTTP_STATUS_CODE.OK, "success", newData);
//     } catch (e) {
//       const err = e as HTTPException;
//       return ResponseError(c, err);
//     }
//   })
//   .patch("/:id", addUpdateTodoSchema, async (c) => {
//     try {
//       const id = c.req.param("id");
//       const body = c.req.valid("json");
//       const todoIndex = DUMMY_TODO.findIndex((t) => t.id === id);
//       if (todoIndex < 0) {
//         throw new HTTPException(
//           HTTP_STATUS_CODE.NOT_FOUND as ContentfulStatusCode,
//           { message: "not found" }
//         );
//       }
//       DUMMY_TODO[todoIndex] = {
//         ...DUMMY_TODO[todoIndex],
//         todo: body.todo,
//         updatedAt: new Date().toISOString(),
//       };
//       return ResponseSuccess(c, HTTP_STATUS_CODE.OK, "success");
//     } catch (e) {
//       const err = e as HTTPException;
//       return ResponseError(c, err);
//     }
//   })
//   .delete("/:id", (c) => {
//     try {
//       const id = c.req.param("id");
//       const todoIndex = DUMMY_TODO.findIndex((t) => t.id === id);
//       if (todoIndex < 0) {
//         throw new HTTPException(
//           HTTP_STATUS_CODE.NOT_FOUND as ContentfulStatusCode,
//           { message: "not found" }
//         );
//       }
//       DUMMY_TODO.splice(todoIndex, 1);
//       return ResponseSuccess(c, HTTP_STATUS_CODE.OK, "success");
//     } catch (e) {
//       const err = e as HTTPException;
//       return ResponseError(c, err);
//     }
//   });

export default app;
