import React from "react";
import clsx from "clsx"; // Import clsx directly

export const Button = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={clsx(
      "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50",
      className
    )}
    {...props}
  />
));
Button.displayName = "Button";
