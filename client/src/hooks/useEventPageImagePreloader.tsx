import useImagePreloader from "../hooks/useImagePreloader";
import {
  getEventPhotoUrl,
  getGalleryImageUrls,
  EventsImageUrls,
} from "../helpers/Common";

export const useEventPageImagePreloader = (response: any) => {
  const url = getEventPhotoUrl(response?.event?.event_image);
  const galleryImageUrls = getGalleryImageUrls(
    response?.event_gallery?.event_images,
  );
  const pastEventsImageUrls = EventsImageUrls(response?.past_events);

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
