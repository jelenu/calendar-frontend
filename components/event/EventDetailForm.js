import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import eventDetailModalStyles from "../../styles/EventDetailModalStyles";
import DateSelector from "../DateSelector";
import TimeSelector from "../TimeSelector";

export default function EventDetailForm({
  form,
  setForm,
  saving,
  deleting,
  categories,
  errors = {},
  clearFieldError,
  showStartDate,
  setShowStartDate,
  showEndDate,
  setShowEndDate,
  showStartTime,
  setShowStartTime,
  showEndTime,
  setShowEndTime,
  setCategoryModalVisible,
}) {
  return (
    <>
      {/* Title of the form */}
      <Text style={eventDetailModalStyles.title}>Event details</Text>
      
      {/* Display global/form-level error messages */}
      {errors.non_field_errors && (
        <View style={{ marginBottom: 16, padding: 12, backgroundColor: '#ffebee', borderRadius: 4, borderLeftWidth: 4, borderLeftColor: '#f44336' }}>
          {errors.non_field_errors.map((error, index) => (
            <Text key={index} style={{ color: '#c62828', fontSize: 14 }}>
              {error}
            </Text>
          ))}
        </View>
      )}
      
      {/* Title input field */}
      <View style={eventDetailModalStyles.field}>
        <Text style={eventDetailModalStyles.label}>Title</Text>
        <TextInput
          style={[
            eventDetailModalStyles.input,
            errors.title && { borderColor: '#f44336', borderWidth: 1 } // Highlight border if there's an error
          ]}
          value={form.title}
          onChangeText={(text) => {
            setForm((f) => ({ ...f, title: text }));
            if (clearFieldError) clearFieldError('title'); // Clear error when user modifies the field
          }}
          placeholder="Title"
          placeholderTextColor="#aaa"
          editable={!saving && !deleting} // Disable input when saving or deleting
        />
        {/* Show error message for title */}
        {errors.title && (
          <Text style={{ color: '#f44336', fontSize: 12, marginTop: 4 }}>
            {Array.isArray(errors.title) ? errors.title[0] : errors.title}
          </Text>
        )}
      </View>

      {/* Description input field */}
      <View style={eventDetailModalStyles.field}>
        <Text style={eventDetailModalStyles.label}>Description</Text>
        <TextInput
          style={[
            eventDetailModalStyles.input,
            errors.description && { borderColor: '#f44336', borderWidth: 1 }
          ]}
          value={form.description}
          onChangeText={(text) => setForm((f) => ({ ...f, description: text }))}
          placeholder="Description"
          placeholderTextColor="#aaa"
          editable={!saving && !deleting}
          multiline // Allow multiline description
        />
        {/* Show error message for description */}
        {errors.description && (
          <Text style={{ color: '#f44336', fontSize: 12, marginTop: 4 }}>
            {Array.isArray(errors.description) ? errors.description[0] : errors.description}
          </Text>
        )}
      </View>

      {/* Category selection */}
      <View style={eventDetailModalStyles.field}>
        <Text style={eventDetailModalStyles.label}>Category</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1 }}>
            <Picker
              selectedValue={form.categoryId}
              onValueChange={(value) =>
                setForm((f) => ({ ...f, categoryId: value }))
              }
              style={{ backgroundColor: "#fff" }}
              enabled={!saving && !deleting}
            >
              <Picker.Item label="Select a category" value={null} />
              {/* Populate Picker with available categories */}
              {categories.map((cat) => (
                <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
              ))}
            </Picker>
          </View>
          
          {/* Button to open modal for creating a new category */}
          <TouchableOpacity
            onPress={() => setCategoryModalVisible(true)}
            style={{
              marginLeft: 10,
              paddingVertical: 6,
              paddingHorizontal: 12,
              backgroundColor: "#1976d2",
              borderRadius: 4,
            }}
            disabled={saving || deleting}
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Start and end date selectors */}
      <View style={eventDetailModalStyles.row}>
        <DateSelector
          label="Start Date"
          value={form.startDate}
          onPress={() => setShowStartDate(true)} // Show date picker
          disabled={saving || deleting}
        />
        <DateSelector
          label="End Date"
          value={form.endDate}
          onPress={() => setShowEndDate(true)}
          disabled={saving || deleting}
        />
      </View>

      {/* Start and end time selectors */}
      <View style={eventDetailModalStyles.row}>
        <TimeSelector
          label="Start Time"
          value={form.startDate}
          onPress={() => setShowStartTime(true)} // Show time picker
          disabled={saving || deleting}
        />
        <TimeSelector
          label="End Time"
          value={form.endDate}
          onPress={() => setShowEndTime(true)}
          disabled={saving || deleting}
        />
      </View>
    </>
  );
}
