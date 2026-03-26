import { useEffect } from "react";
import { useGetRequest } from "./api/useGetRequest";
import { userStats } from "../api/api";

const useUserStats = () => {
  const { sendRequest, loading, error, response } = useGetRequest(userStats);

  useEffect(() => {
    sendRequest();
  }, []);

  return {
    response,
    loading,
    error,
  };
};

export default useUserStats;
