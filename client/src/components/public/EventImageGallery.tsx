import * as React from "react";
import { Col } from "react-bootstrap";
import FsLightbox from "fslightbox-react";
import useLightBox from "../../hooks/useLightbox";
import GalleryImage from "./GalleryImage";
import GallerySpecialImage from "./GallerySpecialImage";
import Animate from "../Animate";
import { getGalleryImageUrls } from "../../helpers/Common";

type EventImageGalleryProps = {
  event_gallery: any;
};

const EventImageGallery: React.FC<EventImageGalleryProps> = ({
  event_gallery,
}) => {
  const { lightboxController, openLightboxOnSlide } = useLightBox();
  const { event_images = "" } = event_gallery;
  const galleryImageUrls = getGalleryImageUrls(event_images);
  return galleryImageUrls?.length != 0 ? (
    <>
      {galleryImageUrls?.slice(0, 4)?.map((src: any, idx: number) => (
        <Col key={idx} xs={12} md={6} lg={3} className="mb-4">
          <Animate>
            <>
              {idx < 3 ? (
                <GalleryImage
                  src={src}
                  onClick={() => openLightboxOnSlide(idx)}
                />
              ) : null}
              {idx == 3 && galleryImageUrls.length == 4 ? (
                <GalleryImage
                  src={src}
                  onClick={() => openLightboxOnSlide(idx)}
                />
              ) : null}
              {galleryImageUrls.length > 4 && idx == 3 ? (
                <GallerySpecialImage
                  src={src}
                  count={galleryImageUrls.length - 3}
                  onClick={() => openLightboxOnSlide(idx)}
                />
              ) : null}
            </>
          </Animate>
        </Col>
      ))}
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={galleryImageUrls}
        slide={lightboxController.slide}
      />
    </>
  ) : (
    <Col>No photos to display</Col>
  );
};

export default EventImageGallery;
