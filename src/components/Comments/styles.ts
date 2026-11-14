
import { StyleSheet } from 'react-native';
import theme from '../../theme/';

export const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: '#FAFAFA',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.grayLight,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },

  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },

  countBadge: {
    minWidth: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xs,
  },

  countText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
  },

  emptyContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },

  emptyText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
  },

  emptyDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.secondary,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },

  formContainer: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.grayLight,
  },

  formTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },

  input: {
    minHeight: 90,
    maxHeight: 150,
    borderWidth: 1,
    borderColor: theme.colors.grayLight,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
  },

  formFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },

  counter: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.secondary,
  },

  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primary,
    minWidth: 105,
    minHeight: 42,
  },

  submitText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
  },

  pressed: {
    opacity: 0.75,
  },

  disabledButton: {
    opacity: 0.6,
  },

  error: {
    color: theme.colors.error,
    fontSize: theme.typography.fontSize.sm,
    marginTop: theme.spacing.sm,
  },

  
loginNotice: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.colors.white,
  borderWidth: 1,
  borderColor: theme.colors.grayLight,
  borderRadius: theme.borderRadius.md,
  padding: theme.spacing.md,
  marginTop: theme.spacing.lg,
  gap: theme.spacing.md,
},

loginNoticeContent: {
  flex: 1,
},

loginNoticeTitle: {
  fontSize: theme.typography.fontSize.md,
  fontWeight: theme.typography.fontWeight.bold,
  color: theme.colors.text,
},

loginNoticeDescription: {
  fontSize: theme.typography.fontSize.sm,
  color: theme.colors.secondary,
  marginTop: theme.spacing.xs,
},

});
