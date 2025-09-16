import { useEffect } from "react";
import { useGetRequest } from "../useGetRequest";
import { events } from "../../api/api";

const useEvents = () => {
  const { sendRequest, loading, error, response } = useGetRequest<any>(events);

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
