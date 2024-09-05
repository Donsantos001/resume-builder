import { useState, useEffect } from "react";

const ImageWithFallback = ({
  primaryUrl,
  fallbackUrl,
  alt,
  setLoaded,
  ...rest
}: {
  [key: string]: any;
}) => {
  const [src, setSrc] = useState(primaryUrl);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setSrc(primaryUrl);
    };

    img.onerror = () => {
      setSrc(fallbackUrl);
    };

    img.src = primaryUrl;
  }, [primaryUrl, fallbackUrl]);

  return (
    <img
      {...rest}
      src={src}
      onLoad={() => {
        console.log("loaded n")
        setLoaded && setLoaded(true);
      }}
      alt={alt}
    />
  );
};

export default ImageWithFallback;
