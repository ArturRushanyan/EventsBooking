export interface AppError {
  status: number;
  message: string;
  code?: string;
  constraint?: string;
}

export function toAppError(error: unknown): AppError {
  if (typeof error === "object" && error !== null) {
    const maybe = error as Partial<AppError> & { message?: unknown };
    return {
      status: typeof maybe.status === "number" ? maybe.status : 500,
      message:
        typeof maybe.message === "string"
          ? maybe.message
          : "Internal server Error",
      code: typeof maybe.code === "string" ? maybe.code : undefined,
      constraint:
        typeof maybe.constraint === "string" ? maybe.constraint : undefined,
    };
  }
  return { status: 500, message: "Internal server Error" };
}
