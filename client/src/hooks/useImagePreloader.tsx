import { useState, useEffect } from "react";

export const useImagePreloader = (imageUrls: string[]) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!imageUrls || imageUrls?.length === 0) {
      setLoaded(true);
      return;
    }

    let loadedCount = 0;

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = img.onerror = () => {
        loadedCount += 1;
        if (loadedCount === imageUrls?.length) {
          setLoaded(true);
        }
      };
    });
  }, [imageUrls]);

  return loaded;
};

export default useImagePreloader;
