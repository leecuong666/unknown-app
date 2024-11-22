import {LayoutChangeEvent, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

interface Props {
  val: number;
  maxVal?: number;
  onChange: (val: number) => void;
}

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

const Progessbar = ({val, maxVal = 1, onChange}: Props) => {
  const w = useSharedValue(val);
  const scale = useSharedValue(1);
  const [isDrag, setIsDrag] = useState(false);
  const [containerW, setContainerW] = useState(0);

  useEffect(() => {
    if (!isDrag) {
      w.value = withTiming(val * (containerW / maxVal), {
        duration: 200,
        easing: Easing.linear,
      });
    }
  }, [val]);

  const handleProgess = (currProg: number) => {
    const curr = (currProg / containerW) * maxVal;

    onChange(curr);
  };

  const drag = Gesture.Pan()
    .minDistance(0.1)
    .onUpdate(e => {
      setIsDrag(true);
      w.value = withTiming(clamp(e.x, 0, containerW), {
        duration: 100,
        easing: Easing.linear,
      });

      handleProgess(w.value);
    })
    .onBegin(() => {
      scale.value = withTiming(1.12, {
        duration: 500,
        easing: Easing.bezier(0.31, 0.04, 0.03, 1.04),
      });
    })
    .onFinalize(() => {
      setIsDrag(false);
      scale.value = withTiming(1, {
        duration: 250,
        easing: Easing.bezier(0.82, 0.06, 0.42, 1.01),
      });
    })
    .runOnJS(true);

  const scaleStyle = useAnimatedStyle(() => {
    return {transform: [{scale: scale.value}]};
  }, [scale]);

  const dragStyle = useAnimatedStyle(() => {
    return {
      width: w.value,
    };
  }, [w]);

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setContainerW(e.nativeEvent.layout.width);
  }, []);

  return (
    <GestureDetector gesture={drag}>
      <Animated.View
        onLayout={handleLayout}
        style={[styles.container, scaleStyle]}>
        <Animated.View style={[styles.dragger, dragStyle]} />
      </Animated.View>
    </GestureDetector>
  );
};

export default Progessbar;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: 14,
    backgroundColor: 'gray',
    borderRadius: 999,
    alignItems: 'flex-start',
    overflow: 'hidden',
  },

  dragger: {
    height: '100%',
    backgroundColor: 'pink',
    borderRadius: 999,
  },
});
