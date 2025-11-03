
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Alert } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { getUser, addCourseToUser, removeCourseFromUser } from '@/services/user';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { colors } from '@/styles/commonStyles';

export default function ManageCoursesScreen() {
  const { userId } = useLocalSearchParams();
  const [user, setUser] = useState(null);
  const [allModules, setAllModules] = useState([]);
  const [userCourses, setUserCourses] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const fetchData = async () => {
    // Fetch user details
    const userData = await getUser(userId);
    setUser(userData);
    setUserCourses(userData.courses || []);

    // Fetch all modules
    const modulesCollection = collection(db, 'modules');
    const modulesSnapshot = await getDocs(modulesCollection);
    const modulesList = modulesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAllModules(modulesList);
  };

  const handleToggleCourse = async (moduleId, isEnrolled) => {
    try {
      if (isEnrolled) {
        await removeCourseFromUser(userId, moduleId);
        setUserCourses(prev => prev.filter(id => id !== moduleId));
        Alert.alert('Success', 'Course removed from user.');
      } else {
        await addCourseToUser(userId, moduleId);
        setUserCourses(prev => [...prev, moduleId]);
        Alert.alert('Success', 'Course added to user.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update courses.');
      console.error(error);
    }
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <Stack.Screen 
        options={{
          title: `Manage Courses`,
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Managing Courses for</Text>
        <Text style={styles.email}>{user.email}</Text>

        <FlatList
          data={allModules}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const isEnrolled = userCourses.includes(item.id);
            return (
              <View style={styles.moduleItem}>
                <Text style={styles.moduleTitle}>{item.title}</Text>
                <Button
                  title={isEnrolled ? 'Remove' : 'Add'}
                  onPress={() => handleToggleCourse(item.id, isEnrolled)}
                  color={isEnrolled ? colors.error : colors.primary}
                />
              </View>
            );
          }}
          style={styles.list}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  email: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  list: {
    marginTop: 16,
  },
  moduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 8,
    marginBottom: 12,
  },
  moduleTitle: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
});
