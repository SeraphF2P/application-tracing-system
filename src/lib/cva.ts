"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
export const variants = cva(
  `  relative  flex transition-[box-shadow,colors] justify-center items-center tracking-wider cursor-pointer  `,
  {
    variants: {
      theme:{
      primary:'[--variant:--primary] [--variant-text:--primary-text]',
      alert:" [--variant:--alert] [--variant-text:--alert]"
      },
      variant: {
        fill: " bg-variant text-variant-text hover:shadow-white/30 shadow-overlay  transition-[box-shadow,colors] duration-700  ",
        ghost:
          "  hover:bg-variant/10 text-variant  active:bg-variant/30   ",
        none: "",
      },
      padding:{
      mid:"px-3 py-2"
      },
      shape: {
        pill: "rounded-[50%]",
        circle: "rounded-full aspect-square",
        rect: "rounded-sm",
      },
      deActivated: {
        default:
          " disabled:text-gray-700   disabled:bg-gray-500 disabled:ring-gray-500 ",
        skelaton:
          "disabled:text-gray-400 disabled:ring-4 disabled:bg-gray-400 disabled:active:bg-transparent",
        link: "text-gray-400 ring-gray-400 active:bg-transparent hover:scale-100 cursor-auto",
      },
    },
    defaultVariants: {
      padding:"mid",
      theme:"primary",
      variant: "fill",
      shape: "rect",
      deActivated: "default",
    },
  }
);
export type variantsType = VariantProps<typeof variants>;
