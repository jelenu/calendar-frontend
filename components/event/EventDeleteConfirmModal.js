import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import eventDetailModalStyles from "../../styles/EventDetailModalStyles";

export default function EventDeleteConfirmModal({
  visible,
  onCancel,
  onDelete,
  deleting,
}) {
  return (
    <Modal
      visible={visible} // Show or hide modal
      transparent // Makes background transparent
      animationType="fade" // Fade in/out transition
      onRequestClose={onCancel} // Handles Android back button
    >
      <View style={eventDetailModalStyles.overlay}>
        <View style={eventDetailModalStyles.confirmModal}>
          {/* Confirmation message */}
          <Text style={eventDetailModalStyles.confirmText}>
            Are you sure you want to delete this event?
          </Text>

          {/* Row of action buttons */}
          <View style={eventDetailModalStyles.confirmButtonRow}>
            {/* Cancel button */}
            <TouchableOpacity
              onPress={onCancel}
              style={eventDetailModalStyles.cancelButton}
              disabled={deleting} // Disable while deleting
            >
              <Text style={eventDetailModalStyles.cancelButtonText}>
                Cancel
              </Text>
            </TouchableOpacity>

            {/* Confirm delete button */}
            <TouchableOpacity
              onPress={onDelete}
              style={eventDetailModalStyles.confirmDeleteButton}
              disabled={deleting} // Disable while deleting
            >
              <Text style={eventDetailModalStyles.confirmDeleteButtonText}>
                {deleting ? "Deleting..." : "Delete"}{" "}
                {/* Show loading text if deleting */}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
