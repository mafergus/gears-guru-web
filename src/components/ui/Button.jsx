import React from 'react';

import { buttonBlue } from 'util/colors';

const STYLE = {
  button: {
    width: 250,
    height: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "46px",
  },
  text: {
    color: "white",
  },
};

export default function Button({ style, classname, children, variant }) {

  const getClass = variant => {
    return variant === "ios" ? "button-ios" : "button";
  };

  return (
    <div style={{ ...STYLE.button, ...style }} className={getClass(variant)}>
      <p style={{ color: variant === "ios" ? buttonBlue : "white" }}>{children}</p>
    </div>
  );
}