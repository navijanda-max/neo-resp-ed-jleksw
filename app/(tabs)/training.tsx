
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { useTrainingData } from '@/hooks/useTrainingData';
import ModuleCard from '@/components/ModuleCard';

type FilterType = 'all' | 'completed' | 'pending' | 'required';

export default function TrainingScreen() {
  const router = useRouter();
  const { modules } = useTrainingData();
  const [filter, setFilter] = useState<FilterType>('all');

  const getFilteredModules = () => {
    switch (filter) {
      case 'completed':
        return modules.filter(m => m.completed);
      case 'pending':
        return modules.filter(m => !m.completed);
      case 'required':
        return modules.filter(m => m.required);
      default:
        return modules;
    }
  };

  const filteredModules = getFilteredModules();

  const FilterButton = ({ type, label }: { type: FilterType; label: string }) => (
    <Pressable
      style={[styles.filterButton, filter === type && styles.filterButtonActive]}
      onPress={() => setFilter(type)}
    >
      <Text style={[styles.filterText, filter === type && styles.filterTextActive]}>
        {label}
      </Text>
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Training Modules',
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
        }}
      />
      <View style={styles.container}>
        {/* Filter Bar */}
        <View style={styles.filterBar}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContent}
          >
            <FilterButton type="all" label="All" />
            <FilterButton type="pending" label="Pending" />
            <FilterButton type="completed" label="Completed" />
            <FilterButton type="required" label="Required" />
          </ScrollView>
        </View>

        {/* Modules List */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {filteredModules.length > 0 ? (
            <>
              <Text style={styles.resultCount}>
                {filteredModules.length} {filteredModules.length === 1 ? 'module' : 'modules'}
              </Text>
              {filteredModules.map(module => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  onPress={() => router.push(`/module/${module.id}`)}
                />
              ))}
            </>
          ) : (
            <View style={styles.emptyState}>
              <IconSymbol name="tray.fill" size={64} color={colors.textSecondary} />
              <Text style={styles.emptyText}>No modules found</Text>
              <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
            </View>
          )}

          {/* Bottom Padding for Tab Bar */}
          <View style={styles.bottomPadding} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterBar: {
    backgroundColor: colors.card,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  filterButtonActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  filterTextActive: {
    color: colors.card,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  resultCount: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  bottomPadding: {
    height: 100,
  },
});
