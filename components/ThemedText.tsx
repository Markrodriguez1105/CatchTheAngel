import { StyleSheet, Text, type TextProps } from "react-native";
import React from "react";

export type ThemedTextProps = TextProps & {
  typo:
    | "header1"
    | "header2"
    | "header3"
    | "header4"
    | "header5"
    | "body"
    | "body_bold"
    | "button"
    | "note";
};

export default function ThemedText({ typo, style, ...rest }: ThemedTextProps) {
  return <Text style={[styles[typo], style]} {...rest} />;
}

const styles = StyleSheet.create({
  header1: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#1d1d1d",
  },
  header2: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1d1d1d",
  },
  header3: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1d1d1d",
  },
  header4: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1d1d1d",
  },
  header5: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1d1d1d",
  },
  body: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#1d1d1d",
  },
  body_bold: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1d1d1d",
  },
  button: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "#1d1d1d",
  },
  note: {
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "italic",
    color: "#1d1d1d",
  },
});
