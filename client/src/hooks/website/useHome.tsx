import { useEffect } from "react";
import { useGetRequest } from "../useGetRequest";
import { home } from "../../api/api";

const useHome = () => {
  const { sendRequest, loading, error, response } = useGetRequest<any>(home);

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
