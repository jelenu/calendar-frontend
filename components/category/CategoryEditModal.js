import React from "react";
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
}) {
  return (
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
          >
            <Feather name="x" size={22} color="#888" />
          </TouchableOpacity>
          <TextInput
            value={name}
            onChangeText={setName}
            style={categoryEditModalStyles.input}
            placeholder="Category name"
            editable={!editing}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity
            style={categoryEditModalStyles.colorRow}
            onPress={() => setShowColorPicker(!showColorPicker)}
            disabled={editing}
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
            <View style={{ height: 180, marginBottom: 110 }}>
              <ColorPickerWheel
                initialColor={color}
                onColorChange={setColor}
                thumbSize={24}
                sliderSize={24}
                noSnap={true}
                style={{ flex: 1 }}
              />
            </View>
          )}
          <TouchableOpacity
            style={[
              categoryEditModalStyles.editButton,
              (editing || !name.trim()) && categoryEditModalStyles.editButtonDisabled
            ]}
            onPress={onEdit}
            disabled={editing || !name.trim()}
          >
            <Text style={categoryEditModalStyles.editButtonText}>
              {editing ? "Saving..." : "Edit"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={categoryEditModalStyles.deleteButton}
            onPress={onDelete}
          >
            <Text style={categoryEditModalStyles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}