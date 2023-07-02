import { cva, VariantProps } from "class-variance-authority";

export const text = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      p: "leading-7",
      muted: "text-sm text-muted-foreground",
    },
  },
});
