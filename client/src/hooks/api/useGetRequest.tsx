import { useState } from "react";

export const useGetRequest = (requestFn: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const sendRequest = () => {
    setLoading(true);
    setResponse(null);
    return requestFn()
      .then((result: any) => {
        setError(null);
        setResponse(result);
        return result;
      })
      .catch((err: any): any => {
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { sendRequest, response, loading, error };
};

export default useGetRequest;
