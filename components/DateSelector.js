import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { formatDate } from "../utils/dateHelpers";
import styles from "../styles/common"; 

const DateSelector = ({ label, value, onPress, disabled }) => (
  <View style={{ flex: 1, marginHorizontal: 4 }}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.dateButton,
        { opacity: disabled ? 0.5 : 1 },
      ]}
      disabled={disabled}
    >
      <Text style={styles.dateButtonText}>{formatDate(value)}</Text>
    </TouchableOpacity>
  </View>
);

export default DateSelector;