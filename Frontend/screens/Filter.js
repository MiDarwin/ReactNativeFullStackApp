import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

const Filter = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedCategories: initialSelectedCategories, onSave } =
    route.params;

  const [selectedCategories, setSelectedCategories] = useState(
    initialSelectedCategories
  );

  const taskTypes = [
    { label: "Family", value: "Family", icon: "account-group" },
    { label: "Lesson", value: "Lesson", icon: "school" },
    { label: "Job", value: "Job", icon: "briefcase" },
    { label: "Medical", value: "Medical", icon: "hospital" },
    { label: "Other", value: "Other", icon: "dots-horizontal" },
  ];

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSave = () => {
    onSave(selectedCategories);
    navigation.goBack();
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
                backgroundColor: selectedCategories.includes(item.value)
                  ? "#8EACCD"
                  : "gray",
              },
            ]}
            onPress={() => toggleCategory(item.value)}
          >
            <IconButton icon={item.icon} size={30} color="white" />
            <Text style={styles.typeLabel}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.applyButton} onPress={handleSave}>
        <Text style={styles.applyButtonText}>Apply Filters</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
    backgroundColor: "#8EACCD",
    borderRadius: 10,
  },
  applyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Filter;
