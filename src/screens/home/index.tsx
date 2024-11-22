/* eslint-disable prettier/prettier */
import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Progessbar from '../../components/Progessbar';
import TextList from './TextList';
import voiceData from '../../data/voice-detect.json';

const Home = () => {
  const [currProg, setCurrProg] = useState(0);

  const handleValChange = (val: number) => {
    console.log(val);

    setCurrProg(val);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textListContainer}>
        <TextList data={voiceData.NBest[0]} currTime={Math.floor(currProg)} />
      </View>

      <View style={styles.pgContainer}>
        <Progessbar
          val={currProg}
          maxVal={voiceData.NBest[0].Words.length - 1}
          onChange={handleValChange}
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
    flexDirection: 'row',
  },

  pgContainer: {
    flexGrow: 0.03,
    width: '100%',
    alignItems: 'center',
  },
});

export default Home;
