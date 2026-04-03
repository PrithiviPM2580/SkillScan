interface CustomErrorProps {
  error?: unknown;
  message?: string;
}

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && error !== null && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }

  return "Something went wrong. Please try again.";
};

const CustomError = ({ error, message }: CustomErrorProps) => {
  if (!error && !message) return null;

  return (
    <p className="text-sm text-red-600">{message ?? getErrorMessage(error)}</p>
  );
};

export default CustomError;
