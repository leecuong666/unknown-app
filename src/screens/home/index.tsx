import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {OnProgressData, VideoRef} from 'react-native-video';
import Player from '../../components/Player';
import SliderBar from '../../components/Slider';
import TextList from './Textlist';
import voiceData from '../../constants/data.json';
import {ChevronLeft, ChevronRight, Pause, Play} from 'lucide-react-native';
import Speed from './Speed';
import {tickToNanoS, Time, timeConvert} from '../../util/datetime';

type AudioTimer = {currTime: number; duration: number};
type WordTrack = {pos: number; offset: number};

const uri = 'https://leecuong666.github.io/resource/longvoice.mp3';
const words = voiceData.NBest[0].Words;

const Home = () => {
  const vidRef = useRef<VideoRef>(null);
  const [{currTime, duration}, setTimerAudio] = useState<AudioTimer>({
    currTime: 0,
    duration: 0,
  });
  const [isPause, setIsPause] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [wordTracking, setWordTracking] = useState<WordTrack>({
    pos: -1,
    offset: 0,
  });

  const handlePlayingVid = (e: OnProgressData) => {
    const {currentTime, playableDuration} = e;

    if (duration === 0) {
      setTimerAudio({currTime: currentTime, duration: playableDuration});
    } else {
      setTimerAudio(obj => ({...obj, currTime: currentTime}));
    }
  };

  const handleEndVid = () => {
    handlePause();
  };

  const handleSeekAudio = (t: number) => {
    vidRef.current?.seek(t);
  };

  const handleResume = async () => {
    if (currTime === duration) {
      handleSeekAudio(0);
    }

    setIsPause(false);
  };

  const handlePause = () => {
    setIsPause(true);
  };

  const handlePauseAudio = () => {
    handlePause();
    setWordTracking(info => ({...info, pos: -1}));
  };

  const handleSeekText = (n: number, offset: number) => {
    setWordTracking({pos: n, offset: offset});

    handleSeekAudio(offset);
    handlePause();
  };

  const handlePickText = (t: number) => {
    const newPos = wordTracking.pos + t;

    if (newPos > -1 && newPos < words.length) {
      setWordTracking(info => ({...info, pos: newPos}));
      const offset = timeConvert(
        tickToNanoS(words[newPos].Offset),
        Time.nanoSecond,
      );

      handleSeekAudio(offset);
      handlePause();
    }
  };

  const handleSpeedChange = (s: number) => {
    setSpeed(s);
  };

  const trackWordHL = (n: number, offset: number) => {
    if (wordTracking.pos !== n) {
      setWordTracking({pos: n, offset: offset});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Player
        ref={vidRef}
        uri={uri}
        pause={isPause}
        rate={speed}
        intervalUpdate={10}
        onVideoPlaying={handlePlayingVid}
        onVideoEnd={handleEndVid}
      />
      <View style={styles.textListContainer}>
        <TextList
          textHL={wordTracking.pos}
          data={words}
          currTime={currTime}
          onSeekText={handleSeekText}
          onTextHLChange={trackWordHL}
        />
      </View>

      <View style={styles.pgContainer}>
        <SliderBar currTime={currTime} duration={duration} disabled={true} />

        <Speed
          speed={speed}
          onSpeedChange={handleSpeedChange}
          style={{marginLeft: 16}}
        />
      </View>

      <View style={styles.controlContainer}>
        <ChevronLeft
          size={40}
          color={'gray'}
          onPress={() => handlePickText(-1)}
        />

        {isPause ? (
          <Play size={40} color={'gray'} onPress={handleResume} />
        ) : (
          <Pause size={40} color={'gray'} onPress={handlePauseAudio} />
        )}

        <ChevronRight
          size={40}
          color={'gray'}
          onPress={() => handlePickText(1)}
        />
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  pgContainer: {
    flexGrow: 0.01,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  controlContainer: {
    flexGrow: 0.03,
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Home;
