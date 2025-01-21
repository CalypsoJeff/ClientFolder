import React from "react";

export const Card = ({ className, children, ...props }) => (
  <div
    className={`rounded-lg shadow-md border border-gray-200 bg-white dark:bg-gray-800 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, ...props }) => (
  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700" {...props}>
    {children}
  </div>
);

export const CardContent = ({ children, ...props }) => (
  <div className="p-4" {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, ...props }) => (
  <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700" {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className, ...props }) => (
  <h3 className={`text-lg font-semibold ${className}`} {...props} />
);

export const CardDescription = ({ className, ...props }) => (
  <p className={`text-sm text-gray-500 ${className}`} {...props} />
);
