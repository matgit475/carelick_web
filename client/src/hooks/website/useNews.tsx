import { useEffect } from "react";
import { useGetRequest } from "../useGetRequest";
import { news } from "../../api/api";

const useEvents = () => {
  const { sendRequest, loading, error, response } = useGetRequest<any>(news);

  useEffect(() => {
    sendRequest();
  }, []);

  return {
    response,
    loading,
    error,
  };
};

export default useEvents;
