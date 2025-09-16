import { useEffect } from "react";
import { useGetRequest } from "../useGetRequest";
import { event } from "../../api/api";
import useEventPageImagePreloader from "../useEventPageImagePreloader";

const useEvents = (id: number | string) => {
  const { sendRequest, loading, error, response } = useGetRequest<
    any,
    number | string
  >(event);
  const data = response?.message ?? {};
  const { allImagesLoaded } = useEventPageImagePreloader(data);

  useEffect(() => {
    sendRequest(id);
  }, [id]);

  const loaded = allImagesLoaded && !loading;
  return {
    response,
    loaded,
    error,
  };
};

export default useEvents;
