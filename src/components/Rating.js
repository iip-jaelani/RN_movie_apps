/*
 * only star icon
 * credit => iip jaelani
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Rating = ({count, sizeIcon, colorIcon, maxLengthStart, style}) => {
  var nameIcon = '';
  let fill = 'md-star';
  let half = 'md-star-half';
  let empty = 'md-star-outline';
  let max = maxLengthStart || 5;
  let numberRating = Math.round(count * 2) / 3;
  var startItem = [];
  for (let i = 0; i < max; i++) {
    if (numberRating >= 1) {
      nameIcon = fill;
    } else if (numberRating > 0.5 && numberRating < 1) {
      nameIcon = half;
    } else {
      nameIcon = empty;
    }
    const item = (
      <Ionicons
        name={nameIcon}
        color={colorIcon || '#F4D03F'}
        size={sizeIcon || 10}
      />
    );
    startItem.push(item);
    numberRating -= 1;
  }
  return <View style={[styles.container, style]}>{startItem}</View>;
};
export default Rating;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
