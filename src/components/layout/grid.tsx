import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12",
      none: "grid-cols-none",
    },
    colsSm: {
      1: "sm:grid-cols-1",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-3",
      4: "sm:grid-cols-4",
      5: "sm:grid-cols-5",
      6: "sm:grid-cols-6",
      12: "sm:grid-cols-12",
    },
    colsMd: {
      1: "md:grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
      5: "md:grid-cols-5",
      6: "md:grid-cols-6",
      12: "md:grid-cols-12",
    },
    colsLg: {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
      5: "lg:grid-cols-5",
      6: "lg:grid-cols-6",
      12: "lg:grid-cols-12",
    },
    colsXl: {
      1: "xl:grid-cols-1",
      2: "xl:grid-cols-2",
      3: "xl:grid-cols-3",
      4: "xl:grid-cols-4",
      5: "xl:grid-cols-5",
      6: "xl:grid-cols-6",
      12: "xl:grid-cols-12",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
    },
    gapX: {
      0: "gap-x-0",
      1: "gap-x-1",
      2: "gap-x-2",
      3: "gap-x-3",
      4: "gap-x-4",
      6: "gap-x-6",
      8: "gap-x-8",
    },
    gapY: {
      0: "gap-y-0",
      1: "gap-y-1",
      2: "gap-y-2",
      3: "gap-y-3",
      4: "gap-y-4",
      6: "gap-y-6",
      8: "gap-y-8",
    },
    flow: {
      row: "grid-flow-row",
      col: "grid-flow-col",
      dense: "grid-flow-dense",
      "row-dense": "grid-flow-row-dense",
      "col-dense": "grid-flow-col-dense",
    },
  },
  defaultVariants: {
    cols: 1,
    gap: 4,
    flow: "row",
  },
});

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      cols,
      colsSm,
      colsMd,
      colsLg,
      colsXl,
      gap,
      gapX,
      gapY,
      flow,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          gridVariants({
            cols,
            colsSm,
            colsMd,
            colsLg,
            colsXl,
            gap,
            gapX,
            gapY,
            flow,
          }),
          className
        )}
        {...props}
      />
    );
  }
);
Grid.displayName = "Grid";

// Grid Item 组件
const GridItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    colSpan?: number;
    colSpanSm?: number;
    colSpanMd?: number;
    colSpanLg?: number;
    colSpanXl?: number;
  }
>(({ className, colSpan, colSpanSm, colSpanMd, colSpanLg, colSpanXl, ...props }, ref) => {
  const spanClasses = cn(
    colSpan && `col-span-${colSpan}`,
    colSpanSm && `sm:col-span-${colSpanSm}`,
    colSpanMd && `md:col-span-${colSpanMd}`,
    colSpanLg && `lg:col-span-${colSpanLg}`,
    colSpanXl && `xl:col-span-${colSpanXl}`
  );

  return (
    <div ref={ref} className={cn(spanClasses, className)} {...props} />
  );
});
GridItem.displayName = "GridItem";

export { Grid, GridItem, gridVariants };
