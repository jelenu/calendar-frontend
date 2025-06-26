import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Modal } from "react-native";
import { Feather } from '@expo/vector-icons';
import ColorPickerWheel from "react-native-color-picker-wheel";
import categoryEditModalStyles from "../../styles/CategoryEditModalStyles";

export default function CategoryEditModal({
  visible,
  onRequestClose,
  name,
  setName,
  color,
  setColor,
  showColorPicker,
  setShowColorPicker,
  editing,
  onEdit,
  onDelete,
  deleting,
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <>
      {/* Main Edit Modal */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onRequestClose}
      >
        <View style={categoryEditModalStyles.overlay}>
          <View style={categoryEditModalStyles.modal}>
            <TouchableOpacity
              onPress={onRequestClose}
              style={categoryEditModalStyles.closeButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              disabled={editing || deleting}
            >
              <Feather name="x" size={22} color="#888" />
            </TouchableOpacity>
            <TextInput
              value={name}
              onChangeText={setName}
              style={categoryEditModalStyles.input}
              placeholder="Category name"
              editable={!editing && !deleting}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity
              style={categoryEditModalStyles.colorRow}
              onPress={() => setShowColorPicker(!showColorPicker)}
              disabled={editing || deleting}
            >
              <View
                style={[
                  categoryEditModalStyles.colorCircle,
                  { backgroundColor: color }
                ]}
              />
              <Text style={categoryEditModalStyles.colorText}>
                {showColorPicker ? "Pick a color" : "Select color"}
              </Text>
            </TouchableOpacity>
            {showColorPicker && (
              <View style={categoryEditModalStyles.colorPickerWrapper}>
                <ColorPickerWheel
                  initialColor={color}
                  onColorChange={setColor}
                  thumbSize={24}
                  sliderSize={24}
                  noSnap={true}
                  style={{ width: "100%" }}
                />
              </View>
            )}
            {/* Edit and Delete buttons side by side */}
            <View style={categoryEditModalStyles.editDeleteRow}>
              <TouchableOpacity
                style={[
                  categoryEditModalStyles.editButton,
                  (editing || !name.trim() || deleting) && categoryEditModalStyles.editButtonDisabled
                ]}
                onPress={onEdit}
                disabled={editing || !name.trim() || deleting}
              >
                <Text style={categoryEditModalStyles.editButtonText}>
                  {editing ? "Saving..." : "Edit"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={categoryEditModalStyles.deleteButton}
                onPress={() => setShowDeleteConfirm(true)}
                disabled={deleting || editing}
              >
                <Text style={categoryEditModalStyles.deleteButtonText}>
                  {deleting ? "Deleting..." : "Delete"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Separate Delete Confirmation Modal */}
      <Modal
        visible={showDeleteConfirm}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteConfirm(false)}
      >
        <View style={categoryEditModalStyles.overlay}>
          <View style={[categoryEditModalStyles.modal, { padding: 18, width: 280 }]}>
            <Text style={categoryEditModalStyles.deleteConfirmText}>
              Are you sure? Deleting this category will also delete all events in this category.
            </Text>
            <View style={categoryEditModalStyles.deleteConfirmButtons}>
              <TouchableOpacity
                style={categoryEditModalStyles.cancelDeleteButton}
                onPress={() => setShowDeleteConfirm(false)}
                disabled={deleting}
              >
                <Text style={categoryEditModalStyles.cancelDeleteButtonText}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={categoryEditModalStyles.confirmDeleteButton}
                onPress={() => {
                  setShowDeleteConfirm(false);
                  onDelete();
                }}
                disabled={deleting}
              >
                <Text style={categoryEditModalStyles.deleteButtonText}>
                  {deleting ? "Deleting..." : "Delete"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}