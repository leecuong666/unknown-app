import {StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';

interface Props {
  currTime: number;
  duration: number;
  style?: ViewStyle;
  disabled?: boolean;
  onSliderChange?: (t: number) => void;
  onSliderStart?: () => void;
  onSliderEnd?: () => void;
}

const SliderBar = ({
  currTime,
  duration,
  disabled = false,
  onSliderChange,
  onSliderStart,
  onSliderEnd,
}: Props) => {
  const handleSliceChange = (time: number) => {
    onSliderChange && onSliderChange(time);
  };

  return (
    <Slider
      style={styles.container}
      disabled={disabled}
      value={currTime}
      minimumValue={0}
      maximumValue={duration}
      step={0.01}
      onValueChange={handleSliceChange}
      onSlidingStart={onSliderStart}
      onSlidingComplete={onSliderEnd}
      maximumTrackTintColor={'gray'}
      minimumTrackTintColor={'#4CAF50'}
    />
  );
};

export default SliderBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
