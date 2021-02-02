import React, { FC } from "react";

export const BlockWrapper: FC = ({ children }) => (
  <div
    style={{
      margin: "16px 0",
    }}
  >
    {children}
  </div>
);
