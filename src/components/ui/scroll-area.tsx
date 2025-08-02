

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px] hover:w-3.5",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px] hover:h-3.5",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb 
      className="relative flex-1 rounded-full bg-border cursor-pointer hover:bg-gray-400 active:bg-gray-500"
      onPointerDown={(e) => {
        // Prevent default to allow proper dragging
        e.preventDefault();
        // Create a new PointerEvent manually with only the required properties
        const newEvent = new PointerEvent('pointerdown', {
          bubbles: e.bubbles,
          cancelable: e.cancelable,
          clientX: e.clientX,
          clientY: e.clientY,
          pointerId: e.pointerId,
        });
        
        // Ensure event propagates to Radix UI handlers
        const thumb = e.currentTarget;
        const scrollbar = thumb.parentElement;
        if (scrollbar) {
          // This allows the pointer event to bubble to Radix's handlers
          scrollbar.dispatchEvent(newEvent);
        }
      }}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
