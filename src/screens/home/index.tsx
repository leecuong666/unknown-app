import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import TextList from './TextList';
import voiceData from '../../data/voice-detect.json';
import Player from '../../components/Player';
import {OnLoadData, OnProgressData, VideoRef} from 'react-native-video';
import {fixedNum} from '../../util/num';
import SliderBar from '../../components/Slider';
import Progessbar from '../../components/Progessbar';

const url = `https://leecuong666.github.io/resource/test.mp3`;

const Home = () => {
  const vidRef = useRef<VideoRef>(null);
  const [currProg, setCurrProg] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleSliderChange = (val: number) => {
    const seek = fixedNum(val, 2);
    vidRef.current?.seek(seek);
    setCurrProg(seek);
  };

  // const handleSliderDrag = () => {
  //   vidRef.current?.pause();
  // };

  // const handleSliderDragEnd = () => {
  //   vidRef.current?.resume();
  // };

  const handleLoadVideo = useCallback((data: OnLoadData) => {
    setCurrProg(fixedNum(data.currentTime, 2));
    setDuration(fixedNum(data.duration, 2));
  }, []);

  const handleProgressVideo = (data: OnProgressData) => {
    const currSec = fixedNum(data.currentTime, 2);

    setCurrProg(currSec);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textListContainer}>
        <TextList data={voiceData.NBest[0]} currTime={currProg} />
      </View>

      <View style={styles.pgContainer}>
        {/* <Progessbar
          val={currProg}
          decimalCount={2}
          maxVal={duration}
          onChange={handleSliderChange}
          onDragging={handleSliderDrag}
          onDraggingEnd={handleSliderDragEnd}
        /> */}

        <SliderBar
          currTime={currProg}
          duration={duration}
          onSliderChange={handleSliderChange}
          // onSliderStart={handleSliderDrag}
          // onSliderEnd={handleSliderDragEnd}
        />
      </View>

      <Player
        uri={url}
        ref={vidRef}
        isRepeat={true}
        onLoadVideo={handleLoadVideo}
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
