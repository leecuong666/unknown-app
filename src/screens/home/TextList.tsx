import React, {useCallback} from 'react';
import {NBest, Word as WordType} from '../../types/voiceText';
import TextHighlight from '../../components/TextHighlight';
import {FlatList, StyleSheet} from 'react-native';
import {tickToNanoS, Time, timeConvert} from '../../util/datetime';

interface Props {
  data: NBest;
  currTime: number;
}

const TextList = ({data, currTime}: Props) => {
  const renderItem = useCallback(
    ({item}: {item: WordType}) => {
      const {Word, Offset, Duration} = item;

      const newOffset = timeConvert(tickToNanoS(Offset), Time.nanoSecond);
      const newDuration = timeConvert(tickToNanoS(Duration), Time.nanoSecond);

      const isHighlight =
        currTime >= newOffset && currTime <= newOffset + newDuration;

      return <TextHighlight word={Word} isHL={isHighlight} />;
    },
    [currTime],
  );

  return (
    <FlatList
      data={data.Words}
      renderItem={renderItem}
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
