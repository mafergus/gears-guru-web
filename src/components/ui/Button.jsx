import React from 'react';

import { buttonBlue } from 'util/colors';

const STYLE = {
  button: {
    width: 250,
    height: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
};

export default function Button({ style, classname, children, variant }) {

  const getClass = variant => {
    switch (variant) {
      case "ios": return "button-ios";
      case "square": return "button-square";
      default: return "button";
    }
  };

  return (
    <div style={{ ...STYLE.button, ...style }} className={getClass(variant)}>
      <p style={{ color: variant === "ios" ? buttonBlue : "white" }}>{children}</p>
    </div>
  );
}