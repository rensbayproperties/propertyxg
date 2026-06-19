"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { LucideIcon, Eye, EyeOff } from "lucide-react";

const inputVariants = cva(
  "flex w-full rounded-md border border-zinc-400 placeholder:text-placeholder bg-white text-foreground focus:border-transparent px-3 py-2 ring-offset-brand file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        default: "h-10",
        sm: "h-8 text-sm",
        lg: "h-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  VariantProps<typeof inputVariants> {
  icon?: any;
  // icon?: LucideIcon;
  iconPosition?: "left" | "right";
  iconSize?: number;
  togglePassword?: boolean;
  prefix?: string;
  prefixPosition?: string;
  prefixClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      type,
      icon: Icon,
      iconPosition = "left",
      prefix = "",
      prefixPosition = "left",
      prefixClassName = "",
      iconSize = 16,
      togglePassword,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    const inputType =
      togglePassword && type === "password"
        ? showPassword
          ? "text"
          : "password"
        : type;

    return (
      <div className="relative flex items-center">
        {Icon && iconPosition === "left" && (
          <Icon
            size={iconSize}
            className="absolute left-3 text-brand"
          />
        )}
        {prefix && prefixPosition === "left" && (
          <div className={cn("absolute left-3", prefixClassName)}>{prefix}</div>
        )}
        <input
          type={inputType}
          className={cn(
            inputVariants({ size }),
            Icon && iconPosition === "left" && "pl-8",
            Icon && iconPosition === "right" && "pr-8",
            prefix && prefixPosition === "left" && "pl-14",
            prefix && prefixPosition === "right" && "pr-14",
            togglePassword && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {Icon && iconPosition === "right" && (
          <Icon
            size={iconSize}
            className="absolute right-3 text-muted-foreground"
          />
        )}
        {togglePassword && type === "password" && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-3 text-muted-foreground focus:outline-none"
          >
            {showPassword ? (
              <EyeOff size={iconSize} />
            ) : (
              <Eye size={iconSize} />
            )}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
