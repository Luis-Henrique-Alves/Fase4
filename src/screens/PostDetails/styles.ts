import { StyleSheet } from 'react-native';
import theme from '../../theme/';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  content: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
    flexGrow: 0,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },

  loadingText: {
    color: theme.colors.secondary,
    fontSize: theme.typography.fontSize.md,
  },

  postCard: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.grayLight,
    justifyContent: 'space-between',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },

  sectionLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.secondary,
    letterSpacing: 1,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },

  iconButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveIconButton: {
    backgroundColor: theme.colors.success,
  },

  deleteIconButton: {
    backgroundColor: '#FCE8E8',
  },

  pressed: {
    opacity: 0.7,
  },

  titleContainer: {
    marginBottom: theme.spacing.lg,
  },

  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    lineHeight: 32,
  },

  titleInput: {
    borderWidth: 1,
    borderColor: theme.colors.grayLight,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text,
    backgroundColor: theme.colors.white,
  },

  contentContainer: {
    flex: 1,
    marginBottom: theme.spacing.lg,
  },

  postContent: {
    fontSize: theme.typography.fontSize.md,
    lineHeight: 26,
    color: theme.colors.text,
  },

  textArea: {
    minHeight: 180,
    borderWidth: 1,
    borderColor: theme.colors.grayLight,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    lineHeight: 24,
    color: theme.colors.text,
    backgroundColor: theme.colors.white,
    textAlignVertical: 'top',
  },

  inputLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },

  counter: {
    textAlign: 'right',
    color: theme.colors.secondary,
    marginTop: theme.spacing.xs,
    fontSize: theme.typography.fontSize.sm,
  },

  errorText: {
    color: theme.colors.error,
    marginTop: theme.spacing.sm,
    fontSize: theme.typography.fontSize.sm,
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.grayLight,
    paddingTop: theme.spacing.md,
  },

  postDate: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.secondary,
  },
});
