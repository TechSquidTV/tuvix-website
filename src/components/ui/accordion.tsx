"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { motion, type Transition, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  showArrow?: boolean;
}

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, showArrow = true, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      {showArrow && (
        <svg
          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

interface AccordionContentProps extends HTMLMotionProps<"div"> {
  transition?: Transition;
  keepRendered?: boolean;
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  (
    {
      className,
      children,
      transition = { type: "spring", stiffness: 150, damping: 22 },
      keepRendered = false,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const observer = new MutationObserver(() => {
        if (contentRef.current) {
          const state = contentRef.current.getAttribute("data-state");
          setIsOpen(state === "open");
        }
      });

      if (contentRef.current) {
        observer.observe(contentRef.current, {
          attributes: true,
          attributeFilter: ["data-state"],
        });
      }

      return () => observer.disconnect();
    }, []);

    return (
      <AccordionPrimitive.Content ref={contentRef} className="overflow-hidden text-sm" forceMount>
        <motion.div
          ref={ref}
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={transition}
          className={cn("pb-4 pt-0", className)}
          {...props}
        >
          {children}
        </motion.div>
      </AccordionPrimitive.Content>
    );
  }
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
