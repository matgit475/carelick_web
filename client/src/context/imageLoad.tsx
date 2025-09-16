import React, { useEffect, useState, createContext, useContext } from "react";
import { useLocation } from "react-router-dom";

const ImageLoadContext = createContext({
  allImagesLoaded: false,
});

export const ImageLoadProvider = ({ children }: any) => {
  const location = useLocation();
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  React.useEffect(() => {
    const handleLoad = () => {
      const images = document.querySelectorAll("img");
      const length = images.length;
      console.log(images);
      let count = 0;
      const checkAllLoaded = () => {
        count++;
        if (count == length) setAllImagesLoaded(true);
      };
      images.forEach((img) => {
        img.addEventListener("load", checkAllLoaded);
      });
    };

    window.addEventListener("load", handleLoad, { once: true });
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, [location]);

  return (
    <ImageLoadContext.Provider value={{ allImagesLoaded }}>
      {children}
    </ImageLoadContext.Provider>
  );
};

export const useImageLoad = () => useContext(ImageLoadContext);
