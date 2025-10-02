type Success<T = null> = {
  status: "success";
  message: string;
  data?: T;
};
type Failed = {
  status: "error" | "validationError";
  error: { statusCode: number; statusText: string };
};

export type ActionResponse<SuccessData = null> = Promise<
  Success<SuccessData> | Failed
>;
