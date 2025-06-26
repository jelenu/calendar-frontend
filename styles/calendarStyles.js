import { StyleSheet } from "react-native";

const calendarStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  mainActionsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    justifyContent: "space-around",
  },
  createEventButton: {
    backgroundColor: "#1976d2",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "center",
    marginRight: 4,
    marginLeft: 0,
  },
  createEventButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  createCategoryButton: {
    backgroundColor: "#fff",
    borderColor: "#1976d2",
    borderWidth: 1.2,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    justifyContent: "center",
    marginHorizontal: 4,
  },
  createCategoryButtonText: {
    color: "#1976d2",
    fontWeight: "bold",
    fontSize: 12,
  },
  selectAllButton: {
    backgroundColor: "#1976d2",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    justifyContent: "center",
  },
  selectAllButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: 0.3,
  },
});

export default calendarStyles;