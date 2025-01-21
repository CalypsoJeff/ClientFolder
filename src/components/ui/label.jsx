import React from "react";

export const Label = ({ className, children, ...props }) => (
  <label className={`block text-sm font-medium text-gray-700 ${className}`} {...props}>
    {children}
  </label>
);
