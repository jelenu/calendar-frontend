import React, { useState, useContext, useEffect } from 'react';
import { Modal, View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { authFetch } from '../utils/api';

export default function CreateEventModal({ visible, onClose, onEventCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);

  
  const handleSubmit = async () => {
    setError(null);
    if (!title || !startDate || !endDate || !category) {
      setError('Title, start date, end date and category are required.');
      return;
    }
    try {
      const data = await authFetch(
        '/events/',
        {
          method: 'POST',
          body: {
            title,
            description,
            startDate,
            endDate,
            category,
          },
        }
      );
      if (data) {
        setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setCategory('');
        onEventCreated && onEventCreated();
        onClose();
      } else {
        setError('Error creating event');
      }
    } catch (e) {
      console.error('Error creating event:', e);
      setError('Connection error');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Crear Evento</Text>
          <TextInput
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Descripción"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <TextInput
            placeholder="Fecha inicio (YYYY-MM-DD)"
            value={startDate}
            onChangeText={setStartDate}
            style={styles.input}
          />
          <TextInput
            placeholder="Fecha fin (YYYY-MM-DD)"
            value={endDate}
            onChangeText={setEndDate}
            style={styles.input}
          />
          <TextInput
            placeholder="Categoría"
            value={category}
            onChangeText={setCategory}
            style={styles.input}
          />
          {error && <Text style={styles.error}>{error}</Text>}
          <View style={styles.buttonRow}>
            <Button title="Cancelar" onPress={onClose} color="#888" />
            <Button title="Crear" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: { fontSize: 20, marginBottom: 12, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 },
  error: { color: 'red', marginBottom: 8, textAlign: 'center' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});