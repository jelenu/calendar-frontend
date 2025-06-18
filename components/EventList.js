import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function splitDateTime(isoString) {
  if (!isoString) return { date: '', time: '' };
  const [date, timeWithZone] = isoString.split('T');
  const time = timeWithZone ? timeWithZone.replace('Z', '') : '';
  return { date, time };
}

const EventList = ({ events }) => {
  if (!events || events.length === 0) {
    return <Text>No events found.</Text>;
  }

  return (
    <View>
      {events.map(event => {
        const { date: startDate, time: startTime } = splitDateTime(event.startDate);
        const { date: endDate, time: endTime } = splitDateTime(event.endDate);

        return (
          <View key={event.id} style={styles.eventContainer}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.eventItem}>{event.description}</Text>
            <Text>Inicio: {startDate} {startTime}</Text>
            <Text>Fin: {endDate} {endTime}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  eventContainer: { marginBottom: 16 },
  title: { fontSize: 18, fontWeight: 'bold' },
  eventItem: { fontSize: 16, marginVertical: 4 },
});

export default EventList;