
import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  scrollContent: {
    flexGrow: 1,
  },

  tabletScrollContent: {
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    minHeight: 650,
    backgroundColor: theme.colors.white,
  },

  tabletContainer: {
    flexDirection: 'row',
    minHeight: 700,
  },

  // Branding
  brandingSection: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: 40,
  },

  brandingContent: {
    width: '100%',
    maxWidth: 480,
  },

  brandingTitle: {
    color: theme.colors.white,
    fontSize: 42,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.lg,
  },

  brandingDescription: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    lineHeight: 29,
    opacity: 0.9,
  },

  // Login
  loginSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 40,
    backgroundColor: theme.colors.white,
  },

  loginContainer: {
    width: '100%',
    maxWidth: 400,
  },

  // Logo
  logoContainer: {
    alignItems: 'center',
    marginBottom: 36,
  },

  logoText: {
    fontSize: 42,
    fontWeight: '900',
    color: theme.colors.primary,
    letterSpacing: 4,
  },

  logoLine: {
    width: 55,
    height: 3,
    backgroundColor: theme.colors.primary,
    marginTop: theme.spacing.xs,
  },

  logoSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    letterSpacing: 4,
    color: theme.colors.secondary,
    marginTop: theme.spacing.sm,
  },

  // Textos
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: theme.typography.fontWeight.bold,
    textAlign: 'center',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },

  subtitle: {
    fontSize: theme.typography.fontSize.md,
    lineHeight: 24,
    textAlign: 'center',
    color: theme.colors.secondary,
    marginBottom: theme.spacing.xl,
  },

  // Formulário
  form: {
    gap: 20,
  },

  inputGroup: {
    width: '100%',
  },

  label: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },

  input: {
    width: '100%',
    height: 54,
    borderWidth: 1,
    borderColor: theme.colors.grayLight,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
    backgroundColor: theme.colors.white,
  },

  passwordContainer: {
    width: '100%',
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.grayLight,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.white,
  },

  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
  },

  showPasswordButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },

  showPasswordText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },

  // Validação
  inputError: {
    borderColor: theme.colors.error,
  },

  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.fontSize.sm,
    marginTop: theme.spacing.xs,
  },

  generalError: {
    color: theme.colors.error,
    fontSize: theme.typography.fontSize.sm,
    lineHeight: 20,
    textAlign: 'center',
  },

  // Botão
  button: {
    height: 54,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },

  buttonPressed: {
    backgroundColor: theme.colors.primaryHover,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },

  // Rodapé
  footer: {
    marginTop: 36,
    fontSize: theme.typography.fontSize.sm,
    lineHeight: 20,
    color: theme.colors.secondary,
    textAlign: 'center',
  },
});
