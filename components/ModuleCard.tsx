
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { TrainingModule } from '@/types/training';

interface ModuleCardProps {
  module: TrainingModule;
  onPress: () => void;
}

const categoryIcons: Record<string, string> = {
  ventilation: 'wind',
  equipment: 'wrench.and.screwdriver.fill',
  procedures: 'hand.raised.fill',
  safety: 'shield.fill',
  protocols: 'doc.text.fill',
};

const categoryColors: Record<string, string> = {
  ventilation: '#03A9F4',
  equipment: '#4FC3F7',
  procedures: '#81D4FA',
  safety: '#FF9800',
  protocols: '#4CAF50',
};

export default function ModuleCard({ module, onPress }: ModuleCardProps) {
  const categoryColor = categoryColors[module.category] || colors.accent;
  const icon = categoryIcons[module.category] || 'book.fill';

  const getDaysUntilDue = () => {
    if (!module.dueDate) return null;
    const now = new Date();
    const due = new Date(module.dueDate);
    const days = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const daysUntilDue = getDaysUntilDue();

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [
      styles.card,
      pressed && styles.cardPressed,
    ]}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: categoryColor + '20' }]}>
          <IconSymbol name={icon as any} size={24} color={categoryColor} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={2}>{module.title}</Text>
          <Text style={styles.category}>{module.category.toUpperCase()}</Text>
        </View>
        {module.completed && (
          <View style={styles.completedBadge}>
            <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
          </View>
        )}
      </View>

      <Text style={styles.description} numberOfLines={2}>{module.description}</Text>

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <IconSymbol name="clock.fill" size={16} color={colors.textSecondary} />
          <Text style={styles.footerText}>{module.duration} min</Text>
        </View>

        {module.completed && module.score && (
          <View style={styles.footerItem}>
            <IconSymbol name="star.fill" size={16} color={colors.warning} />
            <Text style={styles.footerText}>{module.score}%</Text>
          </View>
        )}

        {!module.completed && daysUntilDue !== null && (
          <View style={styles.footerItem}>
            <IconSymbol 
              name="calendar" 
              size={16} 
              color={daysUntilDue <= 7 ? colors.error : colors.textSecondary} 
            />
            <Text style={[
              styles.footerText,
              daysUntilDue <= 7 && styles.urgentText
            ]}>
              {daysUntilDue <= 0 ? 'Overdue' : `${daysUntilDue} days`}
            </Text>
          </View>
        )}

        {module.required && (
          <View style={styles.requiredBadge}>
            <Text style={styles.requiredText}>Required</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.7,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  category: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  completedBadge: {
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  urgentText: {
    color: colors.error,
    fontWeight: '600',
  },
  requiredBadge: {
    backgroundColor: colors.accent + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 'auto',
  },
  requiredText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.accent,
  },
});
