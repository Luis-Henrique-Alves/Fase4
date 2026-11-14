
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
    width: '100%',
  },

  input: {
    flex: 1,
    minWidth: 0,
    maxWidth: 400,
    height: 42,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 4,
    backgroundColor: '#ffffff',
    color: '#333333',
    fontSize: 16,
  },

  searchButton: {
    backgroundColor: '#1976d2',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  clearButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },

  pressed: {
    opacity: 0.7,
  },
});
