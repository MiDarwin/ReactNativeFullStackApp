// FilterComponent.js
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { IconButton } from "react-native-paper";

const FilterComponent = ({ initialSelectedCategory = "", onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    initialSelectedCategory
  );

  const taskTypes = [
    { label: "Family", value: "Family", icon: "account-group" },
    { label: "Lesson", value: "Lesson", icon: "school" },
    { label: "Job", value: "Job", icon: "briefcase" },
    { label: "Medical", value: "Medical", icon: "hospital" },
    { label: "Other", value: "Other", icon: "dots-horizontal" },
  ];

  const selectCategory = (category) => {
    setSelectedCategory(category);
    onSelect(category);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={taskTypes}
        numColumns={2}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.typeContainer,
              {
                backgroundColor:
                  selectedCategory === item.value ? "#FF8878" : "gray",
              },
            ]}
            onPress={() => selectCategory(item.value)}
          >
            <IconButton icon={item.icon} size={30} color="white" />
            <Text style={styles.typeLabel}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#a7cdbd",
  },
  typeContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 25,
  },
  typeLabel: {
    color: "white",
    fontWeight: "bold",
  },
  applyButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#a7cdbd",
    borderRadius: 10,
  },
  applyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default FilterComponent;
