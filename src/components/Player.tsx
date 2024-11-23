import {ViewStyle} from 'react-native';
import React, {forwardRef} from 'react';
import Video, {OnProgressData, ReactVideoProps} from 'react-native-video';

interface Props {
  uri: string;
  style?: ViewStyle;
  isPause?: boolean;
  isMuted?: boolean;
  isRepeat?: boolean;
  otherProps?: ReactVideoProps;
  onProgessVideo: (data: OnProgressData) => void;
}

const Player = (
  {
    uri,
    style,
    isPause = false,
    isMuted = false,
    isRepeat = true,
    otherProps,
    onProgessVideo,
  }: Props,
  ref: any,
) => {
  return (
    <Video
      ref={ref}
      style={[style]}
      source={{uri}}
      paused={isPause}
      repeat={isRepeat}
      muted={isMuted}
      controls={false}
      progressUpdateInterval={10}
      onProgress={onProgessVideo}
      {...otherProps}
    />
  );
};

export default forwardRef(Player);
