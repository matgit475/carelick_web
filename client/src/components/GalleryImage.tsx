import * as React from "react";
import { Card, Image } from "react-bootstrap";

type GalleryImageProps = {
  src: string;
  onClick: () => void;
};

const GalleryImage: React.FC<GalleryImageProps> = ({ src, onClick }) => {
  return (
    <Card className="image-card">
      <Image thumbnail src={src} className="thumbnail-img" onClick={onClick} />
    </Card>
  );
};

export default GalleryImage;
