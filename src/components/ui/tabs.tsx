"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

interface TabsContentsProps {
  className?: string;
  transition?: Transition;
  children?: React.ReactNode;
}

const TabsContents = React.forwardRef<HTMLDivElement, TabsContentsProps>(
  ({ className, transition = { type: "spring", stiffness: 200, damping: 25 }, children }, ref) => {
    const [height, setHeight] = React.useState<number | "auto">("auto");
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (contentRef.current) {
        const resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            setHeight(entry.contentRect.height);
          }
        });

        resizeObserver.observe(contentRef.current);
        return () => resizeObserver.disconnect();
      }
    }, []);

    return (
      <motion.div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        animate={{ height }}
        transition={transition}
      >
        <div ref={contentRef}>{children}</div>
      </motion.div>
    );
  }
);
TabsContents.displayName = "TabsContents";

interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  transition?: Transition;
}

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, transition = { duration: 0.3, ease: "easeInOut" }, children, value, ...props }) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    if (!contentRef.current) return;

    const observer = new MutationObserver(() => {
      if (contentRef.current) {
        const state = contentRef.current.getAttribute("data-state");
        setIsActive(state === "active");
      }
    });

    observer.observe(contentRef.current, {
      attributes: true,
      attributeFilter: ["data-state"],
    });

    // Check initial state
    const initialState = contentRef.current.getAttribute("data-state");
    setIsActive(initialState === "active");

    return () => observer.disconnect();
  }, []);

  return (
    <TabsPrimitive.Content
      ref={contentRef}
      value={value}
      className={cn(
        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      forceMount
      {...props}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 10,
        }}
        transition={transition}
        className={isActive ? "relative" : "absolute inset-0"}
        style={{
          pointerEvents: isActive ? "auto" : "none",
        }}
      >
        {children}
      </motion.div>
    </TabsPrimitive.Content>
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContents, TabsContent };
