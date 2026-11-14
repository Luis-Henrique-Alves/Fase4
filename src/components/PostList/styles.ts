
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },

  searchTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 16,
  },

  listContent: {
    paddingBottom: 16,
    flexGrow: 1,
    gap: 16,
  },

  postCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },

  postTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1976d2',
    marginBottom: 8,
  },

  postAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },

  postDescription: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 21,
    marginBottom: 12,
  },

  postDate: {
    fontSize: 12,
    color: '#888888',
  },

  detailContainer: {
    marginTop: 12,
    alignItems: 'flex-end',
  },

  detailButton: {
    backgroundColor: '#1976d2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },

  detailButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    flexWrap: 'wrap',
  },

  paginationButton: {
    backgroundColor: '#1976d2',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
  },

  paginationText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
  },

  pageText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '600',
  },

  emptyText: {
    color: '#666666',
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 24,
  },

  loader: {
    marginVertical: 16,
  },

  disabledButton: {
    backgroundColor: '#dddddd',
    opacity: 0.7,
  },

  pressed: {
    opacity: 0.7,
  },
});
