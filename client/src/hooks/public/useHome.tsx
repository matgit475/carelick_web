import { useEffect } from "react";
import { useGetRequest } from "../api/useGetRequest";
import { home } from "../../api/api";

const useHome = () => {
  const { sendRequest, loading, error, response } = useGetRequest(home);

  useEffect(() => {
    sendRequest();
  }, []);

  return {
    response,
    loading,
    error,
  };
};

export default useHome;
