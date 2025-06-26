import { StyleSheet } from "react-native";

const categoryHorizontalSelectorStyles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  topButtonsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  scrollContent: {
    alignItems: "center",
    paddingVertical: 2,
  },
  addButton: {
    backgroundColor: "#fff",
    borderColor: "#1976d2",
    borderWidth: 1.2,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 6,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1976d2",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 1,
    elevation: 1,
  },
  selectAllButton: {
    backgroundColor: "#1976d2",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 6,
    marginLeft: 0,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
  },
  selectAllButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: 0.3,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 6,
    minWidth: 32,
    borderWidth: 1.2,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  chipText: {
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: 0.1,
  },
});

export default categoryHorizontalSelectorStyles;