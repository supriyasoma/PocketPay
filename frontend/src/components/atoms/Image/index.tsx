import React from "react";
interface PropsTypes {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function Image(props: PropsTypes) {
  return (
    <img data-testid="image"
      {...props}
    />
  );
}
