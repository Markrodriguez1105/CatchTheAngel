import {
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";
import React from "react";
import ThemedText from "./ThemedText";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type CustomButtonProps = TouchableOpacityProps & {
  name: keyof typeof FontAwesome.glyphMap;
  iconPosition?: "left" | "right" | undefined;
  bgColor?: string;
  size?: number;
  color?: string;
  title: string;
};

export default function CustomButton({
  name = "facebook",
  title = "Button",
  iconPosition = undefined,
  bgColor = "lightblue",
  size = 20,
  color = "black",
  ...rest
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }]}
      {...rest}
    >
      {iconPosition == "left" ? (
        <FontAwesome name={name} size={size} color={color} />
      ) : null}

      <ThemedText typo="body_bold" style={{ color: color }}>
        {title}
      </ThemedText>

      {iconPosition == "right" ? (
        <FontAwesome name={name} size={size} color={color} />
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 10,
    padding: 10,
    borderRadius: 10,
  },
});
