import React, { createContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_DATA_KEY = 'studysphere_app_data';

const defaultTasks = [
  { id: '1', title: 'Finish discussion post', course: 'IST 236', completed: false },
  { id: '2', title: 'Review React Navigation', course: 'Mobile Apps', completed: true },
  { id: '3', title: 'Study for quiz', course: 'Web Development', completed: false },
];

const defaultResources = [
  { id: '1', title: 'Khan Academy', url: 'https://www.khanacademy.org' },
  { id: '2', title: 'Quizlet', url: 'https://quizlet.com' },
  { id: '3', title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
];

export const AppDataContext = createContext({
  tasks: [],
  resources: [],
  totalFocusMinutes: 0,
  stats: {
    totalTasks: 0,
    incompleteTasks: 0,
    completedTasks: 0,
    totalResources: 0,
    totalFocusMinutes: 0,
  },
  addTask: () => {},
  editTask: () => {},
  deleteTask: () => {},
  toggleTask: () => {},
  addResource: () => {},
  editResource: () => {},
  deleteResource: () => {},
  addFocusMinutes: () => {},
  isDataReady: false,
});

export default function AppDataProvider({ children }) {
  const [tasks, setTasks] = useState(defaultTasks);
  const [resources, setResources] = useState(defaultResources);
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(0);
  const [isDataReady, setIsDataReady] = useState(false);

  useEffect(() => {
    async function loadAppData() {
      try {
        const savedData = await AsyncStorage.getItem(APP_DATA_KEY);

        if (savedData) {
          const parsedData = JSON.parse(savedData);

          setTasks(Array.isArray(parsedData.tasks) ? parsedData.tasks : defaultTasks);
          setResources(
            Array.isArray(parsedData.resources) ? parsedData.resources : defaultResources
          );
          setTotalFocusMinutes(
            typeof parsedData.totalFocusMinutes === 'number'
              ? parsedData.totalFocusMinutes
              : 0
          );
        }
      } catch (error) {
        console.log('Error loading app data:', error);
      } finally {
        setIsDataReady(true);
      }
    }

    loadAppData();
  }, []);

  useEffect(() => {
    async function saveAppData() {
      if (!isDataReady) return;

      try {
        const dataToSave = {
          tasks,
          resources,
          totalFocusMinutes,
        };

        await AsyncStorage.setItem(APP_DATA_KEY, JSON.stringify(dataToSave));
      } catch (error) {
        console.log('Error saving app data:', error);
      }
    }

    saveAppData();
  }, [tasks, resources, totalFocusMinutes, isDataReady]);

  function addTask(title, course) {
    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      course: course.trim(),
      completed: false,
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }

  function editTask(id, updatedTitle, updatedCourse) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: updatedTitle.trim(),
              course: updatedCourse.trim(),
            }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function addResource(title, url) {
    const newResource = {
      id: Date.now().toString(),
      title: title.trim(),
      url: url.trim(),
    };

    setResources((currentResources) => [newResource, ...currentResources]);
  }

  function editResource(id, updatedTitle, updatedUrl) {
    setResources((currentResources) =>
      currentResources.map((resource) =>
        resource.id === id
          ? {
              ...resource,
              title: updatedTitle.trim(),
              url: updatedUrl.trim(),
            }
          : resource
      )
    );
  }

  function deleteResource(id) {
    setResources((currentResources) =>
      currentResources.filter((resource) => resource.id !== id)
    );
  }

  function addFocusMinutes(minutes) {
    setTotalFocusMinutes((currentMinutes) => currentMinutes + minutes);
  }

  const stats = useMemo(() => {
    const incompleteTasks = tasks.filter((task) => !task.completed).length;
    const completedTasks = tasks.filter((task) => task.completed).length;

    return {
      totalTasks: tasks.length,
      incompleteTasks,
      completedTasks,
      totalResources: resources.length,
      totalFocusMinutes,
    };
  }, [tasks, resources, totalFocusMinutes]);

  return (
    <AppDataContext.Provider
      value={{
        tasks,
        resources,
        totalFocusMinutes,
        stats,
        addTask,
        editTask,
        deleteTask,
        toggleTask,
        addResource,
        editResource,
        deleteResource,
        addFocusMinutes,
        isDataReady,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}