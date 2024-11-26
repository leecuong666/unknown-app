import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import TextList from "@/components/home/Textlist";
import voiceData from "@/constants/data/data.json";
import { fixedNum } from "@/util/num";
import SliderBar from "@/components/Slider";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { ChevronRight, ChevronLeft, Play, Pause } from "lucide-react-native";
import Speed from "@/components/home/Speed";

const url = `https://leecuong666.github.io/resource/test.mp3`;
const words = voiceData.NBest[0].Words;

const Home = () => {
  const player = useAudioPlayer(url, 0.01);
  const { currentTime, duration, playbackRate, playing } =
    useAudioPlayerStatus(player);
  const [isDragSlider, setIsDragSlider] = useState(false);
  const [textPicker, setTextPicker] = useState(-1);

  useEffect(() => {
    player.loop = false;
    playAudio();
  }, []);

  const playAudio = () => {
    player.play();
  };

  const pauseAudio = () => {
    player.pause();
  };

  const setSpeed = (s: number) => {
    player.setPlaybackRate(s, "high");
  };

  const seekTime = (t: number) => {
    player.seekTo(t);
  };

  const handleSliderChange = (val: number) => {
    if (isDragSlider) {
      seekTime(val);
    }
    setTextPicker(-1);
  };

  const handleDragSlider = useCallback(() => {
    setIsDragSlider(true);
  }, []);

  const handleDragSliderEnd = useCallback(() => {
    setIsDragSlider(false);
    playAudio();
  }, []);

  const changeAudioSpeed = (s: number) => {
    setSpeed(s);
  };

  const handleSeekText = (t: number) => {
    pauseAudio();
    seekTime(t * 1000);
  };

  const handlePickText = (n: number) => {
    pauseAudio();
    const newPos = textPicker + n;
    if (newPos > -1 && newPos < words.length) {
      setTextPicker(newPos);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textListContainer}>
        <TextList
          textHL={textPicker}
          data={words}
          currTime={fixedNum(currentTime / 1000, 2)}
          onSeekText={handleSeekText}
        />
      </View>

      <View style={styles.pgContainer}>
        <SliderBar
          currTime={currentTime}
          duration={duration}
          onSliderChange={handleSliderChange}
          onSliderStart={handleDragSlider}
          onSliderEnd={handleDragSliderEnd}
        />

        <Speed
          initSpeed={playbackRate}
          onSpeedChange={changeAudioSpeed}
          style={{ marginLeft: 16 }}
        />
      </View>

      <View style={[styles.controlContainer]}>
        <ChevronLeft
          size={40}
          color={"gray"}
          onPress={() => handlePickText(-1)}
        />

        {playing ? (
          <Pause size={40} color={"gray"} onPress={pauseAudio} />
        ) : (
          <Play
            size={40}
            color={"gray"}
            onPress={() => {
              playAudio();
              setTextPicker(-1);
            }}
          />
        )}

        <ChevronRight
          size={40}
          color={"gray"}
          onPress={() => handlePickText(1)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textListContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  pgContainer: {
    flexGrow: 0.02,
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  controlContainer: {
    flexGrow: 0,
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Home;
