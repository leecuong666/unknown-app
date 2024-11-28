import React, {useCallback, useEffect} from 'react';
import {Word as WordType} from '../../types/voice';
import {FlatList, StyleSheet} from 'react-native';
import {tickToNanoS, Time, timeConvert} from '../../util/datetime';
import TextHL from '../../components/TextHL';

interface Props {
  textHL: number;
  data: WordType[];
  currTime: number;
  onSeekText: (idx: number, offset: number) => void;
  onTextHLChange?: (idx: number, offset: number) => void;
}

interface TextWrapperProps extends Props {
  item: WordType;
  index: number;
}

const TextWrapper = ({
  item,
  index,
  textHL,
  currTime,
  onSeekText,
  onTextHLChange,
}: TextWrapperProps) => {
  const {Word, Offset, Duration} = item;

  const isHighlight = textHL === index;

  const newOffset = timeConvert(tickToNanoS(Offset), Time.nanoSecond);
  const newDuration = timeConvert(tickToNanoS(Duration), Time.nanoSecond);

  useEffect(() => {
    if (currTime >= newOffset && currTime < newOffset + newDuration) {
      onTextHLChange && onTextHLChange(index, newOffset);
    }
  }, [currTime]);

  return (
    <TextHL
      word={Word}
      isHighlight={isHighlight}
      onWordPress={() => onSeekText(index, newOffset)}
    />
  );
};

const TextList = (props: Props) => {
  const {textHL, data, currTime} = props;

  const renderItem = useCallback(
    ({item, index}: {item: WordType; index: number}) => {
      return <TextWrapper item={item} index={index} {...props} />;
    },
    [currTime, textHL],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.Offset.toString()}
      horizontal
      scrollEnabled={false}
      contentContainerStyle={styles.flatlistContainer}
      removeClippedSubviews
      getItemLayout={(_, index) => ({length: 40, offset: 40 * index, index})}
    />
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    borderRadius: 6,
    padding: 3.6,
  },

  wordStyle: {
    fontSize: 36,
    fontWeight: '600',
    color: 'gray',
  },
});

export default TextList;
