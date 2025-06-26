import React, { useState } from "react";
import { Modal, View, TextInput, Text, TouchableOpacity } from "react-native";
import ColorPickerWheel from "react-native-color-picker-wheel";
import { authFetch } from "../../utils/api";
import styles from "../../styles/common";

export default function CreateCategoryModal({ visible, onClose, onCategoryCreated }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#1976d2");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setError(null);
    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }
    try {
      await authFetch("/events/category/", {
        method: "POST",
        body: { name, color },
      });
      setName("");
      setColor("#1976d2");
      onCategoryCreated && onCategoryCreated();
      onClose();
    } catch (e) {
      setError(e.message || "Error creating category");
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Create Category</Text>
          <TextInput
            placeholder="Category name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
              marginTop: 6,
            }}
            onPress={() => setShowColorPicker(!showColorPicker)}
          >
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: color,
                borderWidth: 1,
                borderColor: "#ccc",
                marginRight: 10,
              }}
            />
            <Text style={{ color: "#333", fontSize: 16 }}>
              {showColorPicker ? "Pick a color" : "Select color"}
            </Text>
          </TouchableOpacity>
          {showColorPicker && (
            <View style={{ height: 300, marginBottom: 10 }}>
              <ColorPickerWheel
                initialColor={color}
                onColorChange={setColor}
                thumbSize={30}
                sliderSize={30}
                noSnap={true}
                style={{ flex: 1 }}
              />
            </View>
          )}
          <Text style={{ marginBottom: 10, color: "#555" }}>
            Selected color: <Text style={{ fontWeight: "bold" }}>{color}</Text>
          </Text>
          {error && <Text style={styles.error}>{error}</Text>}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.createButton]} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
