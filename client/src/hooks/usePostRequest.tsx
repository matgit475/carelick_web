import { useState } from "react";
interface ErrorState {
  status: number | null;
  message: string | null;
}

export const usePostRequest = <TRequest, TResponse>(
  requestFn: (data: TRequest) => Promise<TResponse>,
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorState | null>(null);
  const [response, setResponse] = useState<TResponse | null>(null);

  const sendRequest = async (data: TRequest): Promise<TResponse | null> => {
    setLoading(true);
    setResponse(null);
    try {
      const result = await requestFn(data);
      setError(null);
      setResponse(result);
      return result;
    } catch (err: any) {
      if (err.response) {
        setError({
          message: err.response.data?.message || "An error occurred",
          status: err.response.status ?? 500,
        });
      } else if (err.request) {
        setError({
          message: "Network error: No response received",
          status: 500,
        });
      } else {
        setError({
          message: `Unexpected error: ${err.message}`,
          status: 500,
        });
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, response, loading, error };
};

export default usePostRequest;
