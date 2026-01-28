import { useEffect } from "react";
import { useGetRequest } from "../api/useGetRequest";
import { event } from "../../api/api";
import useEventPageImagePreloader from "../useEventPageImagePreloader";

const useEvents = (id: number | string) => {
  const { sendRequest, loading, error, response } = useGetRequest(() =>
    event(id),
  );
  const { allImagesLoaded } = useEventPageImagePreloader(response);

  useEffect(() => {
    sendRequest();
  }, [id]);

  const loaded = allImagesLoaded && !loading;
  return {
    response,
    loaded,
    error,
  };
};

export default useEvents;
