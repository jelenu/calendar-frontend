import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { authFetch } from '../../utils/api';
import { Calendar } from 'react-native-big-calendar';
import CreateEventModal from '../../components/event/CreateEventModal';
import CreateCategoryEventModal from '../../components/event/CreateCategoryEventModal';

const CalendarScreen = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Categories state
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchCategories();
  }, []);

  const fetchEvents = () => {
    authFetch('/events/')
      .then(data => {
        if (!data || !Array.isArray(data)) {
          setEvents([]);
          return;
        }
        setEvents(data);
      })
      .catch(() => setEvents([]));
  };

  const fetchCategories = () => {
    authFetch('/events/category/')
      .then(data => {
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch(() => setCategories([]));
  };

  const calendarEvents = events.map(event => ({
    title: event.title,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    description: event.description,
    id: event.id,
  }));

  const updateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getFormattedMonth = (date) => {
    const formatter = new Intl.DateTimeFormat('es-ES', {
      month: 'long',
      year: 'numeric',
    });
    const formatted = formatter.format(date);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Botones en fila */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Button title="Create New Event" onPress={() => setModalVisible(true)} />
        <Button title="Create New Category" onPress={() => setCategoryModalVisible(true)} />
      </View>

      {/* Mes y flechas */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => updateMonth(-1)}>
          <Text style={styles.arrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{getFormattedMonth(currentDate)}</Text>
        <TouchableOpacity onPress={() => updateMonth(1)}>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, marginTop: 8 }}>
        <Calendar
          events={calendarEvents}
          mode="month"
          date={currentDate}
          swipeEnabled={false}
        />
      </View>

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
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 28,
    paddingHorizontal: 16,
  },
});

export default CalendarScreen;
