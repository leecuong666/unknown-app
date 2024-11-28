import React, {forwardRef} from 'react';
import Video, {OnProgressData} from 'react-native-video';

interface Props {
  uri: string;
  repeat?: boolean;
  muted?: boolean;
  pause?: boolean;
  rate?: number;
  intervalUpdate?: number;
  onVideoPlaying?: (e: OnProgressData) => void;
  onVideoEnd?: () => void;
}

const Player = (
  {
    uri,
    repeat = false,
    muted = false,
    pause = false,
    rate = 1,
    intervalUpdate = 200,
    onVideoPlaying,
    onVideoEnd,
  }: Props,
  ref: any,
) => {
  return (
    <Video
      ref={ref}
      source={{uri}}
      repeat={repeat}
      muted={muted}
      paused={pause}
      rate={rate}
      progressUpdateInterval={intervalUpdate}
      onProgress={onVideoPlaying}
      onEnd={onVideoEnd}
    />
  );
};

export default forwardRef(Player);
