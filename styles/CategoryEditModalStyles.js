import { StyleSheet } from "react-native";

const categoryEditModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 22,
    minWidth: 220,
    maxWidth: 320,
    alignItems: 'center',
    elevation: 8,
    position: 'relative',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 14,
    width: 140,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
    backgroundColor: '#fafbfc',
  },
  colorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 2,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1976d2",
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 12,
  },
  colorText: {
    color: "#333",
    fontSize: 16,
  },
  editButton: {
    paddingVertical: 12,
    width: 90,
    alignItems: 'center',
    backgroundColor: '#1976d2',
    borderRadius: 8,
    marginBottom: 10,
    opacity: 1,
    alignSelf: 'center',
  },
  editButtonDisabled: {
    opacity: 0.6,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#e53935',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default categoryEditModalStyles;