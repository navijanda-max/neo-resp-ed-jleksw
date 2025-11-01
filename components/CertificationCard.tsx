
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { Certification } from '@/types/training';

interface CertificationCardProps {
  certification: Certification;
}

export default function CertificationCard({ certification }: CertificationCardProps) {
  const getStatusColor = () => {
    switch (certification.status) {
      case 'active':
        return colors.success;
      case 'expiring':
        return colors.warning;
      case 'expired':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusIcon = () => {
    switch (certification.status) {
      case 'active':
        return 'checkmark.seal.fill';
      case 'expiring':
        return 'exclamationmark.triangle.fill';
      case 'expired':
        return 'xmark.seal.fill';
      default:
        return 'seal.fill';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: getStatusColor() + '20' }]}>
          <IconSymbol name={getStatusIcon() as any} size={24} color={getStatusColor()} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.name}>{certification.name}</Text>
          <Text style={[styles.status, { color: getStatusColor() }]}>
            {certification.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.dateContainer}>
        <View style={styles.dateRow}>
          <Text style={styles.dateLabel}>Issued:</Text>
          <Text style={styles.dateValue}>{formatDate(certification.issueDate)}</Text>
        </View>
        <View style={styles.dateRow}>
          <Text style={styles.dateLabel}>Expires:</Text>
          <Text style={[styles.dateValue, certification.status === 'expiring' && styles.expiringDate]}>
            {formatDate(certification.expiryDate)}
          </Text>
        </View>
      </View>
    </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  status: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  dateContainer: {
    gap: 8,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  expiringDate: {
    color: colors.warning,
    fontWeight: '600',
  },
});
