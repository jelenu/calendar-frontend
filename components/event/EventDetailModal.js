import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import eventDetailModalStyles from "../../styles/EventDetailModalStyles";
import { authFetch } from "../../utils/api";
import EventDetailForm from "./EventDetailForm";
import EventDeleteConfirmModal from "./EventDeleteConfirmModal";
import CreateCategoryEventModal from "../category/CreateCategoryModal";

export default function EventDetailModal({
  visible,
  onClose,
  event,
  onDelete,
  onUpdate,
  categories = [],
  fetchCategories,
}) {
  // State for confirmation modal
  const [showConfirm, setShowConfirm] = useState(false);
  // Flags for deletion and saving process
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  // Validation errors
  const [errors, setErrors] = useState({});

  // Form state for editing event details
  const [form, setForm] = useState({
    title: event?.title || "",
    description: event?.description || "",
    startDate: event?.start || new Date(),
    endDate: event?.end || new Date(),
    categoryId: null, // Will be set in useEffect
  });

  // States for controlling the visibility of date/time pickers
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);

  // State for showing/hiding the category creation modal
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  // Sync form state when event or categories change
  useEffect(() => {
    let categoryId = null;

    // Determine categoryId based on event data
    if (typeof event?.categoryId === "number" || (typeof event?.categoryId === "string" && event?.categoryId !== "")) {
      categoryId = event.categoryId;
    } else if (typeof event?.category === "object" && event?.category?.id) {
      categoryId = event.category.id;
    } else if (typeof event?.category === "string" && event?.category !== "") {
      // If category is a string (name), try to match it with a category from the list
      const foundCategory = categories.find(cat => cat.name === event.category);
      if (foundCategory) {
        categoryId = foundCategory.id;
      } else {
        // Try to find it by ID if name doesn't match
        const foundById = categories.find(cat => cat.id === event.category);
        categoryId = foundById?.id || (categories.length > 0 ? categories[0]?.id : null);
      }
    } else if (categories.length > 0) {
      // Default to the first category if available
      categoryId = categories[0]?.id;
    }

    // Update form state with event values
    setForm({
      title: event?.title || "",
      description: event?.description || "",
      startDate: event?.start || new Date(),
      endDate: event?.end || new Date(),
      categoryId: categoryId,
    });

    // Clear validation errors on event change
    setErrors({});
  }, [event, categories]);

  // Remove specific field error when user starts editing that field
  const clearFieldError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  // Do not render if there's no event
  if (!event) return null;

  // Handle event deletion
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await authFetch(`/events/${event.id}/`, { method: "DELETE" });
      setShowConfirm(false);
      setDeleting(false);
      onClose();
      if (onDelete) onDelete();
    } catch (e) {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  // Handle saving updated event details
  const handleSave = async () => {
    setSaving(true);
    setErrors({});
    try {
      await authFetch(`/events/${event.id}/`, {
        method: "PATCH",
        body: {
          title: form.title,
          description: form.description,
          startDate: form.startDate.toISOString(),
          endDate: form.endDate.toISOString(),
          category: form.categoryId,
        },
      });
      setSaving(false);
      if (onUpdate) onUpdate();
      onClose();
    } catch (error) {
      setSaving(false);

      // Use error details from API if available
      if (error.data && typeof error.data === 'object') {
        setErrors(error.data);
      } else {
        // Generic fallback error message
        setErrors({ non_field_errors: [error.message || "An unexpected error occurred."] });
      }
    }
  };

  // Update form date field when user picks a new date
  const handleDateChange = (field, hideSetter, baseDate) => (_, selectedDate) => {
    hideSetter(false);
    if (selectedDate) {
      const newDate = new Date(baseDate);
      newDate.setFullYear(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
      setForm((f) => ({ ...f, [field]: newDate }));
    }
  };

  // Update form time field when user picks a new time
  const handleTimeChange = (field, hideSetter, baseDate) => (_, selectedTime) => {
    hideSetter(false);
    if (selectedTime) {
      const newDate = new Date(baseDate);
      newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
      setForm((f) => ({ ...f, [field]: newDate }));
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={eventDetailModalStyles.overlay}>
          <View style={eventDetailModalStyles.modalContainer}>
            {/* Close button */}
            <TouchableOpacity
              onPress={onClose}
              style={eventDetailModalStyles.closeButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather name="x" size={24} color="#888" />
            </TouchableOpacity>

            {/* Event form */}
            <EventDetailForm
              form={form}
              setForm={setForm}
              saving={saving}
              deleting={deleting}
              categories={categories}
              errors={errors}
              clearFieldError={clearFieldError}
              showStartDate={showStartDate}
              setShowStartDate={setShowStartDate}
              showEndDate={showEndDate}
              setShowEndDate={setShowEndDate}
              showStartTime={showStartTime}
              setShowStartTime={setShowStartTime}
              showEndTime={showEndTime}
              setShowEndTime={setShowEndTime}
              setCategoryModalVisible={setCategoryModalVisible}
            />

            {/* Buttons for delete and save */}
            <View style={eventDetailModalStyles.buttonRow}>
              <TouchableOpacity
                onPress={() => setShowConfirm(true)}
                style={[eventDetailModalStyles.button, eventDetailModalStyles.deleteButton]}
                disabled={deleting || saving}
              >
                <Text style={eventDetailModalStyles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSave}
                style={[eventDetailModalStyles.button, eventDetailModalStyles.saveButton]}
                disabled={saving || deleting}
              >
                <Text style={eventDetailModalStyles.saveButtonText}>
                  {saving ? "Saving..." : "Save"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Date & Time Pickers */}
        {showStartDate && (
          <DateTimePicker
            value={form.startDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange("startDate", setShowStartDate, form.startDate)}
          />
        )}
        {showEndDate && (
          <DateTimePicker
            value={form.endDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange("endDate", setShowEndDate, form.endDate)}
          />
        )}
        {showStartTime && (
          <DateTimePicker
            value={form.startDate}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleTimeChange("startDate", setShowStartTime, form.startDate)}
          />
        )}
        {showEndTime && (
          <DateTimePicker
            value={form.endDate}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleTimeChange("endDate", setShowEndTime, form.endDate)}
          />
        )}
      </Modal>

      {/* Modal to confirm event deletion */}
      <EventDeleteConfirmModal
        visible={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onDelete={handleDelete}
        deleting={deleting}
      />

      {/* Modal to create a new category */}
      <CreateCategoryEventModal
        visible={categoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
        onCategoryCreated={fetchCategories}
      />
    </>
  );
}
