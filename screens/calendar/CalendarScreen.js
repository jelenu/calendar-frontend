import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { authFetch } from "../../utils/api";
import { Calendar } from "react-native-big-calendar";
import CreateEventModal from "../../components/event/CreateEventModal";
import CreateCategoryEventModal from "../../components/category/CreateCategoryModal";
import CategoryHorizontalSelector from "../../components/category/CategoryHorizontalSelector";
import EventDetailModal from "../../components/event/EventDetailModal";
import styles from "../../styles/calendarStyles";
import categoryHorizontalSelectorStyles from "../../styles/CategoryHorizontalSelectorStyles";
import { getFormattedMonth } from "../../utils/dateHelpers";

const CalendarScreen = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetailModalVisible, setEventDetailModalVisible] = useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategories(categories.map((cat) => cat.id));
    }
  }, [categories]);

  const fetchEvents = () => {
    authFetch("/events/")
      .then((data) => {
        if (!data || !Array.isArray(data)) {
          setEvents([]);
          return;
        }
        setEvents(data);
      })
      .catch(() => setEvents([]));
  };

  const fetchCategories = () => {
    authFetch("/events/category/")
      .then((data) => {
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch(() => setCategories([]));
  };

  const calendarEvents = events
    .filter((event) => selectedCategories.includes(event.category))
    .map((event) => {
      const category = categories.find((cat) => cat.id === event.category);
      return {
        title: event.title,
        start: new Date(event.startDate),
        end: new Date(event.endDate),
        description: event.description,
        id: event.id,
        category: category.name,
        color: category?.color,
      };
    });

  const updateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const allSelected = selectedCategories.length === categories.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories.map((cat) => cat.id));
    }
  };

  const handleEditCategory = () => {
    fetchCategories();
    fetchEvents();
  };

  const handleDeleteCategory = () => {
    fetchCategories();
    fetchEvents();
  };

  return (
    <View style={styles.container}>
      {/* Top action bar: + Event, + Catego, Select All */}
      <View style={styles.mainActionsRow}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.createEventButton}
        >
          <Feather name="plus" size={14} color="#fff" style={{ marginRight: 4 }} />
          <Text style={styles.createEventButtonText}>Event</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCategoryModalVisible(true)}
          style={styles.createCategoryButton}
        >
          <Feather name="plus" size={14} color="#1976d2" style={{ marginRight: 4 }} />
          <Text style={styles.createCategoryButtonText}>Category</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleSelectAll}
          style={styles.selectAllButton}
        >
          <Text style={styles.selectAllButtonText}>
            {allSelected ? "Deselect Categories" : "Select Categories"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal category selector */}
      <CategoryHorizontalSelector
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        onEditCategory={handleEditCategory}
        onDeleteCategory={handleDeleteCategory}
      />

      {/* Calendar month header with arrows */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => updateMonth(-1)}>
          <Text style={styles.arrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{getFormattedMonth(currentDate)}</Text>
        <TouchableOpacity onPress={() => updateMonth(1)}>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Main calendar view */}
      <View style={{ flex: 1, marginTop: 4 }}>
        <Calendar
          events={calendarEvents}
          mode="month"
          date={currentDate}
          swipeEnabled={false}
          eventCellStyle={(event) => ({
            backgroundColor: event.color,
          })}
          onPressEvent={(event) => {
            setSelectedEvent(event);
            setEventDetailModalVisible(true);
          }}
        />
      </View>

      {/* Modals */}
      <CreateEventModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onEventCreated={fetchEvents}
        categories={categories}
        setCategories={setCategories}
        fetchCategories={fetchCategories}
      />

      <CreateCategoryEventModal
        visible={categoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
        onCategoryCreated={fetchCategories}
      />

      <EventDetailModal
        visible={eventDetailModalVisible}
        onClose={() => setEventDetailModalVisible(false)}
        event={selectedEvent}
      />
    </View>
  );
};

export default CalendarScreen;
