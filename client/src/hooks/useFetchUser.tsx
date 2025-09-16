import * as React from "react";
import { currentUser } from "../api/api";
import { useAuth } from "../context/auth";

const useFetchUser = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({ status: null, message: null });
  const { setUser } = useAuth();

  const fetchUser = async () => {
    setLoading(true);
    setError({ status: null, message: null });
    try {
      const response = await currentUser();
      setUser(response);
      setError(null);
      return response;
    } catch (err: any) {
      let error;
      if (err.request) {
        // Request was made, but no response (network failure)
        error = {
          message: "Network error: No response received",
          status: 1,
        };
      } else if (err.response) {
        // Server responded with a status outside 2xx (e.g., 404, 500)
        error = {
          message: err?.response?.data?.message,
          status: err?.response?.status,
        };
      } else {
        // Request was made, but no response (network failure)
        error = {
          message: `Error setting up request:${err.message}`,
          status: 1,
        };
      }
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchUser,
    error,
    loading,
  };
};

export default useFetchUser;
