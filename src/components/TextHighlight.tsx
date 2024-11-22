import {StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  word?: string;
  isHL?: boolean;
}

const TextHighlight = ({word, isHL = false}: Props) => {
  const highlight = useSharedValue(isHL ? 1 : 0);

  useDerivedValue(() => {
    highlight.value = withTiming(isHL ? 1 : 0, {duration: 250});
  }, [isHL]);

  const bgStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        highlight.value,
        [1, 0],
        ['#1a496560', 'transparent'],
      ),
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(highlight.value, [1, 0], ['white', 'gray']),
    };
  });

  return (
    <Animated.View style={[styles.container, bgStyle]}>
      <Animated.Text style={[styles.wordStyle, textStyle]}>
        {word}
      </Animated.Text>
    </Animated.View>
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
    fontWeight: '600',
    color: 'gray',
  },
});
