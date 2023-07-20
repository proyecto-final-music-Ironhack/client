import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  // Styles for the base style
  baseStyle: {
    borderRadius: "64px",
    bg: "#CAFA00",
    pt: "16px",
    pb: "16px",
    pr: "32px",
    pl: "32px",
  },
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {},
  // The default `size` or `variant` values
  defaultProps: {},
});

export const Container = defineStyleConfig({
  baseStyle: {
    bg: "black",
  },
});

export const Heading = defineStyleConfig({
  baseStyle: {
    color: "white",
  },
  sizes: {},
  variants: {},
  defaultProps: {},
});

export const Text = defineStyleConfig({
  baseStyle: {
    color: "white",
  },
});
