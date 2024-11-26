import React, { useCallback } from "react";
import { Word as WordType } from "@/types/voice";
import { FlatList, StyleSheet, Text, Pressable } from "react-native";
import { tickToNanoS, Time, timeConvert } from "../../util/datetime";

interface Props {
  textHL: number;
  data: WordType[];
  currTime: number;
  onSeekText: (t: number) => void;
}

const TextList = ({ textHL, data, currTime, onSeekText }: Props) => {
  console.log(textHL);

  const renderItem = useCallback(
    ({ item, index }: { item: WordType; index: number }) => {
      const { Word, Offset, Duration } = item;

      const newOffset = timeConvert(tickToNanoS(Offset), Time.nanoSecond);
      const newDuration = timeConvert(tickToNanoS(Duration), Time.nanoSecond);

      const isHighlight =
        textHL === index ||
        (currTime >= newOffset && currTime < newOffset + newDuration);

      return (
        <Pressable
          onPress={() => onSeekText(newOffset)}
          style={[
            styles.container,
            { backgroundColor: isHighlight ? "#1a496560" : "transparent" },
          ]}
        >
          <Text
            style={[
              styles.wordStyle,
              { color: isHighlight ? "white" : "gray" },
            ]}
          >
            {Word}
          </Text>
        </Pressable>
      );
    },
    [currTime, textHL]
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      scrollEnabled={false}
      contentContainerStyle={styles.flatlistContainer}
      removeClippedSubviews
      getItemLayout={(_, index) => ({ length: 10, offset: 10 * index, index })}
    />
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    borderRadius: 6,
    padding: 3.6,
  },

  wordStyle: {
    fontSize: 36,
    fontWeight: "600",
    color: "gray",
  },
});

export default TextList;
