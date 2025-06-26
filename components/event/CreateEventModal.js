import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
  Switch,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { authFetch } from "../../utils/api";
import { setTimeToZero, formatDateTime } from "../../utils/dateHelpers";
import DateSelector from "../DateSelector";
import TimeSelector from "../TimeSelector";
import CreateCategoryEventModal from "../category/CreateCategoryModal";
import styles from "../../styles/common";

export default function CreateEventModal({
  visible,
  onClose,
  onEventCreated,
  categories,
  setCategories,
  fetchCategories,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);

  const [endDate, setEndDate] = useState(new Date());
  const [showEndDate, setShowEndDate] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);

  const [showTime, setShowTime] = useState(false);
  const [customEndDate, setCustomEndDate] = useState(false);

  useEffect(() => {
    if (!customEndDate) setEndDate(setTimeToZero(startDate));
  }, [customEndDate, startDate]);

  const handleSubmit = async () => {
    setError(null);
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!startDate || isNaN(startDate.getTime())) {
      setError("Start date is required.");
      return;
    }
    if (!category) {
      setError("Category is required.");
      return;
    }

    let finalStartDate = showTime ? startDate : setTimeToZero(startDate);
    let finalEndDate = showTime ? endDate : setTimeToZero(endDate);

    try {
      const data = await authFetch("/events/", {
        method: "POST",
        body: {
          title,
          description,
          startDate: formatDateTime(finalStartDate),
          endDate: formatDateTime(finalEndDate),
          category,
        },
      });
      setTitle("");
      setDescription("");
      setCategory("");
      setStartDate(new Date());
      setEndDate(new Date());
      setShowTime(false);
      setCustomEndDate(false);
      onEventCreated && onEventCreated();
      onClose();
    } catch (e) {
      setError(e.message || "Error creating event");
    }
  };

  const onChangeDate = (setter, hideSetter) => (_, selectedDate) => {
    hideSetter(false);
    if (selectedDate) {
      const newDate = new Date(setter === setStartDate ? startDate : endDate);
      newDate.setFullYear(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      );
      setter(newDate);
      if (setter === setStartDate && !customEndDate) setEndDate(setTimeToZero(selectedDate));
    }
  };

  const onChangeTime = (setter, hideSetter, baseDate) => (_, selectedTime) => {
    hideSetter(false);
    if (selectedTime) {
      const newDate = new Date(baseDate);
      newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
      setter(newDate);
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Create Event</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              placeholder="Event title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              placeholderTextColor="#aaa"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholder="Event description"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
              placeholderTextColor="#aaa"
            />
          </View>

          <View style={styles.row}>
            <DateSelector
              label="Start Date"
              value={startDate}
              onPress={() => setShowStartDate(true)}
            />
            <DateSelector
              label="End Date"
              value={endDate}
              onPress={() => customEndDate && setShowEndDate(true)}
              disabled={!customEndDate}
            />
          </View>
          <View style={styles.switchRow}>
            <Switch value={customEndDate} onValueChange={setCustomEndDate} />
            <Text style={styles.switchLabel}>Custom End Date</Text>
          </View>

          <View style={styles.field}>
            <View style={styles.switchRow}>
              <Switch value={showTime} onValueChange={setShowTime} />
              <Text style={styles.switchLabel}>Add Start/End Time</Text>
            </View>
          </View>

          <View style={styles.row}>
            <TimeSelector
              label="Start Time"
              value={startDate}
              onPress={() => showTime && setShowStartTime(true)}
              disabled={!showTime}
            />
            <TimeSelector
              label="End Time"
              value={endDate}
              onPress={() => showTime && setShowEndTime(true)}
              disabled={!showTime}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Category</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flex: 1 }}>
                <Picker
                  selectedValue={category}
                  onValueChange={setCategory}
                  style={{ backgroundColor: "#fff" }}
                >
                  <Picker.Item label="Select category" value="" />
                  {categories.map((cat) => (
                    <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
                  ))}
                </Picker>
              </View>
              <Button
                title="+"
                onPress={() => setCategoryModalVisible(true)}
                color="#1976d2"
              />
            </View>
          </View>

          {error && <Text style={styles.error}>{error}</Text>}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.createButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>

          {/* DateTimePickers */}
          {showStartDate && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeDate(setStartDate, setShowStartDate)}
            />
          )}
          {showEndDate && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeDate(setEndDate, setShowEndDate)}
            />
          )}
          {showStartTime && (
            <DateTimePicker
              value={startDate}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeTime(setStartDate, setShowStartTime, startDate)}
            />
          )}
          {showEndTime && (
            <DateTimePicker
              value={endDate}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeTime(setEndDate, setShowEndTime, endDate)}
            />
          )}

          <CreateCategoryEventModal
            visible={categoryModalVisible}
            onClose={() => setCategoryModalVisible(false)}
            onCategoryCreated={fetchCategories}
          />
        </View>
      </View>
    </Modal>
  );
}
