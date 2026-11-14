
import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },

  header: {
    marginBottom: theme.spacing.xl,
  },

  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },

  subtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.secondary,
    marginTop: theme.spacing.xs,
  },

  intro: {
    marginBottom: theme.spacing.lg,
  },

  description: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.secondary,
  },

  cardsContainer: {
    gap: theme.spacing.md,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.grayLight,
    minHeight: 100,
  },

  pressed: {
    opacity: 0.7,
    backgroundColor: theme.colors.background,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },

  icon: {
    fontSize: 28,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },

  cardDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.secondary,
    marginTop: theme.spacing.xs,
  },

  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.sm,
  },

  arrow: {
    fontSize: 30,
    color: theme.colors.secondary,
    fontWeight: theme.typography.fontWeight.regular,
  },

});
