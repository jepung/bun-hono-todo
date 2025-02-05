import { z } from "@hono/zod-openapi";

const TodoSchema = z.object({
  id: z.string().openapi({
    example: crypto.randomUUID(),
  }),
  todo: z.string().openapi({
    example: "Go to grocery store",
  }),
  createdAt: z.string().openapi({
    example: new Date().toISOString(),
  }),
  updatedAt: z.string().openapi({
    example: new Date().toISOString(),
  }),
});

const FieldErrorSchema = z.object({
  field: z.string().openapi({
    example: "todo",
  }),
  message: z.string().openapi({
    example: "Required",
  }),
});

const addTodoRequestSchema = z
  .object({
    todo: z.string(),
  })
  .openapi({
    example: {
      todo: "Go to the grocery store",
    },
  });

const addTodoResponseSchema = z.object({
  message: z.string().openapi({
    example: "success",
  }),
  data: TodoSchema,
});

export {
  addTodoRequestSchema,
  addTodoResponseSchema,
  FieldErrorSchema,
  TodoSchema,
};
