import { StyleSheet, View, Text } from "react-native";
import React from "react";

interface Props {
  word?: string;
  isHL?: boolean;
}

const TextHighlight = ({ word, isHL = false }: Props) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isHL ? "red" : "transparent" },
      ]}
    >
      <Text style={[styles.wordStyle, { color: isHL ? "white" : "gray" }]}>
        {word}
      </Text>
    </View>
  );
};

export default TextHighlight;

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    padding: 3.6,
  },

  wordStyle: {
    fontSize: 30,
    fontWeight: "600",
    color: "gray",
  },
});
