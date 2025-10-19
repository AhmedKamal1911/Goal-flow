import { cn } from "@/lib/utils";

import { ReactNode } from "react";

export default function CustomInput({
  className,
  type,
  icon,
  ...props
}: React.ComponentProps<"input"> & {
  icon?: ReactNode;
}) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute start-4 top-1/2 -translate-y-1/2">
          {icon}
        </span>
      )}

      <input
        type={type}
        data-slot="input"
        className={cn(
          "h-10 w-full rounded-lg border border-gray-300 bg-white px-4 text-base text-gray-900 placeholder:text-gray-400",
          "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
          "dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-500",
          "disabled:cursor-not-allowed disabled:opacity-50",
          icon && "ps-12",
          className
        )}
        {...props}
      />
    </div>
  );
}
