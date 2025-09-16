export const getEventPhotoUrl = (file_name: string) => {
  return `${process.env.REACT_APP_API_ENDPOINT}/photos/${file_name}`;
};

export const getGalleryImageUrls = (filenames: string) => {
  return filenames
    ?.split(",")
    ?.filter((item: any) => item !== "")
    ?.map(
      (name: any) => `${process.env.REACT_APP_IMAGES_ENDPOINT}${name.trim()}`,
    );
};

export const EventsImageUrls = (events: any) => {
  return events?.map(
    (event: any) =>
      process.env.REACT_APP_API_ENDPOINT + "/photos/" + event?.event_image,
  );
};
