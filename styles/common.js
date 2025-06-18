import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "92%",
    backgroundColor: "#f9f9f9",
    borderRadius: 18,
    padding: 22,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
    color: "#333",
  },
  field: {
    marginBottom: 14,
  },
  label: {
    fontSize: 15,
    color: "#555",
    marginBottom: 4,
    marginLeft: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d0d0d0",
    backgroundColor: "#fff",
    marginBottom: 0,
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    color: "#222",
  },
  error: {
    color: "#d32f2f",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    marginBottom: 6,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 6,
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
  },
  createButton: {
    backgroundColor: "#1976d2",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  dateButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    minHeight: 40,
    borderWidth: 1,
    borderColor: "#bdbdbd",
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    marginBottom: 10,
  },
  dateButtonText: {
    fontSize: 15,
    color: "#333",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  switchLabel: {
    marginLeft: 8,
    fontSize: 15,
    color: "#555",
  },
});

export default styles;