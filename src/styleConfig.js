import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: "54px",
  },
});

export const Container = defineStyleConfig({
  baseStyle: {
    bg: "black",
    h: "100%",
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
