import { Context, Hono } from "hono";

import { HTTPException } from "hono/http-exception";
import HTTP_STATUS_CODE from "http-status-codes";
import { ContentfulStatusCode } from "hono/utils/http-status";
import addUpdateTodoSchema from "../schemas/todos";
import DUMMY_TODO from "../models/todos";

interface IBaseReponse<T> {
  message?: string;
  data?: T;
  length?: number;
  errors?: T;
}

const ResponseError = (c: Context, error: HTTPException) => {
  return c.json<IBaseReponse<string>>(
    {
      message: error.message,
    },
    (error.status ??
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) as ContentfulStatusCode
  );
};

const ResponseSuccess = <T>(
  c: Context,
  statusCode: number,
  message: string,
  data?: T
) => {
  return c.json<IBaseReponse<T>>(
    {
      message,
      data,
    },
    (statusCode ?? HTTP_STATUS_CODE.ACCEPTED) as ContentfulStatusCode
  );
};

const app = new Hono()
  .get("/", (c) => {
    try {
      return ResponseSuccess(
        c,
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        "success"
      );
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
      return ResponseSuccess(c, HTTP_STATUS_CODE.ACCEPTED, "success", todo);
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
      return c.json(
        {
          message: "success",
          data: newData,
        },
        HTTP_STATUS_CODE.CREATED as ContentfulStatusCode
      );
    } catch (e) {
      const err = e as HTTPException;
      return ResponseError(c, err);
    }
  });

export default app;
