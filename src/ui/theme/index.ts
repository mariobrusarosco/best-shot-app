// Theme constants (colors, spacing, typography)
export const colors = {
  primary: '#0066CC',
  secondary: '#6200EE',
  background: '#f8f9fa',
  text: '#333333',
  textSecondary: '#666666',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  heading: {
    fontWeight: 'bold' as const,
    fontSize: 28,
  },
  subheading: {
    fontSize: 16,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
}; 