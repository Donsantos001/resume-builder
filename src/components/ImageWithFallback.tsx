import { useState, useEffect } from "react";

const ImageWithFallback = ({
  primaryUrl,
  fallbackUrl,
  alt,
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

  return <img {...rest} src={src} alt={alt} />;
};

export default ImageWithFallback;
