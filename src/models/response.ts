import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ContentfulStatusCode } from "hono/utils/http-status";
import HTTP_STATUS_CODE from "http-status-codes";

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
      ...(Array.isArray(data) && { length: data.length }),
    },
    (statusCode ?? HTTP_STATUS_CODE.ACCEPTED) as ContentfulStatusCode
  );
};

export { ResponseError, ResponseSuccess };
