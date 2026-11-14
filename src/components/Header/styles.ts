
import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.header,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },

  title: {
    color: theme.colors.headerText,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
  },

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },

  greeting: {
    color: theme.colors.headerText,
    fontSize: theme.typography.fontSize.sm,
  },

  logoutButton: {
    backgroundColor: theme.colors.headerHover,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },

  logoutText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },

  pressed: {
    opacity: 0.7,
  },

});
