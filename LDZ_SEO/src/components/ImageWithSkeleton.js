import React, { useEffect, useRef, useState } from "react";

const ImageWithSkeleton = ({ src, alt, className, style, imgStyle, loading }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, [src]);

  if (!src) return null;

  return (
    <div className="img-skeleton-wrapper" style={style}>
      {!loaded && <div className="img-skeleton-shimmer" />}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        className={className}
        style={{ ...imgStyle, opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  );
};

export default ImageWithSkeleton;
