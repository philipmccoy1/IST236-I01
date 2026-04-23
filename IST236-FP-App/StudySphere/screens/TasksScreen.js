import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../constants/colors';
import { ThemeContext } from '../context/ThemeContext';

const starterTasks = [
  { id: '1', title: 'Finish discussion post', course: 'IST 236', completed: false },
  { id: '2', title: 'Review React Navigation', course: 'Mobile Apps', completed: true },
  { id: '3', title: 'Study for quiz', course: 'Web Development', completed: false },
];

export default function TasksScreen() {
  const { themeColors } = useContext(ThemeContext);

  const [taskTitle, setTaskTitle] = useState('');
  const [course, setCourse] = useState('');
  const [tasks, setTasks] = useState(starterTasks);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedCourse, setEditedCourse] = useState('');

  function addTask() {
    if (!taskTitle.trim() || !course.trim()) {
      Alert.alert('Missing Information', 'Please enter both a task title and a course name.');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      course: course.trim(),
      completed: false,
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
    setTaskTitle('');
    setCourse('');
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function openEditModal(task) {
    setSelectedTaskId(task.id);
    setEditedTitle(task.title);
    setEditedCourse(task.course);
    setModalVisible(true);
  }

  function saveEdit() {
    if (!editedTitle.trim() || !editedCourse.trim()) {
      Alert.alert('Missing Information', 'Please fill in both edit fields before saving.');
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === selectedTaskId
          ? { ...task, title: editedTitle.trim(), course: editedCourse.trim() }
          : task
      )
    );

    setModalVisible(false);
    setSelectedTaskId(null);
    setEditedTitle('');
    setEditedCourse('');
  }

  function deleteTask(id) {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
        },
      },
    ]);
  }

  function renderTask({ item }) {
    return (
      <View style={[styles.taskCard, { backgroundColor: themeColors.card }]}>
        <Pressable onPress={() => toggleTask(item.id)} style={styles.checkButton}>
          <Ionicons
            name={item.completed ? 'checkbox' : 'square-outline'}
            size={28}
            color={item.completed ? Colors.accent : Colors.primary}
          />
        </Pressable>

        <View style={styles.taskInfo}>
          <Text
            style={[
              styles.taskTitle,
              { color: themeColors.text },
              item.completed && styles.completedText,
              item.completed && { color: themeColors.lightText },
            ]}
          >
            {item.title}
          </Text>
          <Text style={[styles.taskCourse, { color: themeColors.lightText }]}>{item.course}</Text>
        </View>

        <View style={styles.taskButtons}>
          <Pressable style={styles.smallButton} onPress={() => openEditModal(item)}>
            <Ionicons name="create-outline" size={18} color={Colors.white} />
          </Pressable>

          <Pressable
            style={[styles.smallButton, styles.deleteButton]}
            onPress={() => deleteTask(item.id)}
          >
            <Ionicons name="trash-outline" size={18} color={Colors.white} />
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.heading, { color: themeColors.text }]}>Tasks</Text>
        <Text style={[styles.subheading, { color: themeColors.lightText }]}>
          Add, edit, and manage your study tasks.
        </Text>

        <View style={[styles.formCard, { backgroundColor: themeColors.card }]}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: themeColors.input,
                color: themeColors.text,
              },
            ]}
            placeholder="Task title"
            value={taskTitle}
            onChangeText={setTaskTitle}
            placeholderTextColor={themeColors.lightText}
          />

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: themeColors.input,
                color: themeColors.text,
              },
            ]}
            placeholder="Course or category"
            value={course}
            onChangeText={setCourse}
            placeholderTextColor={themeColors.lightText}
          />

          <Pressable style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>Add Task</Text>
          </Pressable>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: themeColors.lightText }]}>
              No tasks yet. Add your first one above.
            </Text>
          }
        />

        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={[styles.modalOverlay, { backgroundColor: themeColors.overlay }]}>
            <View style={[styles.modalCard, { backgroundColor: themeColors.card }]}>
              <Text style={[styles.modalTitle, { color: themeColors.text }]}>Edit Task</Text>

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: themeColors.input,
                    color: themeColors.text,
                  },
                ]}
                placeholder="Task title"
                value={editedTitle}
                onChangeText={setEditedTitle}
                placeholderTextColor={themeColors.lightText}
              />

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: themeColors.input,
                    color: themeColors.text,
                  },
                ]}
                placeholder="Course or category"
                value={editedCourse}
                onChangeText={setEditedCourse}
                placeholderTextColor={themeColors.lightText}
              />

              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </Pressable>

                <Pressable style={styles.modalButton} onPress={saveEdit}>
                  <Text style={styles.modalButtonText}>Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontFamily: 'poppins-bold',
    fontSize: 28,
  },
  subheading: {
    fontFamily: 'poppins-regular',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 16,
  },
  formCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontFamily: 'poppins-regular',
    fontSize: 14,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'poppins-bold',
    color: Colors.white,
    fontSize: 15,
  },
  listContent: {
    paddingBottom: 30,
  },
  taskCard: {
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkButton: {
    marginRight: 12,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontFamily: 'poppins-bold',
    fontSize: 16,
  },
  taskCourse: {
    fontFamily: 'poppins-regular',
    fontSize: 13,
    marginTop: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  taskButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  smallButton: {
    backgroundColor: Colors.info,
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: Colors.danger,
  },
  emptyText: {
    fontFamily: 'poppins-regular',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontFamily: 'poppins-bold',
    fontSize: 20,
    marginBottom: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#6B7280',
  },
  modalButtonText: {
    fontFamily: 'poppins-bold',
    color: Colors.white,
  },
});