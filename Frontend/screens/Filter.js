import React, { useState, useContext } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Title, Icon, Button } from "react-native-paper";
import { ThemeContext } from "../context/ThemeContext";

const Filter = ({ navigation }) => {
  const [selectedCategories, setSelectedCategories] = useState([
    "Family",
    "Lesson",
    "Job",
    "Medical",
    "Other",
  ]);

  const { theme } = useContext(ThemeContext);

  const categories = [
    { label: "Family", value: "Family", icon: "account-group" },
    { label: "Lesson", value: "Lesson", icon: "school" },
    { label: "Job", value: "Job", icon: "briefcase" },
    { label: "Medical", value: "Medical", icon: "hospital" },
    { label: "Other", value: "Other", icon: "dots-horizontal" },
  ];

  const handleCategoryPress = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <View style={theme.filterContainer}>
      <ScrollView contentContainerStyle={theme.filterScrollContainer}>
        <View style={theme.filterGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.value}
              style={[
                theme.filterItem,
                selectedCategories.includes(category.value) &&
                  theme.filterItemSelected,
              ]}
              onPress={() => handleCategoryPress(category.value)}
            >
              <Icon name={category.icon} size={30} style={theme.filterIcon} />
              <Text style={theme.filterText}>{category.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={theme.filterButtonContainer}>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("Tasks", { selectedCategories });
          }}
        >
          Apply Filters
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  filterScrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  filterItem: {
    alignItems: "center",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "lightgray",
  },
  filterItemSelected: {
    backgroundColor: "blue",
  },
  filterIcon: {
    color: "white",
  },
  filterText: {
    color: "white",
    marginTop: 5,
  },
  filterButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default Filter;
