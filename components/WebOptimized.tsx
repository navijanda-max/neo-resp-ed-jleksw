
import React from 'react';
import { Platform, View, ViewProps } from 'react-native';

/**
 * WebOptimized component wrapper
 * Adds web-specific optimizations while maintaining mobile compatibility
 */
interface WebOptimizedProps extends ViewProps {
  children: React.ReactNode;
  enableScrollOptimization?: boolean;
}

export default function WebOptimized({
  children,
  enableScrollOptimization = true,
  style,
  ...props
}: WebOptimizedProps) {
  // Web-specific styles
  const webStyles = Platform.OS === 'web' ? {
    // Enable hardware acceleration
    transform: [{ translateZ: 0 }],
    // Optimize scrolling on web
    ...(enableScrollOptimization && {
      WebkitOverflowScrolling: 'touch',
      overflowScrolling: 'touch',
    }),
  } : {};

  return (
    <View style={[style, webStyles]} {...props}>
      {children}
    </View>
  );
}
