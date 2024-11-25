import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';

interface Props {
  currTime: number;
  duration: number;
  style?: ViewStyle;
  onSliderChange: (t: number) => void;
  onSliderStart?: () => void;
  onSliderEnd?: () => void;
}

const SliderBar = ({
  currTime,
  duration,
  onSliderChange,
  onSliderStart,
  onSliderEnd,
}: Props) => {
  const handleSliceChange = (time: number) => {
    onSliderChange(time);
  };

  return (
    <Slider
      style={styles.container}
      value={currTime}
      minimumValue={0}
      maximumValue={duration}
      step={0.01}
      onValueChange={handleSliceChange}
      onSlidingStart={onSliderStart}
      onSlidingComplete={onSliderEnd}
      maximumTrackTintColor={'gray'}
      minimumTrackTintColor={'green'}
    />
  );
};

export default SliderBar;

const styles = StyleSheet.create({
  container: {
    width: '80%',
  },
});
