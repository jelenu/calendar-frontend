import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import CategoryEditModal from "./CategoryEditModal";
import { authFetch } from "../../utils/api";
import categoryHorizontalSelectorStyles from "../../styles/CategoryHorizontalSelectorStyles";

export default function CategoryHorizontalSelector({
  categories,
  selectedCategories,
  setSelectedCategories,
  onEditCategory,
  onDeleteCategory,
}) {
  const [actionCategory, setActionCategory] = useState(null);
  const [editName, setEditName] = useState("");
  const [editColor, setEditColor] = useState("#1976d2");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [editing, setEditing] = useState(false);

  // Update modal form values when a category is selected for editing
  React.useEffect(() => {
    setEditName(actionCategory?.name || "");
    setEditColor(actionCategory?.color || "#1976d2");
    setShowColorPicker(false);
    setEditing(false);
  }, [actionCategory]);

  // Handle category update logic
  const handleEdit = async () => {
    if (!actionCategory || !editName.trim()) return;
    setEditing(true);
    try {
      await authFetch(`/events/category/${actionCategory.id}/`, {
        method: "PATCH",
        body: {
          name: editName.trim(),
          color: editColor,
        },
      });
      if (onEditCategory)
        await onEditCategory(actionCategory, editName.trim(), editColor);
      setActionCategory(null);
    } finally {
      setEditing(false);
    }
  };

  return (
    <View style={categoryHorizontalSelectorStyles.container}>
      {/* Horizontal scrollable list of category chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={categoryHorizontalSelectorStyles.scrollContent}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            // Toggle category selection on tap
            onPress={() => {
              setSelectedCategories(
                selectedCategories.includes(cat.id)
                  ? selectedCategories.filter((id) => id !== cat.id)
                  : [...selectedCategories, cat.id]
              );
            }}
            // Open edit modal on long press
            onLongPress={() => setActionCategory(cat)}
            style={[
              categoryHorizontalSelectorStyles.chip,
              {
                backgroundColor: selectedCategories.includes(cat.id)
                  ? cat.color || "#1976d2"
                  : "#fff",
                borderColor: cat.color || "#1976d2",
              },
            ]}
          >
            <Text
              style={[
                categoryHorizontalSelectorStyles.chipText,
                {
                  color: selectedCategories.includes(cat.id)
                    ? "#fff"
                    : "#1976d2",
                },
              ]}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal for editing or deleting the selected category */}
      <CategoryEditModal
        visible={!!actionCategory}
        onRequestClose={() => setActionCategory(null)}
        name={editName}
        setName={setEditName}
        color={editColor}
        setColor={setEditColor}
        showColorPicker={showColorPicker}
        setShowColorPicker={setShowColorPicker}
        editing={editing}
        onEdit={handleEdit}
        onDelete={() => {
          setActionCategory(null);
          if (onDeleteCategory) onDeleteCategory(actionCategory);
        }}
      />
    </View>
  );
}
