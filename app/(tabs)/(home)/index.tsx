
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { useTrainingData } from '@/hooks/useTrainingData';
import ProgressCircle from '@/components/ProgressCircle';
import StatCard from '@/components/StatCard';
import ModuleCard from '@/components/ModuleCard';

export default function HomeScreen() {
  const router = useRouter();
  const { stats, modules, getUpcomingModules } = useTrainingData();
  
  const upcomingModules = getUpcomingModules().slice(0, 3);
  const progressPercentage = stats.totalModules > 0 
    ? (stats.completedModules / stats.totalModules) * 100 
    : 0;

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => console.log('Notifications pressed')}
      style={styles.headerButton}
    >
      <IconSymbol name="bell.fill" color={colors.accent} size={24} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'NICU RT Education',
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerRight: renderHeaderRight,
        }}
      />
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.subtitle}>Track your NICU education progress</Text>
        </View>

        {/* Progress Circle */}
        <View style={styles.progressSection}>
          <ProgressCircle 
            progress={progressPercentage}
            size={140}
            strokeWidth={12}
            color={colors.accent}
            label="Complete"
          />
          <Text style={styles.progressText}>
            {stats.completedModules} of {stats.totalModules} modules completed
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            icon="star.fill"
            value={stats.averageScore > 0 ? `${stats.averageScore}%` : 'N/A'}
            label="Avg Score"
            color={colors.warning}
          />
          <StatCard
            icon="calendar"
            value={stats.upcomingDue}
            label="Due Soon"
            color={colors.error}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <Pressable 
              style={styles.actionButton}
              onPress={() => router.push('/(tabs)/training')}
            >
              <View style={[styles.actionIcon, { backgroundColor: colors.primary + '20' }]}>
                <IconSymbol name="book.fill" size={28} color={colors.primary} />
              </View>
              <Text style={styles.actionText}>All Modules</Text>
            </Pressable>

            <Pressable 
              style={styles.actionButton}
              onPress={() => router.push('/(tabs)/profile')}
            >
              <View style={[styles.actionIcon, { backgroundColor: colors.secondary + '20' }]}>
                <IconSymbol name="person.fill" size={28} color={colors.secondary} />
              </View>
              <Text style={styles.actionText}>My Progress</Text>
            </Pressable>
          </View>
        </View>

        {/* Upcoming Modules */}
        {upcomingModules.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Training</Text>
              <Pressable onPress={() => router.push('/(tabs)/training')}>
                <Text style={styles.seeAllText}>See All</Text>
              </Pressable>
            </View>
            {upcomingModules.map(module => (
              <ModuleCard
                key={module.id}
                module={module}
                onPress={() => router.push(`/module/${module.id}`)}
              />
            ))}
          </View>
        )}

        {/* Bottom Padding for Tab Bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  headerButton: {
    padding: 8,
    marginRight: 8,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  progressSection: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  progressText: {
    marginTop: 16,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '600',
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  bottomPadding: {
    height: 100,
  },
});
