
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import AuthForm from '@/components/AuthForm';
import { onAuthStateChange, logout } from '@/services/auth';
import { getUser, addCourseToUser, removeCourseFromUser } from '@/services/user';
import { seedDatabase } from '@/services/training';
import trainingData from '@/data/training.json';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      if (user) {
        const userData = await getUser(user.uid);
        setUser(user);
        setIsAdmin(userData?.isAdmin || false);
        if (userData?.isAdmin) {
          fetchAllUsers();
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchAllUsers = async () => {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(usersList);
  };

  const handleSeedDatabase = async () => {
    try {
      await seedDatabase(trainingData);
      Alert.alert('Success', 'Database seeded successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to seed database. It may already be seeded.');
      console.error(error);
    }
  };

  const handleUserPress = (selectedUser) => {
    if (isAdmin) {
      // Navigate to a new screen to manage user courses
      router.push(`/admin/manage-courses?userId=${selectedUser.id}`);
    }
  };

  if (!user) {
    return (
      <>
        <Stack.Screen
          options={{
            title: isLogin ? 'Login' : 'Register',
            headerStyle: { backgroundColor: colors.card },
            headerTintColor: colors.text,
          }}
        />
        <View style={styles.authContainer}>
          <AuthForm isLogin={isLogin} />
          <Button 
            title={isLogin ? 'Create an account' : 'Already have an account?'}
            onPress={() => setIsLogin(!isLogin)}
            color={colors.primary}
          />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'My Profile',
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
        }}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome, {user.email}</Text>
          <Button title="Logout" onPress={logout} color={colors.error} />
        </View>
        
        {isAdmin && (
          <View style={styles.adminSection}>
            <Text style={styles.adminTitle}>Admin Tools</Text>
            <View style={styles.adminActions}>
              <Button title="Seed Database" onPress={handleSeedDatabase} color={colors.primary} />
            </View>
            
            <Text style={styles.userListTitle}>Manage User Courses</Text>
            <FlatList
              data={users}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.userItemContainer}>
                  <Text style={styles.userEmail}>{item.email}</Text>
                  <Button 
                    title="Manage" 
                    onPress={() => handleUserPress(item)} 
                    color={colors.accent}
                  />
                </View>
              )}
              style={styles.userList}
            />
          </View>
        )}

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
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  adminSection: {
    marginTop: 20,
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
  },
  adminTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  adminActions: {
    marginBottom: 24,
  },
  userListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  userList: {
    maxHeight: 300,
  },
  userItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  userEmail: {
    fontSize: 16,
    color: colors.text,
  },
});
