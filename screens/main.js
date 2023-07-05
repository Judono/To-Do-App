import React, {useEffect, useState} from 'react';
import { KeyboardAvoidingView, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from '../components/task';
import styles from './styles';

export default function Todo({isDark}) {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks(taskItems);
  }, [taskItems]);

  async function loadTasks() {
    const savedTasks = await AsyncStorage.getItem('tasks');
    if (savedTasks) {
        setTaskItems(JSON.parse(savedTasks));
    }
  }

  async function saveTasks(tasks) {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  }

  const handleAddTask = () => {
    if (task && task.trim()) {
      Keyboard.dismiss();
      setTaskItems((prevTaskItems) => {
        return [...prevTaskItems, task];
      });
      setTask('');
    } else {
      alert('Please enter a valid task');
    }
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={isDark ? [styles.container, {backgroundColor: '#434b56'}] : styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
      <View style={styles.tasksWrapper}>
        <Text style={isDark ? [styles.sectionTitle, {color: "#fff"}] : styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} isDark={isDark}/> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
      </ScrollView>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={isDark ? [styles.input, {backgroundColor: '#14161a', color:'#fff'}] : styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={isDark ? [styles.addWrapper, {backgroundColor: '#14161a', color:'#fff'}] : styles.addWrapper}>
            <Text style={isDark ? [styles.addText, {color:'#fff'}] : styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}