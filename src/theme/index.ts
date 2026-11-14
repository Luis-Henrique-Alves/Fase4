
const theme = {
  colors: {
    primary: '#1976d2',
    primaryHover: '#115293',
    secondary: '#6c757d',
    secondaryHover: '#5a6268',
    header: '#1565c0',
    headerHover: '#0d47a1',
    headerText: '#ffffff',
    white: '#ffffff',
    grayLight: '#dddddd',
    text: '#333333',
    background: '#f5f5f5',
    error: '#d32f2f',
    success: '#388e3c',
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },

  typography: {
    fontSize: {
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
    },
    fontWeight: {
      regular: '400' as const,
      medium: '500' as const,
      bold: '700' as const,
    },
  },
};

export default theme;
