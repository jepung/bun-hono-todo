import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { ContentfulStatusCode } from "hono/utils/http-status";
import HTTP_STATUS_CODE from "http-status-codes";

const addUpdateTodoSchema = zValidator(
  "json",
  z.object({
    todo: z.string(),
  }),
  (result, c) => {
    if (!result.success) {
      return c.json(
        {
          message: "bad request",
          errors: result.error.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        },
        HTTP_STATUS_CODE.BAD_REQUEST as ContentfulStatusCode
      );
    }
  }
);

export default addUpdateTodoSchema;
