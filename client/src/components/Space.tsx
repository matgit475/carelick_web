import * as React from "react";
import { useImageLoad } from "../context/imageLoad";

const Space = () => {
  const { allImagesLoaded } = useImageLoad();
  return !allImagesLoaded ? (
    <div
      style={{
        height: "100vh",
        width: "100%",
      }}
    ></div>
  ) : (
    <></>
  );
};

export default Space;
