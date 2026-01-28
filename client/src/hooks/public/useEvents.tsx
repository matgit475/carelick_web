import { useEffect } from "react";
import { useGetRequest } from "../api/useGetRequest";
import { events } from "../../api/api";

const useEvents = () => {
  const { sendRequest, loading, error, response } = useGetRequest(events);

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
