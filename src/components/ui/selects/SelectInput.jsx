import React from 'react';

import { GGSelect } from 'components/ui/selects';

const STYLE = {
  width: "100%",
  backgroundColor: "white",
  paddingRight: 4,
  display: "flex",
  alignItems: "center",
};

export default function SelectInput({ style, ...props }) {
  return (
    <div style={style}>
      <div className="input" style={STYLE}>
        <GGSelect {...props} style={{ width: "100%" }} />
      </div>
    </div>
  );
}