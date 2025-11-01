
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { useTrainingData } from '@/hooks/useTrainingData';
import CertificationCard from '@/components/CertificationCard';
import StatCard from '@/components/StatCard';

export default function ProfileScreen() {
  const { stats, certifications, modules } = useTrainingData();

  const completedModules = modules.filter(m => m.completed);
  const recentlyCompleted = completedModules
    .sort((a, b) => {
      if (!a.completedDate || !b.completedDate) return 0;
      return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime();
    })
    .slice(0, 3);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'My Profile',
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
        }}
      />
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <IconSymbol name="person.circle.fill" size={80} color={colors.accent} />
          </View>
          <Text style={styles.name}>Respiratory Therapist</Text>
          <Text style={styles.role}>NICU Department</Text>
        </View>

        {/* Stats Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            <StatCard
              icon="book.fill"
              value={stats.completedModules}
              label="Completed"
              color={colors.success}
            />
            <StatCard
              icon="clock.fill"
              value={stats.totalModules - stats.completedModules}
              label="Remaining"
              color={colors.accent}
            />
          </View>
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
        </View>

        {/* Certifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          {certifications.map(cert => (
            <CertificationCard key={cert.id} certification={cert} />
          ))}
        </View>

        {/* Recently Completed */}
        {recentlyCompleted.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recently Completed</Text>
            {recentlyCompleted.map(module => (
              <View key={module.id} style={styles.completedItem}>
                <View style={styles.completedIcon}>
                  <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
                </View>
                <View style={styles.completedContent}>
                  <Text style={styles.completedTitle}>{module.title}</Text>
                  <View style={styles.completedMeta}>
                    <Text style={styles.completedDate}>
                      {module.completedDate && new Date(module.completedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </Text>
                    {module.score && (
                      <>
                        <Text style={styles.completedDot}>•</Text>
                        <Text style={styles.completedScore}>Score: {module.score}%</Text>
                      </>
                    )}
                  </View>
                </View>
              </View>
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
  profileHeader: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  completedItem: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  completedIcon: {
    marginRight: 12,
  },
  completedContent: {
    flex: 1,
  },
  completedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  completedMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  completedDate: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  completedDot: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  completedScore: {
    fontSize: 13,
    color: colors.success,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 100,
  },
});
