import React from 'react';
import {NBest} from '../../types/voiceText';
import {FlashList} from '@shopify/flash-list';
import TextHighlight from './TextHighlight';
import {FlatList, StyleSheet} from 'react-native';

interface Props {
  data: NBest;
  currTime: number;
}

const TextList = ({data, currTime}: Props) => {
  return (
    <FlatList
      data={data.Words}
      renderItem={({item, index}) => (
        <TextHighlight {...item} isHL={currTime === index} />
      )}
      horizontal
      scrollEnabled={false}
      extraData={currTime}
      contentContainerStyle={style.flatlistContainer}
    />
  );
};

const style = StyleSheet.create({
  flatlistContainer: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TextList;
