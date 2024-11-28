import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {fixedNum} from '../../util/number';

interface Props {
  speed?: number;
  minSpeed?: number;
  maxSpeed?: number;
  step?: number;
  style?: ViewStyle;
  onSpeedChange: (s: number) => void;
}

const PressAnimated = Animated.createAnimatedComponent(Pressable);

const colors = ['#4CAF50', '#F44336'];

const Speed = ({
  speed = 1,
  minSpeed = 0.5,
  maxSpeed = 2,
  step = 0.5,
  style,
  onSpeedChange,
}: Props) => {
  const scale = useSharedValue(1);
  const currSpeed = useSharedValue(speed);

  const handlePress = () => {
    const newVal = speed + step > maxSpeed ? minSpeed : speed + step;
    currSpeed.value = withTiming(newVal, {
      duration: 100,
    });
    scale.value = withDelay(100, withSpring(1));
    onSpeedChange(newVal);
  };

  const handlePressIn = () => {
    scale.value = withSpring(1.5);
  };

  const bgStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      currSpeed.value,
      [minSpeed, maxSpeed],
      [...colors],
    ),
    transform: [{scale: scale.value}],
  }));

  return (
    <PressAnimated
      onPressIn={handlePressIn}
      onPress={handlePress}
      style={[styles.speedContainer, style, bgStyle]}>
      <Animated.Text style={styles.speedText}>
        {fixedNum(speed, 1)}
      </Animated.Text>
    </PressAnimated>
  );
};

export default Speed;

const styles = StyleSheet.create({
  speedContainer: {
    padding: 8,
    borderRadius: 10,
    minWidth: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  speedText: {
    color: 'white',
    fontSize: 20,
  },
});
