
import { StyleSheet } from 'react-native';
import theme from '../../theme/index';

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    padding: theme.spacing.md,
  },

  container: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.md,
  },

  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },

  description: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.secondary,
    marginBottom: 28,
    lineHeight: 22,
  },

  form: {
    width: '100%',
  },

  field: {
    marginBottom: theme.spacing.lg - 2,
  },

  label: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: 9,
  },

  input: {
    width: '100%',
    minHeight: 48,
    borderWidth: 1,
    borderColor: theme.colors.grayLight,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 14,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
    backgroundColor: theme.colors.white,
  },

  textArea: {
    width: '100%',
    minHeight: 240,
    maxHeight: 300,
    overflow: 'scroll',
    borderWidth: 1,
    borderColor: theme.colors.grayLight,
    borderRadius: theme.borderRadius.md,
    padding: 14,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
    backgroundColor: theme.colors.white,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    gap: theme.spacing.sm + 4,
    marginTop: theme.spacing.sm,
  },

  cancelButton: {
    minWidth: 110,
    minHeight: 46,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.grayLight,
  },

  cancelButtonText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
  },

  submitButton: {
    minWidth: 130,
    minHeight: 46,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primary,
  },

  submitButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
  },

  disabledButton: {
    opacity: 0.6,
  },
});

export default styles;
