import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Progessbar from '../../components/Progessbar';
import TextList from './TextList';
import voiceData from '../../data/voice-detect.json';
import {tickToNanoS, Time, timeConvert} from '../../util/datetime';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Player from '../../components/Player';
import {OnProgressData, VideoRef} from 'react-native-video';
import {fixedNum} from '../../util/num';

const maxS = timeConvert(tickToNanoS(voiceData.Duration), Time.nanoSecond);
console.log(maxS);

const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.01);

const Home = () => {
  const vidRef = useRef<VideoRef>(null);
  const [currProg, setCurrProg] = useState(0);
  const [isPause, setIsPause] = useState(false);

  const handleSliderChange = (val: number) => {
    setCurrProg(val);
  };

  const handleSliderDrag = () => {
    console.log('pause');

    setIsPause(true);
  };

  const handleSliderDragEnd = () => {
    console.log('keep');

    setIsPause(false);
  };

  const handleProgressVideo = (data: OnProgressData) => {
    const currSec = fixedNum(data.currentTime, 2);
    console.log(currSec);

    setCurrProg(currSec);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textListContainer}>
        <TextList data={voiceData.NBest[0]} currTime={currProg} />
      </View>

      <View style={styles.pgContainer}>
        <Progessbar
          val={currProg}
          decimalCount={2}
          maxVal={maxS}
          onChange={handleSliderChange}
          onDragging={handleSliderDrag}
          onDraggingEnd={handleSliderDragEnd}
        />
      </View>

      <Player
        ref={vidRef}
        isPause={isPause}
        uri="https://leecuong666.github.io/resource/test.mp3"
        onProgessVideo={handleProgressVideo}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textListContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  pgContainer: {
    flexGrow: 0.03,
    width: '100%',
    alignItems: 'center',
  },
});

export default Home;
