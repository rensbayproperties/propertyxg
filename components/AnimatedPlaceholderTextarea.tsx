"use client";

import * as React from "react";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const TYPING_SPEED = 60;
const DELETING_SPEED = 40;
const PAUSE_DURATION = 1500;

type AnimatedPlaceholderTextareaProps = TextareaProps & {
  placeholders: string[];
};

const AnimatedPlaceholderTextarea = React.forwardRef<
  HTMLTextAreaElement,
  AnimatedPlaceholderTextareaProps
>(({ placeholders, className, value, onFocus, onBlur, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [displayText, setDisplayText] = React.useState("");
  const [showCursor, setShowCursor] = React.useState(true);

  const showOverlay = !isFocused && !String(value ?? "").trim();

  React.useEffect(() => {
    if (!showOverlay || placeholders.length === 0) {
      setDisplayText("");
      return;
    }

    let cancelled = false;

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, ms);
      });

    const run = async () => {
      let index = 0;

      while (!cancelled) {
        const currentText = placeholders[index];

        for (let i = 1; i <= currentText.length && !cancelled; i++) {
          setDisplayText(currentText.slice(0, i));
          await sleep(TYPING_SPEED);
        }

        if (cancelled) return;

        await sleep(PAUSE_DURATION);
        if (cancelled) return;

        for (let i = currentText.length - 1; i >= 0 && !cancelled; i--) {
          setDisplayText(currentText.slice(0, i));
          await sleep(DELETING_SPEED);
        }

        index = (index + 1) % placeholders.length;
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [showOverlay, placeholders]);

  React.useEffect(() => {
    if (!showOverlay) return;

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, [showOverlay]);

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div className="relative w-full">
      {showOverlay && (
        <div
          className="pointer-events-none absolute left-3 top-3 text-lg text-muted-foreground"
          aria-hidden
        >
          {displayText}
          <span className={cn(showCursor ? "opacity-100" : "opacity-0")}>|</span>
        </div>
      )}
      <Textarea
        ref={ref}
        value={value}
        className={className}
        placeholder=""
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </div>
  );
});

AnimatedPlaceholderTextarea.displayName = "AnimatedPlaceholderTextarea";

export { AnimatedPlaceholderTextarea };
