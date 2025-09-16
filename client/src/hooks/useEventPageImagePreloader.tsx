import useImagePreloader from "../hooks/useImagePreloader";
import {
  getEventPhotoUrl,
  getGalleryImageUrls,
  EventsImageUrls,
} from "../helpers/Common";

export const useEventPageImagePreloader = (response: any) => {
  const { event = {}, event_gallery = {}, past_events = [] } = response;
  const { event_image } = event;
  const { event_images = "" } = event_gallery;

  const url = getEventPhotoUrl(event_image);
  const galleryImageUrls = getGalleryImageUrls(event_images);
  const pastEventsImageUrls = EventsImageUrls(past_events);

  const allImagesUrls = [
    ...(galleryImageUrls || []),
    url || null,
    ...(pastEventsImageUrls || []),
  ];
  const allImagesLoaded = useImagePreloader(allImagesUrls);
  return {
    allImagesLoaded,
  };
};

export default useEventPageImagePreloader;
