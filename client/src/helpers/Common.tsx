export const getEventPhotoUrl = (file_name: string) => {
  return `${process.env.REACT_APP_API_ENDPOINT}/photos/${file_name}`;
};

export const getGalleryImageUrls = (filenames: string) => {
  return filenames
    ?.split(",")
    ?.filter((item: any) => item !== "")
    ?.map((name: any) => process.env.REACT_APP_IMAGES_ENDPOINT + name);
};

export const EventsImageUrls = (events: any) => {
  return events?.map(
    (event: any) => process.env.REACT_APP_IMAGES_ENDPOINT + event?.event_image,
  );
};
export const image = (file_name: string) => {
  return `${process.env.REACT_APP_IMAGES_ENDPOINT}${file_name}`;
};
