import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Word} from '../../types/voiceText';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props extends Word {
  isHL?: boolean;
}

const TextHighlight = ({Word, Offset, Duration, isHL = false}: Props) => {
  const highlight = useSharedValue(isHL ? 0 : 1);

  useEffect(() => {
    highlight.value = withTiming(isHL ? 0 : 1, {duration: 500});
  }, [isHL]);

  const bgStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        highlight.value,
        [0, 1],
        ['#1a496560', 'transparent'],
      ),
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(highlight.value, [0, 1], ['white', 'gray']),
    };
  });

  return (
    <Animated.View style={[styles.container, bgStyle]}>
      <Animated.Text style={[styles.wordStyle, textStyle]}>
        {Word}
      </Animated.Text>
    </Animated.View>
  );
};

export default TextHighlight;

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    padding: 3,
  },

  wordStyle: {
    fontSize: 30,
    fontWeight: '600',
    color: 'gray',
  },
});
