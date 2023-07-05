import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const Task = (props) => {
  const isDark = props.isDark;

  return (
    <View style={isDark ? [styles.item, {backgroundColor: '#14161a', color:'#C0C0C0'}] : styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={isDark ? [styles.itemText, {color:'#fff'}] : styles.itemText}>{props.text}</Text>
      </View>
      <TouchableOpacity onPress={props.onDelete}>
        <View style={styles.circular}></View>
      </TouchableOpacity>
    </View>
  )
}

export default Task;