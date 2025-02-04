import { Hono } from "hono";

import { HTTPException } from "hono/http-exception";
import HTTP_STATUS_CODE from "http-status-codes";
import { ContentfulStatusCode } from "hono/utils/http-status";
import addUpdateTodoSchema from "../schemas/todos";
import DUMMY_TODO from "../models/todos";
import { ResponseError, ResponseSuccess } from "../models/response";

const app = new Hono()
  .get("/", (c) => {
    try {
      return ResponseSuccess(c, HTTP_STATUS_CODE.OK, "success", DUMMY_TODO);
    } catch (e) {
      const err = e as HTTPException;
      return ResponseError(c, err);
    }
  })
  .get("/:id", (c) => {
    try {
      const todo = DUMMY_TODO.find((t) => t.id === c.req.param("id"));
      if (!todo) {
        throw new HTTPException(
          HTTP_STATUS_CODE.NOT_FOUND as ContentfulStatusCode,
          { message: "not found" }
        );
      }
      return ResponseSuccess(c, HTTP_STATUS_CODE.OK, "success", todo);
    } catch (e) {
      const err = e as HTTPException;
      return ResponseError(c, err);
    }
  })
  .post("/", addUpdateTodoSchema, async (c) => {
    try {
      const body = c.req.valid("json");
      const newData = {
        id: crypto.randomUUID().toString(),
        todo: body.todo,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      DUMMY_TODO.push(newData);
      return ResponseSuccess(c, HTTP_STATUS_CODE.OK, "success", newData);
    } catch (e) {
      const err = e as HTTPException;
      return ResponseError(c, err);
    }
  })
  .patch("/:id", addUpdateTodoSchema, async (c) => {
    try {
      const id = c.req.param("id");
      const body = c.req.valid("json");
      const todoIndex = DUMMY_TODO.findIndex((t) => t.id === id);
      if (todoIndex < 0) {
        throw new HTTPException(
          HTTP_STATUS_CODE.NOT_FOUND as ContentfulStatusCode,
          { message: "not found" }
        );
      }
      DUMMY_TODO[todoIndex] = {
        ...DUMMY_TODO[todoIndex],
        todo: body.todo,
        updatedAt: new Date().toISOString(),
      };
      return ResponseSuccess(c, HTTP_STATUS_CODE.OK, "success");
    } catch (e) {
      const err = e as HTTPException;
      return ResponseError(c, err);
    }
  })
  .delete("/:id", (c) => {
    try {
      const id = c.req.param("id");
      const todoIndex = DUMMY_TODO.findIndex((t) => t.id === id);
      if (todoIndex < 0) {
        throw new HTTPException(
          HTTP_STATUS_CODE.NOT_FOUND as ContentfulStatusCode,
          { message: "not found" }
        );
      }
      DUMMY_TODO.splice(todoIndex, 1);
      return ResponseSuccess(c, HTTP_STATUS_CODE.OK, "success");
    } catch (e) {
      const err = e as HTTPException;
      return ResponseError(c, err);
    }
  });

export default app;
