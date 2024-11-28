import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

interface Props {
  word: string;
  isHighlight: boolean;
  onWordPress: () => void;
}

const TextHL = ({word, isHighlight, onWordPress}: Props) => {
  return (
    <Pressable
      onPress={onWordPress}
      style={[
        styles.container,
        {backgroundColor: isHighlight ? 'yellow' : 'transparent'},
      ]}>
      <Text style={[styles.wordStyle, {color: isHighlight ? 'white' : 'gray'}]}>
        {word}
      </Text>
    </Pressable>
  );
};

export default TextHL;

const styles = StyleSheet.create({
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
