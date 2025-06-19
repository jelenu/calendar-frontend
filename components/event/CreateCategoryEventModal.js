import React, { useState } from "react";
import { Modal, View, TextInput, Text, TouchableOpacity } from "react-native";
import { authFetch } from "../../utils/api";
import styles from "../../styles/common";

export default function CreateCategoryEventModal({ visible, onClose, onCategoryCreated }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setError(null);
    try {
      await authFetch("/events/category/", {
        method: "POST",
        body: { name },
      });
      setName("");
      onCategoryCreated && onCategoryCreated();
      onClose();
    } catch (e) {
      setError(e.message || "Error creating category");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
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